export async function fetchContent(type) {
  const res = await fetch(
    `https://yoshihiko.app.n8n.cloud/webhook/cms?type=${type}`
  );
  if (!res.ok) throw new Error('fetch failed');
  return res.json();
}