import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { isoImport } from 'vite-plugin-iso-import'
import 'vitest/config';
import * as path from 'path';

export default defineConfig({
	optimizeDeps: {
		include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep'],
	},
	plugins: [
		paraglideVitePlugin(
			{ project: './project.inlang', outdir: './src/paraglide',			strategy: ['url', 'cookie', 'baseLocale'],
			}), sveltekit(), isoImport() /*, purgeCss()*/],
	resolve: {
		alias: {
			'$': path.resolve(__dirname, 'src'),
			'$msgs': path.resolve('./src/paraglide/messages.js'),
			'$prgld': path.resolve('./src/paraglide/'),
			'$components': path.resolve('./src/components/'),
			'$modals': path.resolve('./src/modals/')
		}
	},
	server: {
		proxy: {
			'/media/profile_images': 'https://sante-gadagne.fr'
		}
	}
});