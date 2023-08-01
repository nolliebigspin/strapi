import nodeFetch, { RequestInit } from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

import type { Strapi } from '../Strapi';

export function createStrapiFetch(strapi: Strapi) {
  function fetch(url: string, options: RequestInit) {
    return nodeFetch(url, {
      ...(fetch.agent ? { agent: fetch.agent } : {}),
      ...options,
    });
  }

  const { globalProxy: proxy } = strapi.config.get('server');

  if (proxy) {
    fetch.agent = new HttpsProxyAgent(proxy);
  }

  return fetch;
}
