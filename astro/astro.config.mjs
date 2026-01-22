// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import fs from 'node:fs';
import path from 'node:path';

const handbookDir = path.join(process.cwd(), 'src/content/docs/handbook');
const handbookFolders = fs.readdirSync(handbookDir, { withFileTypes: true })
	.filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('.') && dirent.name !== 'images')
	.map(dirent => ({
		label: dirent.name.charAt(0).toUpperCase() + dirent.name.slice(1),
		autogenerate: { directory: `handbook/${dirent.name}` },
	}));

// https://astro.build/config
export default defineConfig({
	image: {
		// Don't process GIFs - they can be too large
		service: {
			entrypoint: 'astro/assets/services/sharp',
			config: {
				limitInputPixels: false,
			},
		},
	},
	integrations: [
		starlight({
			title: 'FlowFuse Handbook',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/FlowFuse/website' }],
			head: [
				{
					tag: 'script',
					attrs: { type: 'module' },
					content: `
						import mediumZoom from 'https://esm.sh/medium-zoom@1.1.0';
						document.addEventListener('DOMContentLoaded', () => {
							mediumZoom('[data-zoomable]', { margin: 24, background: 'rgba(0, 0, 0, 0.9)' });
						});
						document.addEventListener('astro:page-load', () => {
							mediumZoom('[data-zoomable]', { margin: 24, background: 'rgba(0, 0, 0, 0.9)' });
						});
					`,
				},
			],
			sidebar: [
				{
					label: 'Handbook',
					items: [
						{ label: 'Overview', slug: 'handbook' },
					],
				},
				...handbookFolders,
			],
		}),
	],
});
