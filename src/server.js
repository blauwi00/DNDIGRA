import {worldAPI} from './world-api.js';
import {heroAPI} from './hero-api.js';
export default {async fetch(request,env){const url=new URL(request.url);if(url.pathname==='/api/worlds'||url.pathname.startsWith('/api/worlds/'))return worldAPI(request,env);if((url.pathname==='/api/heroes'||url.pathname.startsWith('/api/heroes/')))return heroAPI(request,env);return env.ASSETS.fetch(request);}};
