import { makeRouteHandler } from '@keystatic/astro/route-handler';
import config from '../../../../keystatic.config';

export const ALL = makeRouteHandler({ config });
export const prerender = false; // Zwingt diesen einen Punkt, dynamisch zu sein