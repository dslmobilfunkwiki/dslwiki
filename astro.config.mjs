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
	output: "server",
	adapter: cloudflare(),
	integrations: [
		starlight({
			defaultLocale: "de",
			pagination: false,
			editLink: {
				baseUrl: "https://github.com/dslmobilfunkwiki/dslwiki/edit/main/",
			},
			lastUpdated: true,
			head: [
				{
					tag: 'style',
					content: `.sidebar-content ul li:has(a[href="/disclaimer/"]), .sidebar-content ul li:has(a[href="/impressum/"]) { display: none !important; }`,
				},
			],
			components: {
				Sidebar: "./src/components/Sidebar.astro",
			},
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
							{ label: "Disclaimer", link: "/disclaimer/" },
							{ label: "Impressum", link: "/impressum/" },
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
			components: {
				Sidebar: "./src/components/Sidebar.astro",
			},
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
		resolve: {
			alias: {
				'starlight-sidebar-topics/overrides/Sidebar.astro': 'C:/Users/bitti/Documents/GitHub/dslwiki/src/components/Sidebar.astro',
			},
		},
		ssr: {
			noExternal: ['starlight-sidebar-topics'],
			optimizeDeps: {
				exclude: ['starlight-sidebar-topics'],
			},
		},
	},

});
