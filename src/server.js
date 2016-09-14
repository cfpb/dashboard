import Mozaik  from 'mozaik';
import config  from '../config';
import github  from 'mozaik-ext-github/client';
import travis  from 'mozaik-ext-travis/client';
import weather from 'mozaik-ext-weather/client';
import value from 'mozaik-ext-value/client';

const mozaik = new Mozaik(config);

mozaik.bus.registerApi('github', github);
mozaik.bus.registerApi('travis', travis);
mozaik.bus.registerApi('weather', weather);
mozaik.bus.registerApi('value', value);

mozaik.startServer();
