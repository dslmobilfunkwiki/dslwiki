// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

// starlight plugins
import starlightHeadingBadges from "starlight-heading-badges";
import emoji from "remark-emoji";
import starlightSidebarTopics from "starlight-sidebar-topics";
import {
  remarkExtendedTable,
  extendedTableHandlers,
} from "remark-extended-table";
import { viewTransitions } from "astro-vtbot/starlight-view-transitions";

import yeskunallumami from "@yeskunall/astro-umami";
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  site: "https://dsl.wiki",
  output: "server",
  vite: {
    plugins: [tailwindcss()],
  },
  server: { port: 9000, host: true },
  integrations: [
    starlight({
      defaultLocale: "de",
      pagination: false,
      editLink: {
        baseUrl: "https://github.com/dslmobilfunkwiki/dslwiki/edit/main/",
      },
      components: {
        // Override the default `Sidebar` component with a custom one.
        Sidebar: "./src/components/Sidebar.astro",
      },
      lastUpdated: true,
      plugins: [
        viewTransitions(),
        starlightSidebarTopics([
          {
            label: "Allgemein",
            link: "/allgemein/",
            icon: "open-book",
            id: "learn",
            items: [
              { label: "Allgemein", autogenerate: { directory: "allgemein" } },
            ],
          },
          {
            label: "Internetanbieter",
            link: "/internetproviders/",
            icon: "open-book",
            id: "learn2",
            items: [
              {
                label: "Internetanbieter",
                autogenerate: { directory: "internetproviders" },
              },
            ],
          },
          {
            label: "Hardware ",
            link: "/hardware/",
            icon: "open-book",
            id: "learn3",
            items: [
              {
                label: "Hardware",
                autogenerate: { directory: "hardware" },
              },
            ],
          },
        ]),
        starlightHeadingBadges(),
      ],
      customCss: [
        // Relative path to your custom CSS file
        "./src/styles/custom.css",
      ],
      title: "DSL Wiki",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/dslmobilfunkwiki/dslwiki",
        },
      ],
    }),
    mdx({
      // `syntaxHighlight` inherited from Markdown

      // Markdown `remarkPlugins` ignored,
      // only `remarkPlugin2` applied.
      remarkPlugins: [emoji, remarkExtendedTable],
      // `gfm` overridden to `true`
      gfm: true,
      remarkRehype: {
        handlers: { ...extendedTableHandlers },
      },
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
