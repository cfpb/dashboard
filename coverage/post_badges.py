# script to post badge markup to s3 using coveralls API and build page
# this requires a python2.7 environment that includes:
# - requests
# - boto
# - beautifulsoup4
# - S3_KEY and S3_SECRET credentials variables
from __future__ import print_function
import sys
import os
import datetime
import json

import requests
import boto
from boto.s3.key import Key
from boto.s3.connection import OrdinaryCallingFormat
from bs4 import BeautifulSoup as bs

TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>cfgov-refresh coverage badges</title>
    <style>
    table {{
      font-size:1.5em; font-family: Montserrat, sans-serif; width:100%;
    }}
    img {{
      width:103%; height:103%; display:block;
    }}
    img.status {{ width:47%; height:47%; }}
    td {{ width:50%; }}
    body {{ margin:0 }}
    </style>
</head>
<body>
<div>
<img class="status" src="https://travis-ci.org/cfpb/cfgov-refresh.svg?branch=master" alt="build status"/>
<hr>
<table>
<tr>
<td>All code</td><td><img src="{}" alt="overall coverage"></td></tr>
<tr>
<td>JS</td><td><img src="{}" alt="javascript coverage"></td></tr>
<tr>
<td> Python</td><td><img src="{}" alt="python coverage"></td></tr>
</table>
</div>
</body>
</html>
"""

S3_KEY = os.getenv('S3_KEY', '')
S3_SECRET = os.getenv('S3_SECRET', '')
S3_BASE = 'files.consumerfinance.gov'
COVERALLS = 'https://coveralls.io'
CFGOV_BASE = '{}/github/cfpb/cfgov-refresh'.format(COVERALLS)
BADGES = {
    'overall': '',
    'js': '',
    'python': ''
}
BADGE_URL = (
    'https://s3.amazonaws.com/assets.coveralls.io/badges/coveralls_{}.svg'
    )


def get_badges():
    initial_data = requests.get('{}.json'.format(CFGOV_BASE)).json()
    BADGES['overall'] = initial_data['badge_url']
    commit_sha = initial_data['commit_sha']
    build_soup = bs(requests.get('{}/builds/{}'.format(COVERALLS,
                                                       commit_sha)).text,
                                                       'html.parser')
    results_div = build_soup.find(True, {'class': ['show-item',
                                         'show-last-build-detail']})
    rows = results_div.findAll('tr')[1:]
    for row in rows:
        coverage = row.find('div').find('div').text
        if 'frontend' in row.find('a').text:
            BADGES['js'] = BADGE_URL.format(int(round(float(coverage), 2)))
        elif 'backend' in row.find('a').text:
            BADGES['python'] = BADGE_URL.format(int(round(float(coverage), 2)))
    if not (BADGES['js'] and BADGES['python']):
        print('No update -- only one set of tests were recorded')
        return
    with open('badges.html', 'w') as f:
        content = TEMPLATE.format(BADGES['overall'],
                                  BADGES['js'],
                                  BADGES['python']).encode('utf-8')
        f.write(content)
    with open('badges.json', 'w') as f:
        f.write(json.dumps(BADGES))
    s3 = boto.connect_s3(S3_KEY, S3_SECRET,
                         calling_format=OrdinaryCallingFormat())
    bucket = s3.get_bucket(S3_BASE)
    prep = Key(bucket=bucket, name='build/badges/badges.html')
    prep.content_type = 'text/plain'
    prep.set_contents_from_filename('badges.html')
    print('badges updated {}'.format(datetime.datetime.now()))
    return

if __name__ == "__main__":
    print('{} reporting for duty: {}'.format(sys.argv[0],
                                             datetime.datetime.now()))
    get_badges()
