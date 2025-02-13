
import { serve } from "bun";
// eslint-disable-next-line no-undef
const Bun = globalThis.Bun || require("bun");

serve({
  port: process.env.PORT || 3002,
  fetch(req) {
    return new Response(Bun.file(`build${new URL(req.url).pathname}`));
  },
});
