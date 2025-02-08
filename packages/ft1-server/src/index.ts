import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import gameRoute from "./ws";

const app = new Elysia()
    .use(cors())
    .use(swagger({ path: "/docs" }))
    .group("/sub", (app) => app.use(gameRoute))
    .listen(3001);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
