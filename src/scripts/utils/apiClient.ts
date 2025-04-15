import { ApiClient } from '@idle-multiverse/data-access';

export function getApiClient() {
    return new ApiClient(import.meta.env.PUBLIC_API_ENDPOINT, import.meta.env.PUBLIC_API_ACCESS_TOKEN);
}