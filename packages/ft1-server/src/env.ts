import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
    server: {
        SERVER_PORT: z.string(),
    },
    runtimeEnv: process.env,
});
