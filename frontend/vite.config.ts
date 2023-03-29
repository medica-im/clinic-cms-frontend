import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import * as path from 'path';


const config: UserConfig = {
	optimizeDeps: {
        include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep']
    },
	plugins: [sveltekit()],
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
