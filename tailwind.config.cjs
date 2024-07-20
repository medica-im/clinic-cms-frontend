import { join } from 'path';
import type { Config } from 'tailwindcss';

// 1. Import the Skeleton plugin
import { skeleton } from '@skeletonlabs/tw-plugin';
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';

const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve(
			'@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {}
	},
	plugins: [
		typography,
		forms,
		skeleton({
			themes: {
				preset: [
					{ name: "skeleton", enhancements: true },
					"wintry"
				]
			}
		})
	]
} satisfies Config;

export default config;