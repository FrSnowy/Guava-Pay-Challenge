import type fastify from "fastify";

export type GenerateRouteFn = (s: ReturnType<typeof fastify>) => void;