// @ts-check
import { defineConfig, passthroughImageService } from "astro/config";
import starlight from "@astrojs/starlight";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import { resolve } from 'node:path'

// starlight plugins
import starlightAutoSidebar from "starlight-auto-sidebar";
import starlightHeadingBadges from "starlight-heading-badges";
import starlightVersions from "starlight-versions";
import cloudflare from "@astrojs/cloudflare";
import emoji from "remark-emoji";
import { shield } from '@kindspells/astro-shield'

import yeskunallumami from "@yeskunall/astro-umami";

const rootDir = new URL('.', import.meta.url).pathname
const modulePath = resolve(rootDir, 'src', 'generated', 'sriHashes.mjs')

// https://astro.build/config
export default defineConfig({
  output: "server",
  vite: {
    plugins: [tailwindcss()],
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
   shield({
      sri: {
        enableMiddleware: true,   // MUST be enabled for dynamic pages!
        hashesModule: modulePath, // SHOULD be set!
        scriptsAllowListUrls: [
          'https://stats.dsl.wiki/script.js',
        ],
      },
      
      // - If set, it controls how the security headers will be
      //   generated in the middleware.
      // - If not set, no security headers will be generated in the
      //   middleware.
      securityHeaders: {
        // - If set, it controls how the CSP (Content Security Policy)
        //   header will be generated in the middleware.
        // - If not set, no CSP header will be generated in the
        //   middleware. (there is no need to specify its inner options)
        contentSecurityPolicy: {
          // - If set, it controls the "default" CSP directives (they
          //   can be overriden at runtime).
          // - If not set, the middleware will use a minimal set of
          //   default directives.
          cspDirectives: {
            'default-src': "'none'",
          },

        }
      }
    })
  ],

  adapter: cloudflare({
    imageService: "passthrough",
  }),
});
// https://astro.build/config
