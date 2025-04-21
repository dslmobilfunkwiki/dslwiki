// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

// starlight plugins
import starlightAutoSidebar from "starlight-auto-sidebar";
import starlightHeadingBadges from "starlight-heading-badges";
import starlightVersions from "starlight-versions";
import emoji from "remark-emoji";

import yeskunallumami from "@yeskunall/astro-umami";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
    site: 'https://dsl.wiki',
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },
  server: { port: 9000, host: true},
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
          label: "Allgemeine Informationen",
          autogenerate: { directory: "allgemein" },
        },
        {
          label: "Hardware",
          autogenerate: { directory: "hardware" },
        },
        {
          label: "Internetprovider",
          autogenerate: { directory: "internetproviders" },
        },
      ],
    }),
    mdx({
      // `syntaxHighlight` inherited from Markdown

      // Markdown `remarkPlugins` ignored,
      // only `remarkPlugin2` applied.
      remarkPlugins: [emoji],
      // `gfm` overridden to `false`
      gfm: true,
    }),
    yeskunallumami({
      id: "e92c091d-a8ac-486f-804b-a19bf691f109",
      endpointUrl: "https://stats.dsl.wiki/",
    }),
  ],

  adapter: node({
    mode: "standalone",
  }),
});
// https://astro.build/config
