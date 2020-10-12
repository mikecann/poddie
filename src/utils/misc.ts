import { wrap } from "./num";
import { getRandom } from "./Random";

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type ThenArg<T> = T extends Promise<infer U> ? U : T;

interface Omitted {
  <T extends object, K extends [...(keyof T)[]]>(obj: T, ...keys: K): {
    [K2 in Exclude<keyof T, K[number]>]: T[K2];
  };
}

export type Maybe<T> = T | null | undefined;

export const omit: Omitted = (obj, ...keys) => {
  let ret = {} as { [K in keyof typeof obj]: typeof obj[K] };
  let key: keyof typeof obj;
  for (key in obj) {
    if (keys.indexOf(key) == -1) {
      ret[key] = obj[key];
    }
  }
  return ret;
};

export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const ret: any = {};
  keys.forEach((key) => {
    ret[key] = obj[key];
  });
  return ret;
}

export const isEmpty = (value: any) => {
  if (typeof value === "number") return false;
  else if (typeof value === "string") return value.trim().length === 0;
  else if (Array.isArray(value)) return value.length === 0;
  else if (typeof value === "object")
    return value == null || Object.keys(value).length === 0;
  else if (typeof value === "boolean") return false;
  else return !value;
};

export const getGlobal = () => {
  if (typeof global != "undefined") return global;
  if (typeof window != "undefined") return window;
  throw new Error(`could not find global or window`);
};

export const getProcess = () => getGlobal().process;

export const checkEnv = (key: string, value: any) =>
  getProcess() && getProcess().env && getProcess().env[key] == value;

export const isProduction = () => checkEnv("NODE_ENV", "production");

export const makeLogSafe = (password: string) =>
  password
    .split("")
    .map((_) => "*")
    .join("");

export function wait(ms: number) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

export function waitForAtLeast<T>(
  minTimeMs: number,
  promise: Promise<T>
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    var minTimeReached = false;
    var promiseReturned = false;
    var value: T;
    var error: Error;

    var done = () => {
      if (error) reject(error);
      else resolve(value);
    };

    setTimeout(() => {
      minTimeReached = true;
      if (promiseReturned) done();
    }, minTimeMs);

    promise
      .then((v) => {
        value = v;
        promiseReturned = true;
        if (minTimeReached) done();
      })
      .catch((e) => {
        error = e;
        promiseReturned = true;
        if (minTimeReached) done();
      });
  });
}

export const fileExtension = (url: string) => {
  var re = /(?:\.([^.]+))?$/;
  var ext = re.exec(url);
  if (!ext || ext.length == 0) return "jpg";
  return ext;
};

// export const deDupe = (array: string[]): string[] => [...new Set(array)];

export const resolveOr = async <T, U>(
  promise: Promise<T>,
  alternative: U
): Promise<T | U> => promise.catch(() => alternative);

/**
 * Executes a given function and swallows any thrown errors
 */
export const swallow = <T>(fn: () => Promise<T>) => (): void => {
  fn().catch((e) => {
    console.warn("caught an error but swallowing it", e);
  });
};

export const anything: any = {};

export const setFalse = (fn: (b: boolean) => void) => () => fn(false);

export const setTrue = (fn: (b: boolean) => void) => () => fn(true);

export const ensureNotUndefined = <T>(
  obj: T | undefined,
  err = `variable was undefined when it shouldnt have been.`
): T => {
  if (obj === undefined) throw new Error(err);
  return obj;
};

export const ensureNotNull = <T>(
  obj: T | null,
  err = `variable was null when it shouldnt have been.`
): T => {
  if (obj === null) throw new Error(err);
  return obj;
};

export const ensure = <T>(
  obj: T | undefined | null,
  err = `variable was undefined or null when it shouldnt have been.`
): T => {
  obj = ensureNotUndefined(obj, err);
  obj = ensureNotNull(obj, err);
  return obj;
};

export const ensureNotUndefinedFP = (
  err: string = `variable was undefined when it shouldnt have been.`
) => <T>(obj: T | undefined): T => {
  if (obj === undefined) throw new Error(err);
  return obj;
};

export const ensureFP = ensureNotUndefinedFP;

export function limitStr(str: string, maxLen: number, elipsis: string = "...") {
  if (str.length < maxLen - elipsis.length) return str;

  return str.substr(0, Math.max(0, maxLen - elipsis.length)) + elipsis;
}

// Cleans up and prepends any missing scheme
export const hrefFromUrl = (url: string | undefined) => {
  if (!url) return "";

  const trimmed = url.trim();
  return trimmed.indexOf("://") === -1 ? "https://" + trimmed : trimmed;
};

export const expectEnv = <T extends string>(
  ...vars: T[]
): { [P in T]: string } => {
  const glob = getGlobal();
  for (let v of vars)
    if (glob.process.env[v] == null || glob.process.env[v] == undefined)
      throw new Error(`Missing expected environment variable '${v}'`);

  return vars.reduce(
    (accum, curr) => ({ ...accum, [curr]: glob.process.env[curr] }),
    {}
  ) as any;
};

