import React   from 'react';
import Mozaik  from 'mozaik/browser';
import github  from 'mozaik-ext-github';
import travis  from 'mozaik-ext-travis';
import time    from 'mozaik-ext-time';
import weather from 'mozaik-ext-weather';
import value   from 'mozaik-ext-value';
import embed   from 'mozaik-ext-embed';

const MozaikComponent = Mozaik.Component.Mozaik;
const ConfigActions   = Mozaik.Actions.Config;


Mozaik.Registry.addExtensions({
    github,
    travis,
    time,
    weather,
    value,
    embed
});

React.render(<MozaikComponent/>, document.getElementById('mozaik'));

ConfigActions.loadConfig();
