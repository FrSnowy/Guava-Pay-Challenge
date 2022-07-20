import type * as T from "./types";
import { randomFrom, randomIntFromInterval } from "../../utils/random";
import createCachedGenerator from "../../utils/create-cached-generator";

const generateCard = (forInstitution: number, i: number): T.Account => ({
  id: i + 1,
  firstName: randomFrom(['Randy', 'Jim', 'Bob', 'David', 'Anna', 'Helen', 'Ivan', 'Olga']),
  lastName: randomFrom(['Any', 'Smiley', 'Random', 'Other', 'Another', 'Moreone']),
  avatar: randomIntFromInterval(0, 100) < 10 ? undefined : `https://api.lorem.space/image/face?w=96&h=96&i=${i}`,
  institutionID: forInstitution,
});

const accountGenerator = createCachedGenerator(generateCard);

export default accountGenerator;