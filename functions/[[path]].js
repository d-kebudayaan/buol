export async function onRequest(context) {
  const request = context.request;
  const incomingUrl = new URL(request.url);
  const targetUrl = new URL(
    incomingUrl.pathname + incomingUrl.search,
    'https://digital-culture-sulawesi-tengah.ai.studio'
  );

  const headers = new Headers(request.headers);
  headers.set('Host', 'digital-culture-sulawesi-tengah.ai.studio');
  headers.set('X-Custom-Host', incomingUrl.hostname);

  const resp = await fetch(targetUrl.toString(), {
    method: request.method,
    headers,
    body:
      request.method !== 'GET' && request.method !== 'HEAD'
        ? request.body
        : undefined,
    redirect: 'manual',
  });

  return new Response(resp.body, {
    status: resp.status,
    statusText: resp.statusText,
    headers: resp.headers,
  });
}
