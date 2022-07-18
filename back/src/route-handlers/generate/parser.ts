import type { ParsedGenerateBody } from "./types";

export const generateBodyParser = (body: string) => {
  const { institutionID } = JSON.parse(body);
  if (institutionID === undefined) return false;

  return { institutionID } as ParsedGenerateBody;
};
