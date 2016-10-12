// Load environment variables from .env file if available
require('dotenv').load();

var config = {
    env:  'prod',

    host: '0.0.0.0',
    port: process.env.PORT || 5000,

    // Available themes:
    // + bordeau
    // + harlequin
    // + light-grey
    // + light-yellow
    // + night-blue
    // + snow
    // + yellow
    theme: 'snow',

    // clients configs
    api: {
        jenkins: {
            baseUrl: process.env.MOZAIK_JENKINS_URL,
            basicAuthUser: process.env.MOZAIK_JENKINS_USER,
            basicAuthPassword: process.env.MOZAIK_JENKINS_PASSWORD
        }
    },

    // define duration between each dashboard rotation (ms)
    rotationDuration: 8000,

    // define the interval used by Mozaïk Bus to call registered APIs
    apisPollInterval: 15000,

    dashboards: [

        // first dashboard
        {
            // 4 x 3 dashboard
            columns: 4,
            rows:    6,
            widgets: [
                {
                    type: 'embed.markup',
                    title: 'Active CF.gov Visitors',
                    content: '<iframe src="' + process.env.MOZAIK_GA_EMBED_URL + '" width="100%" height="100%" scrolling="no" frameborder="no" style="padding:25px 10px 5%;background-color:white"></iframe>',
                    columns: 1, rows: 2,
                    x: 0, y: 0
                },
                // {
                //     type: 'embed.markup',
                //     title: 'Live Kitten Cam',
                //     content: '<iframe width="100%" height="100%" src="https://www.youtube-nocookie.com/embed/goHLjmgSuJk?rel=0&amp;showinfo=0&amp;autoplay=1" frameborder="0" allowfullscreen style="padding:1em 1em 4em"></iframe>',
                //     columns: 1, rows: 2,
                //     x: 1, y: 0
                // },
                {
                    type: 'embed.markup',
                    title: 'Live Puppy Cam',
                    content: '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/vmjDK1z_FUE?list=PLIFqWCuxNyoj8HAwNYOlqdDL52pNsbvKV?autoplay=1" frameborder="0" allowfullscreen style="padding:1em 1em 4em"></iframe>',
                    columns: 1, rows: 2,
                    x: 1, y: 0
                },
                {
                    type: 'embed.markup',
                    title: '404 and 500 errors',
                    content: '<iframe src="' + process.env.MOZAIK_NR_EMBED_URL_6 + '" scrolling="no" frameborder="no" style="height:80%;width:90%;margin:-3em 5% 0" onload="setTimeout(function(){this.style.height=\'110%\'}.bind(this), 2000)"></iframe>',
                    columns: 1, rows: 2,
                    x: 2, y: 0
                },
                {
                    type: 'embed.markup',
                    title: 'Mobile usage',
                    content: '<iframe src="' + process.env.MOZAIK_NR_EMBED_URL_2 + '" scrolling="no" frameborder="no" style="height:80%;width:90%;margin:-3em 5% 0" onload="setTimeout(function(){this.style.height=\'110%\'}.bind(this), 2000)"></iframe>',
                    columns: 1, rows: 2,
                    x: 3, y: 0
                },
                // {
                //     type: 'weather.weather',
                //     city: 'Washington DC',
                //     country: 'US',
                //     units: 'imperial',
                //     lang: 'en',
                //     limit: 2,
                //     columns: 1, rows: 2,
                //     x: 1, y: 0
                // },
                {
                    type: 'travis.build_histogram',
                    owner: 'cfpb',
                    repository: 'cfgov-refresh',
                    columns: 2, rows: 2,
                    x: 0, y: 2
                },
                {
                    type: 'embed.markup',
                    title: 'Slowest CF.gov pages',
                    content: '<iframe src="' + process.env.MOZAIK_NR_EMBED_URL_1 + '" width="100%" height="100%" scrolling="no" frameborder="no" style="height:80%;width:90%;margin:-3em 5% 0" onload="setTimeout(function(){this.style.height=\'110%\'}.bind(this), 2000)"></iframe>',
                    columns: 2, rows: 2,
                    x: 2, y: 2
                },
                {
                    type: 'embed.markup',
                    title: 'Slowest cities',
                    content: '<iframe src="' + process.env.MOZAIK_NR_EMBED_URL_8 + '" width="100%" height="100%" scrolling="no" frameborder="no" style="height:80%;width:90%;margin:-3em 5% 0" onload="setTimeout(function(){this.style.height=\'110%\'}.bind(this), 2000)"></iframe>',
                    columns: 1, rows: 2,
                    x: 0, y: 4
                },
                {
                    type: 'embed.markup',
                    title: 'Most popular pages',
                    content: '<iframe src="' + process.env.MOZAIK_NR_EMBED_URL_7 + '" width="100%" height="100%" scrolling="no" frameborder="no" style="height:80%;width:90%;margin:-3em 5% 0" onload="setTimeout(function(){this.style.height=\'110%\'}.bind(this), 2000)"></iframe>',
                    columns: 2, rows: 2,
                    x: 1, y: 4
                },
                {
                    type: 'embed.markup',
                    title: 'CF.gov Code Coverage',
                    content: '<iframe width="100%" height="100%" src="http://files.consumerfinance.gov.s3.amazonaws.com/build/badges/badges.html" frameborder="0" allowfullscreen style="padding:1em 1em 4em" scrolling="no"></iframe>',
                    columns: 1, rows: 2,
                    x: 3, y: 4
                }
            ]
        },

        // second dashboard
        // {
        //     // 3 x 2 dashboard
        //     columns: 3,
        //     rows:    2,
        //     widgets: [
        //         {
        //             type: 'embed.markup',
        //             title: 'CF.gov users on a mobile',
        //             content: '<iframe src="' + process.env.MOZAIK_NR_EMBED_URL_2 + '" scrolling="no" frameborder="no" style="margin-top:-15%;height:80%;width:90%;margin:-20% 5% 0" onload="setTimeout(function(){this.style.height=\'100%\'}.bind(this), 2000)"></iframe>',
        //             columns: 1, rows: 1,
        //             x: 0, y: 0
        //         },
        //         {
        //             type: 'embed.markup',
        //             title: 'Operating Systems',
        //             content: '<iframe src="' + process.env.MOZAIK_NR_EMBED_URL_3 + '" scrolling="no" frameborder="no" style="height:85%;width:95%;margin-left:1em"></iframe>',
        //             columns: 1, rows: 1,
        //             x: 1, y: 0
        //         },
        //         {
        //             type: 'embed.markup',
        //             title: 'IE Versions',
        //             content: '<iframe src="' + process.env.MOZAIK_NR_EMBED_URL_4 + '" scrolling="no" frameborder="no" style="height:85%;width:95%;margin-left:1em"></iframe>',
        //             columns: 1, rows: 1,
        //             x: 2, y: 0
        //         },
        //         {
        //             type: 'embed.markup',
        //             title: 'Most popular pages',
        //             content: '<iframe src="' + process.env.MOZAIK_NR_EMBED_URL_5 + '" scrolling="no" frameborder="no" style="height:85%;width:95%;margin-left:1em"></iframe>',
        //             columns: 3, rows: 1,
        //             x: 0, y: 1
        //         },
        //     ]
        // }
    ]
};

module.exports = config;
