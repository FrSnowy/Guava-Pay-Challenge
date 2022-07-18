import createCachedGenerator from "../../utils/create-cached-generator";
import Currency from "../../constants/currency";
import { randomFrom, randomIntFromInterval, randomDateTime } from "../../utils/random";
import type * as T from "./types";

type GeneratorOptData = {
  allowedCardIDs: number[],
  allowedAccounts: number[],
}

const generateTransaction = (_: number, i: number, data: GeneratorOptData): T.Transaction => ({
  transactionID: i,
  cardAccount: randomFrom(data.allowedAccounts as [number, ...number[]]),
  cardID: randomFrom(data.allowedCardIDs as [number, ...number[]]),
  currency: randomFrom([Currency.AZN, Currency.EUR, Currency.USD]),
  transactionDate: randomDateTime(),
  amount: randomIntFromInterval(0, 1000),
  merchantInfo: randomFrom(['Merchant info 1', 'Merchant info 2', 'Merchant info 3']),
});

const transactionGenerator = createCachedGenerator<T.Transaction, GeneratorOptData>(generateTransaction);
export default transactionGenerator;