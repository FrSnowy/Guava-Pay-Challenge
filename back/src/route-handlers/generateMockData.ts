import { EMPTY_OK, NO_PARAMETER_RESPONSE, UNHANDLED } from "../constants/responses";
import type { GenerateRouteFn } from "types";
import { accountGenerator } from "./accounts";
import { cardsGenerator } from "./cards";
import { transactionGenerator } from "./transactions";
import { randomIntFromInterval } from "../utils/random";

type GenerateMockDataBody = Partial<{
  institutionID: number;
}>;

const registerGenerateMockDataRoute: GenerateRouteFn = s => s.post<{
  Body: string
}>('/generate', (req, reply) => {
  const { institutionID } = JSON.parse(req.body) as GenerateMockDataBody;
  if (institutionID === null || institutionID === undefined) {
    return NO_PARAMETER_RESPONSE(reply, ['institutionID']);
  }

  //Lets generate random accounts for current institution
  const accountsCount = randomIntFromInterval(1, 10);
  accountGenerator.generate(accountsCount, institutionID, {});
  const generatedAccounts = accountGenerator.cache[institutionID];
  if (!generatedAccounts) return UNHANDLED(reply);
  const accountIDs = generatedAccounts.map(acc => acc.id);

  //Lets generate cards for accounts in this institution
  const cardsCount = randomIntFromInterval(1, 10);
  cardsGenerator.generate(cardsCount, institutionID, { allowedAccounts: accountIDs });
  const generatedCards = cardsGenerator.cache[institutionID];
  if (!generatedCards) return UNHANDLED(reply);
  const cardIDs = generatedCards.map(c => c.cardID);

  //Lets generate transactions for this cards
  const transactionsCount = randomIntFromInterval(5, 100);
  transactionGenerator.generate(transactionsCount, institutionID, { allowedCardIDs: cardIDs, allowedAccounts: accountIDs });
  return EMPTY_OK(reply);
});

export default registerGenerateMockDataRoute;