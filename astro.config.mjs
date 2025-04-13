// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
// starlight plugins
import starlightAutoSidebar from "starlight-auto-sidebar";
import starlightHeadingBadges from "starlight-heading-badges";
import starlightVersions from "starlight-versions";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    service: passthroughImageService(),
  },
  integrations: [
    starlight({
      plugins: [
        starlightAutoSidebar(),
        starlightHeadingBadges(),
        starlightVersions({
          versions: [{ slug: "0.0.1" }],
        }),
      ],
      customCss: [
        // Relative path to your custom CSS file
        "./src/styles/custom.css",
      ],
      title: "DSL Wiki",
      defaultLocale: "root", // optional
      locales: {
        root: {
          label: "Deutsch",
          lang: "de", // lang is required for root locales
        },
        en: {
          label: "English",
          lang: "en", // lang is required for root locales
        },
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/dslmobilfunkwiki/dslwiki",
        },
      ],
      sidebar: [
        {
          label: "Guides",
          autogenerate: { directory: "guides" },
        },
        {
          label: "Hardware",
          autogenerate: { directory: "hardware" },
        },
      ],
    }),
  ],

  adapter: cloudflare({
    imageService: "passthrough",
  }),
});
