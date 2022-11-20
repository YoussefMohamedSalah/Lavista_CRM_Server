declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DATABASE_PORT?: number;
            DATABASE?: string;
            DATABASE_PASSWORD?: string;
            HOST?: string;
            SECRET_HASH?: String;
        }
    }
}

export {};
