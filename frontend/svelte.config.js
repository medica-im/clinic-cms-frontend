import adapter from '@sveltejs/adapter-node';
import path from 'path'
import preprocess from 'svelte-preprocess';
import host from 'vite-plugin-host';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess({}),

    kit: {
	    // We have changed this to point to a build directory
	    adapter: adapter({ out: 'build' }),
        vite: {
			resolve: {
				alias: {
					$i18n: path.resolve('./src/i18n'),
					$lib: path.resolve('./src/lib')
				},
			},
		},
    }
};

export default config;