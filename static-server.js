
import { serve } from "bun";
import { join } from "path";
import { existsSync } from "fs";

// eslint-disable-next-line no-undef
const Bun = globalThis.Bun || require("bun");


const rootDir = "build";

serve({
  port: process.env.PORT || 3002,
  async fetch(req) {
    let urlPath = new URL(req.url).pathname;

    // Si la URL es "/", servir `index.html`
    if (urlPath === "/") {
      return new Response(Bun.file(join(rootDir, "index.html")), {
        headers: { "Content-Type": "text/html" },
      });
    }

    // Verificar si el archivo existe en la carpeta `build/`
    const filePath = join(rootDir, urlPath);
    if (existsSync(filePath)) {
      return new Response(Bun.file(filePath));
    }

    // Si no se encuentra el archivo, devolver `index.html` (para SPA)
    return new Response(Bun.file(join(rootDir, "index.html")), {
      headers: { "Content-Type": "text/html" },
    });
  },
});
