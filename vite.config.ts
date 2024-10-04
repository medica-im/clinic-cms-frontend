import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { isoImport } from 'vite-plugin-iso-import';
import * as path from 'path';

const config: UserConfig = {
	optimizeDeps: {
        include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep'],
		exclude: ['clinic-cms']
    },
	plugins: [sveltekit(), isoImport()],
	resolve: {
		alias: {
			'$': path.resolve(__dirname, 'src'),
			'$i18n': path.resolve('./src/i18n/'),
			'$components': path.resolve('./src/components/'),
			'$modals': path.resolve('./src/modals/')
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
