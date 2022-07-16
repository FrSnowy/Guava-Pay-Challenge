import type { FastifyReply } from "fastify";

export const ALL_OK = (reply: FastifyReply) => reply.code(200).send({
  statusCode: 200,
  error: false,
});

export const NO_PARAMETER_RESPONSE = (reply: FastifyReply, params: string[]) => reply.code(500).send({
  statusCode: 500,
  error: 'NO_PARAMETER_RESPONSE',
  message: `Can not find required parameters. Required: [${params.join(', ')}]`,
});

export const UNHANDLED = (reply: FastifyReply) => reply.code(500).send({
  statusCode: 500,
  error: `UNHANDLED`,
  message: 'Unhandler error'
});