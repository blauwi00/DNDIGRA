import {heroAPI} from './hero-api.js';
export default {async fetch(request,env){const url=new URL(request.url);if(url.pathname==='/api/heroes')return heroAPI(request,env);return env.ASSETS.fetch(request);}};
