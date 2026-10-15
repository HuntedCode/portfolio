import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://jeffreylowe.dev",
  // Astro 7 defaults to 'jsx', which strips whitespace between inline elements and can run
  // words together. true keeps Astro 5's output, which the site was designed against.
  compressHTML: true,
  vite: {
    plugins: [tailwindcss()],
  },
});
