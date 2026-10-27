import { z } from "zod";
const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.string().url("DATABASE_URL must be a valid URL"),
    CLIENT_ORIGIN: z.string().url("CLIENT_ORIGIN must be a valid URL").default("http://localhost:5173"),
});
const parseEnv = () => {
    const result = envSchema.safeParse(process.env);
    if (!result.success) {
        console.error("Invalid environment variables:");
        result.error.issues.forEach((issue) => {
            console.error(`  ${issue.path.join(".")}: ${issue.message}`);
        });
        process.exit(1);
    }
    return result.data;
};
export const env = parseEnv();
//# sourceMappingURL=env.js.map