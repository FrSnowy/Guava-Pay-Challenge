import type { AuthBody } from "./types";

export const authBodyParser = (body: string) => {
  const { account } = JSON.parse(body);
  if (account === undefined) return false;

  return { account } as AuthBody;
}