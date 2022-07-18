import type * as T from "./types";
import { randomFrom } from "../../utils/random";
import createCachedGenerator from "../../utils/create-cached-generator";

const generateCard = (forInstitution: number, i: number): T.Account => ({
  id: i,
  firstName: randomFrom(['Randy', 'Jim', 'Bob', 'David', 'Anna', 'Helen', 'Ivan', 'Olga']),
  lastName: randomFrom(['Any', 'Smiley', 'Random', 'Other', 'Another', 'Moreone']),
  institutionID: forInstitution,
});

const accountGenerator = createCachedGenerator(generateCard);

export default accountGenerator;