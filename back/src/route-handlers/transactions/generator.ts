import createCachedGenerator from "../../utils/create-cached-generator";
import Currency from "../../constants/currency";
import { randomFrom, randomIntFromInterval, randomDateTime } from "../../utils/random";
import type * as T from "./types";

type GeneratorOptData = {
  allowedCardIDs: number[],
  allowedAccounts: number[],
}

const generateTransaction = (_: number, i: number, data: GeneratorOptData): T.Transaction => ({
  transactionID: i + 1,
  cardAccount: randomFrom(data.allowedAccounts as [number, ...number[]]),
  cardID: randomFrom(data.allowedCardIDs as [number, ...number[]]),
  currency: randomFrom([Currency.AZN, Currency.EUR, Currency.USD]),
  transactionDate: randomDateTime(),
  amount: randomIntFromInterval(1, 1000),
  merchantInfo: randomFrom(['Amazon', 'PizzaHut', 'VkusnoITochka', 'Google', 'Youtube', 'Spotify']),
});

const transactionGenerator = createCachedGenerator<T.Transaction, GeneratorOptData>(generateTransaction);
export default transactionGenerator;