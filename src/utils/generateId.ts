import { customRandom, urlAlphabet } from "nanoid";
import { getRandom } from "./Random";

export const generateId = (): string => {
  const rng = getRandom();
  const nanoid = customRandom(urlAlphabet, 10, (size) => {
    return new Uint8Array(size).map(() => 256 * rng.nextNumber());
  });
  return nanoid();
};
