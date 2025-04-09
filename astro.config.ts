import { defineConfig } from 'astro/config';
import * as AppConfig from './config/utils';
import sitemap from '@astrojs/sitemap';
import webmanifest from 'astro-webmanifest';
import { CurrentConfig } from './config';
import { defaultLang, languages } from './sitemap/copyright';
import { BaseMeta } from './sitemap/pages';

// https://astro.build/config

AppConfig.setConfigToProcessEnv();

export default defineConfig({
    vite: {
        assetsInclude: [
            '**/*.mov',
            '**/*.splinecode',
            '**/*.glb',
            '**/*.gltf',
        ],
        build: {
            assetsInlineLimit: 0,
            rollupOptions: {
                output: {
                    chunkFileNames: 'js/[name]-[hash].js',
                    entryFileNames: 'js/[name]-[hash].js',

                    assetFileNames: ({ name }) => {
                        if (/\.css$/.test(name ?? '')) {
                            return 'css/[name]-[hash][extname]';
                        }
                        const lottieImagePath = getLottieImagePath(name);
                        if (lottieImagePath) {
                            return lottieImagePath;
                        }
                        const lottieJSONPath = getLottieJSONPath(name);
                        if (lottieJSONPath) {
                            return lottieJSONPath;
                        }
                        if (/\.(png|jpe?g|gif|webp|ico)$/.test(name ?? '')){
                            return 'assets/img/[name]-[hash][extname]';
                        }
                        if (/\.(woff|woff2|eot|ttf|otf)$/.test(name ?? '')){
                            return 'assets/fonts/[name]-[hash][extname]';
                        }
                        if (/\.(webm|mp4|ogv|mov)$/.test(name ?? '')){
                            return 'assets/video/[name]-[hash][extname]';
                        }
                        if (/\.mp3$|\.wav$/.test(name ?? '')){
                            return 'assets/audio/[name]-[hash][extname]';
                        }
                        if (/\.glb$|\.gltf$/.test(name ?? '')){
                            return 'assets/glb/[name]-[hash][extname]';
                        }
                        return 'assets/[name]-[hash][extname]';
                    },
                },
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: "@import './src/styles/common/gem.scss';\r\n",
                },
                sass: {
                    additionalData: "@import './src/styles/common/gem.scss'\r\n",
                },
            },
        },
    },
    server: {
        port: 8080,
        host: true,
    },
    site: CurrentConfig.Hostname,
    integrations: [
        sitemap({
            i18n: {
                defaultLocale: defaultLang,
                locales: Object.keys(languages).reduce((prev, curr) => {
                    prev[curr] = curr;
                    return prev;
                }, {}),
            },
        },
        ),
        webmanifest({
            name: BaseMeta.Title,
            description: BaseMeta.Description,
            icon: 'src/assets/favicon.png',
            theme_color: '#FFFFFF',
            config: {
                insertAppleTouchLinks: true,
                insertThemeColorMeta: true,
            },
        }),
    ],
});

const getLottieImagePath = (name) => {
    const regex = /lottie[\\/]((.*)[\\/])?images[\\/].*\.(png|jpe?g|gif|webp)$/;
    const m = regex.exec(name);

    if (m !== null) {
        return `assets/lottie/${m[2] ? `${m[2]}/` : '' }images/[name][extname]`;
    }
};

const getLottieJSONPath = (name) => {
    const regex = /lottie[\\/]((.*)[\\/])?.*\.json$/;
    const m = regex.exec(name);

    if (m !== null) {
        return `assets/lottie/${m[2] ? `${m[2]}/` : '' }[name]-[hash][extname]`;
    }
};
