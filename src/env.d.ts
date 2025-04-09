/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module '*.mov' {
	const src: string;
	export default src;
}

interface ImportMetaEnv {
	readonly PUBLIC_APP_ENV: string;
	readonly PUBLIC_FULL_VERSION: string;
	readonly PUBLIC_ENABLE_LOGGER: boolean;
	readonly PUBLIC_APP_URL: string;
}
interface ImportMeta {
	readonly env: ImportMetaEnv;
}
