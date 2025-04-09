import * as git from 'git-rev-sync';
import { type Environments } from '.';
import { getFullVersionName } from './version';
import { CurrentConfig } from '.';
import path from 'path';
import { fileURLToPath } from 'url';
import { version, name as appName } from '../package.json';

const DefaultEnvironment = 'development';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// fill *required* env variables here. they might not exist, but should be listed anyway

const appHash = process.env.APP_HASH || git.short(__dirname);
const appEnv = process.env.APP_ENV || process.env.NODE_ENV || DefaultEnvironment;

const requiredEnv = {
    PUBLIC_APP_ENV: appHash,
    PUBLIC_FULL_VERSION: `${appName} ${getFullVersionName(version, appEnv as Environments, appHash)}`,
    PUBLIC_ENABLE_LOGGER: CurrentConfig.EnableLogger,
    PUBLIC_APP_URL: CurrentConfig.Hostname,
};

export const setConfigToProcessEnv = () => {
    Object.entries(requiredEnv).forEach(([key, value]) => process.env[key] = String(value));
};

export function getConfig(obj: Record<Environments, any>, environment: string, stringify = false) {
    const env = environment || DefaultEnvironment;
    const config = obj[env];
    if (!config) {
        throw new Error('Config not found for environment: ' + env);
    }
    return stringify
        ? JSON.stringify(config)
        : config;
}

