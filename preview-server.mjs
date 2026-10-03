import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "dist");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".png": "image/png", ".svg": "image/svg+xml" };

http.createServer((request, response) => {
  const requestPath = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  let filePath = path.join(root, requestPath === "/" ? "index.html" : requestPath);
  if (!filePath.startsWith(root)) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  fs.stat(filePath, (statError, stat) => {
    if (!statError && stat.isDirectory()) filePath = path.join(filePath, "index.html");
    fs.readFile(filePath, (error, data) => {
      if (error) {
        response.writeHead(404, { "Content-Type": "text/plain" }).end("Not found");
        return;
      }
      response.writeHead(200, { "Content-Type": types[path.extname(filePath)] || "application/octet-stream" }).end(data);
    });
  });
}).listen(4173, "127.0.0.1", () => console.log("Local: http://127.0.0.1:4173"));
