import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import ws from "./ws";
import { env } from "./env";

const app = new Elysia()
    .use(cors())
    .use(swagger({ path: "/docs" }))
    .group("/sub", (app) => app.use(ws))
    .listen(env.PORT);

console.log(
    `🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
