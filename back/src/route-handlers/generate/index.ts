import { EMPTY_OK, NO_PARAMETER_RESPONSE, UNHANDLED } from "../../constants/responses";
import type { GenerateRouteFn } from "../../types";
import { accountGenerator } from "../account";
import { cardsGenerator } from "../cards";
import { transactionGenerator } from "../transactions";
import { randomIntFromInterval } from "../../utils/random";
import { generateBodyParser } from "./parser";

const registerGenerateRoute: GenerateRouteFn = s => s.post<{ Body: string }>('/generate', (req, reply) => {
  const parsedBody = generateBodyParser(req.body);
  if (!parsedBody) return NO_PARAMETER_RESPONSE(reply, ['institutionID']);
  const { institutionID } = parsedBody;

  //Lets generate random accounts for current institution
  const accountsCount = randomIntFromInterval(2, 10);
  accountGenerator.generate(accountsCount, institutionID, {});
  const generatedAccounts = accountGenerator.cache[institutionID];
  if (!generatedAccounts) return UNHANDLED(reply);
  const accountIDs = generatedAccounts.map(acc => acc.id);

  //Lets generate cards for accounts in this institution
  const cardsCount = randomIntFromInterval(2, 10);
  cardsGenerator.generate(cardsCount, institutionID, { allowedAccounts: accountIDs });
  const generatedCards = cardsGenerator.cache[institutionID];
  if (!generatedCards) return UNHANDLED(reply);
  const cardIDs = generatedCards.map(c => c.cardID);

  //Lets generate transactions for this cards
  const transactionsCount = randomIntFromInterval(5, 100);
  transactionGenerator.generate(transactionsCount, institutionID, { allowedCardIDs: cardIDs, allowedAccounts: accountIDs });
  return EMPTY_OK(reply);
});

export default registerGenerateRoute;