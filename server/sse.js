// server/sse.js
const clients = new Map();

export function sseHandler(req, res) {
  const sessionId = req.query.sessionId;

  if (!sessionId) {
    return res.status(400).end("Missing sessionId");
  }

  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    Connection: "keep-alive",
    "Access-Control-Allow-Origin": "*",
  });

  res.write(
    `data: ${JSON.stringify({ type: "connected", sessionId })}\n\n`
  );

  clients.set(sessionId, res);

  req.on("close", () => {
    clients.delete(sessionId);
  });
}

export function sendToClient(sessionId, message) {
  const client = clients.get(sessionId);
  if (!client) return;

  client.write(
    `data: ${JSON.stringify({ message })}\n\n`
  );
}
