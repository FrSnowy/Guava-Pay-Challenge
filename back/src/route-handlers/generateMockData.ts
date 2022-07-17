import { EMPTY_OK, NO_PARAMETER_RESPONSE, UNHANDLED } from "../constants/responses";
import type { GenerateRouteFn } from "types";
import { cardsGenerator } from "./cards";
import { transactionGenerator } from "./transactions";

type GenerateMockDataBody = Partial<{
  accountID: number;
  cardsCount: number;
  transactionsCount: number;
}>;

const registerGenerateMockDataRoute: GenerateRouteFn = s => s.post<{
  Body: string
}>('/generate', (req, reply) => {
  const { accountID, cardsCount, transactionsCount } = JSON.parse(req.body) as GenerateMockDataBody;
  if (accountID === null || accountID === undefined || !cardsCount || !transactionsCount) {
    return NO_PARAMETER_RESPONSE(reply, ['accountID', 'cardsCount', 'transactionsCount']);
  }

  cardsGenerator.generate(cardsCount, accountID);
  const generatedCards = cardsGenerator.cache[accountID];
  if (!generatedCards) return UNHANDLED(reply);

  const cardIDs = generatedCards.map(c => c.cardID);
  transactionGenerator.generate(transactionsCount, accountID, { allowedCardIDs: cardIDs });
  return EMPTY_OK(reply);
});

export default registerGenerateMockDataRoute;