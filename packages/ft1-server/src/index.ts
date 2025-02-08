import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import gameRoute from "./ws";
import { env } from "./env";

const app = new Elysia()
    .use(cors())
    .use(swagger({ path: "/docs" }))
    .group("/sub", (app) => app.use(gameRoute))
    .listen(env.PORT);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
