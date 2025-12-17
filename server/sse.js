const clients = new Map();

export function sseHandler(req, res) {
  const { sessionId } = req.query;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  clients.set(sessionId, res);

  res.write(
    `data: ${JSON.stringify({
      type: "connected",
      sessionId,
    })}\n\n`
  );

  req.on("close", () => {
    clients.delete(sessionId);
  });
}

export function sendToSession(sessionId, data) {
  const client = clients.get(sessionId);
  if (client) {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  }
}
