// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import { viewTransitions } from "astro-vtbot/starlight-view-transitions";

// starlight plugins
import starlightHeadingBadges from "starlight-heading-badges";
import emoji from "remark-emoji";
import starlightSidebarTopics from "starlight-sidebar-topics";
import {
	remarkExtendedTable,
	extendedTableHandlers,
} from "remark-extended-table";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
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
				//viewTransitions(),
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
						link: "/anbieter/",
						icon: "open-book",
						id: "learn2",
						items: [
							{
								label: "Anbieter",
								autogenerate: { directory: "anbieter" },
							},
						],
					},
					{
						label: "Hardware",
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
			title: "DSL Wiki",
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/dslmobilfunkwiki/dslwiki",
				},
			],
			customCss: ['./src/styles/global.css'],
		}),
	],
	markdown: {
		// `syntaxHighlight` inherited from Markdown

		// Markdown `remarkPlugins` ignored,
		// only `remarkPlugin2` applied.
		remarkPlugins: [emoji, [remarkExtendedTable, { tableCellPadding: false }]],
		// `gfm` overridden to `true`
		gfm: true,
		remarkRehype: {
			handlers: { ...extendedTableHandlers },
		},
	},
	vite: {
		plugins: [tailwindcss()],
	},
});
