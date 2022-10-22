// vite.config.js
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import * as path from 'path';
import { isoImport } from 'vite-plugin-iso-import'

const config: UserConfig = {
        plugins: [
                sveltekit(),
                isoImport()
        ],
        resolve: {
                alias: {
                        '$': path.resolve(__dirname, 'src'),
                        //'$lib': path.resolve('./src/lib/'),
                        '$i18n': path.resolve('./src/i18n/')
                }
        }
};

export default config;