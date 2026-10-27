import { z } from "zod";
export declare const env: {
    NODE_ENV: z.core.$InferEnumOutput<{
        development: "development";
        production: "production";
        test: "test";
    }>;
    PORT: number;
    DATABASE_URL: string;
    CLIENT_ORIGIN: string;
};
//# sourceMappingURL=env.d.ts.map