import { DATA_OK, NO_PARAMETER_RESPONSE } from "../../constants/responses";
import type { GenerateRouteFn } from "../../types";
import { authBodyParser } from "./parsers";

const institutions: string[] = [];

// This is the only mock query handler
// It will just return next not busy account id to the fe app for the every unique provided email
const registerAuthRoute: GenerateRouteFn = s => s.post<{ Body: string }>('/auth', (req, reply) => {
  const parsedBody = authBodyParser(req.body);
  if (!parsedBody) return NO_PARAMETER_RESPONSE(reply, ['account']);

  const { account } = parsedBody;

  const institutionID = institutions.findIndex(inst => inst === account);
  if (institutionID > -1) return DATA_OK(reply, { institutionID: institutionID + 1 });

  institutions.push(account);
  return DATA_OK(reply, { institutionID: institutions.length });
});

export default registerAuthRoute;