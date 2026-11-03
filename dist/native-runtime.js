(() => {
  'use strict';
  const offline = window.Capacitor?.isNativePlatform?.() === true || new URL(window.location.href).searchParams.get('offline') === '1';
  window.NativeRuntime = {offline};
  if (!offline) return;
  const originalFetch = window.fetch.bind(window);
  const api = window.LocalAPI?.createLocalAPI({indexedDB: window.indexedDB, baseURL: window.location.href});
  window.NativeRuntime.api = api;
  const apiError = (error, status) => new Response(JSON.stringify({error}), {status, headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-store'}});
  window.fetch = async (input, init) => {
    const address = input instanceof Request ? input.url : String(input), url = new URL(address, window.location.href);
    if (!/^\/api(?:\/|$)/.test(url.pathname)) return originalFetch(input, init);
    const local = new URL(window.location.href);
    if (url.protocol !== local.protocol || url.host !== local.host) return apiError('Внешний API недоступен в локальной игре.', 403);
    if (!api) return apiError('Локальное хранилище сохранений не загружено.', 503);
    return api.fetch(input, init);
  };
})();
