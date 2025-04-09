import { type Environments } from '.';

export function getFullVersionName(version: string, env: Environments, hash: string) {
    const v = version || '0';
    const e = (env || 'development')[0] || 'd';
    const h = hash ? ` (${hash})` : '';
    return 'v' + v + e + h;
}