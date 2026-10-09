import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const host = "127.0.0.1";
const port = 4173;
const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "dist");
const formEndpoint = "https://formsubmit.co/ajax/bhattaraisukriti71@gmail.com";
const liveContactUrl = "https://www.sukritibhattarai.com.np/contact.html";

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml"
};

function readRequestBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;

    request.on("data", (chunk) => {
      size += chunk.length;
      if (size > 1024 * 1024) {
        request.destroy();
        reject(new Error("Request body is too large."));
        return;
      }
      chunks.push(chunk);
    });
    request.on("end", () => resolve(Buffer.concat(chunks)));
    request.on("error", reject);
  });
}

async function forwardForm(request, response) {
  try {
    const body = await readRequestBody(request);
    const forwarded = await fetch(formEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": request.headers["content-type"] || "application/x-www-form-urlencoded",
        Origin: "https://www.sukritibhattarai.com.np",
        Referer: liveContactUrl
      },
      body
    });
    const result = await forwarded.text();
    response.writeHead(forwarded.status, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(result);
  } catch {
    response.writeHead(502, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(JSON.stringify({ success: false, message: "Unable to forward the form." }));
  }
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${host}:${port}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === "/") pathname = "/index.html";
  if (!path.extname(pathname)) pathname += ".html";

  const file = path.resolve(root, `.${pathname}`);
  if (!file.startsWith(root + path.sep)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  try {
    const body = await readFile(file);
    response.writeHead(200, {
      "Content-Type": contentTypes[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-store"
    });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
}

const server = http.createServer(async (request, response) => {
  if (request.method === "POST" && request.url?.split("?")[0] === "/__formsubmit") {
    await forwardForm(request, response);
    return;
  }
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD, POST" });
    response.end("Method not allowed");
    return;
  }
  await serveStatic(request, response);
});

server.listen(port, host, () => {
  console.log(`Local preview: http://localhost:${port}`);
});
