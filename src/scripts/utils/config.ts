export const AppConfig = {
    Env: import.meta.env.PUBLIC_APP_ENV,
    FullVersionName: import.meta.env.PUBLIC_FULL_VERSION,
    EnableLogger: import.meta.env.PUBLIC_ENABLE_LOGGER,
    Supabase: {
        url: import.meta.env.PUBLIC_SUPABASE_URL,
        key: import.meta.env.PUBLIC_SUPABASE_KEY,
    },
};

export default AppConfig;