export function notUndefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

// export function narray(count: number) {
//   return [...Array(Math.floor(count)).keys()];
// }

export function notNull<T extends unknown>(obj: T | undefined | null): T {
  if (obj == undefined || obj == null)
    throw new Error("Object should not be null or undefined");
  return obj;
}

export function trancateString(str: string, maxLen: number, elipsis = "...") {
  if (str.length < maxLen) return str;

  return str.substring(0, maxLen - 3) + elipsis;
}

export function randomOne<T>(items: T[]): T {
  return items[Math.floor(getRandom().nextNumber() * items.length)];
}

export const wrapIndex = (s: string, items: any[]) =>
  wrap(quickHash(s), items.length);

export const oneFromArrayBasedOnString = <T>(s: string, items: T[]): T =>
  items[wrap(quickHash(s), items.length)];

export const inputChangeHandler = (fn: (value: string) => any) => (e?: any) => {
  fn(e.target.value);
};

export const preventDefault = (fn: Function) => (e: {
  preventDefault: Function;
}) => {
  e.preventDefault();
  fn();
};

export const setFalseThen = (
  fn: (b: boolean) => void,
  thenFn?: Function
) => () => {
  fn(false);
  thenFn && thenFn();
};

export const setTrueThen = (
  fn: (b: boolean) => void,
  thenFn?: Function
) => () => {
  fn(true);
  thenFn && thenFn();
};

export function clamp(val: number, min: number, max: number) {
  if (val < min) return min;
  if (val > max) return max;
  return val;
}

export const quickHash = (s: string) => {
  var hash = 0,
    i,
    chr;
  if (s.length === 0) return hash;
  for (i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

export function leftPad(num: number, size: number): string {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export function getAt<T>(arr: T[], index: number): T {
  const el = arr[index];
  if (el == undefined)
    throw new Error(
      `Could not get element at index '${index}' in array, it appears to be undefined`
    );
  return el;
}

export const ensureFindIndex = <T>(
  arr: T[],
  pred: (el: T) => boolean,
  err = `Could not find element index`
) => {
  const index = arr.findIndex(pred);
  if (index == -1) throw new Error(err);
  return index;
};

export const simultaneously = <P, T extends Record<string, P>, U>(
  obj: T,
  fn: (entry: P) => Promise<U>
) => {
  return Promise.all(
    Object.entries(obj).map(([key, value]) =>
      fn(value).then((result) => ({ key, result }))
    )
  ).then((entries) =>
    entries.reduce(
      (accum, curr) => ({ ...accum, [curr.key]: curr.result }),
      {} as Record<keyof T, U>
    )
  );
};

export function exhaustiveCheck(param: never): never {
  throw new Error("should not reach here");
}

export const idArrayToRecord = <T extends { id: string }>(
  objects: T[]
): Record<string, T> => arrayToRecord(objects, (o) => o.id);

export const arrayToRecord = <T extends object>(
  objects: T[],
  getKey: (item: T) => string
): Record<string, T> => {
  const obj: any = {};
  for (let o of objects) obj[getKey(o)] = o;
  return obj;
};

export const potentialRecordToRecord = <T extends object>(
  potential: T[] | Record<string, T> | undefined,
  getKey: (item: T) => string
): Record<string, T> => {
  if (!potential) return {};
  if (Array.isArray(potential)) return arrayToRecord(potential, getKey);
  return potential;
};

export const buildQueryString = (obj: Record<string, any> | undefined) => {
  if (!obj) return ``;
  return (
    `?` +
    Object.keys(obj)
      .map((k) => `${k}=${obj[k]}`)
      .join("&")
  );
};

export const checkIfDuplicatesExistsInArray = (arr: string[]) =>
  new Set(arr).size !== arr.length;

// export const areSetsEqual = (a: Set<string>, b: Set<string>) => {
//   if (a.size !== b.size) return false;
//   for (let ael of a) if (!b.has(ael)) return false;
//   return true;
// };

// export const areObjectKeysEqual = (a: object, b: object) =>
//   areSetsEqual(new Set(Object.keys(a)), new Set(Object.keys(b)));

export const optionalParams = <T extends Record<string, any>>(
  params: Partial<T> | undefined,
  alternatives: T
): T =>
  Object.keys(alternatives).reduce(
    (accum, key) => ({
      ...accum,
      [key]:
        params && params[key] != undefined ? params[key] : alternatives[key],
    }),
    {}
  ) as any;

export const objectMap = <TInp, TOutp, TInpRecord extends Record<string, TInp>>(
  objInput: TInpRecord,
  mapper: (value: TInp, key: string) => TOutp
): Record<keyof TInpRecord, TOutp> => {
  const outp: any = {};
  for (let key in objInput) outp[key] = mapper(objInput[key], key);
  return outp;
};

export const objectMapStr = <TInp, TOut>(
  objInput: { [s: string]: TInp },
  mapper: (value: TInp, key: string) => TOut
): { [s: string]: TOut } => {
  const outp: any = {};
  for (let key in objInput) outp[key] = mapper(objInput[key], key);
  return outp;
};
