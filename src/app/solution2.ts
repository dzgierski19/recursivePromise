import { PROMISEARRAY } from "./Global";

// solution with resolving promises because of its place in original array

// promises

const recursivePromiseB = <T, G>(
  arrayOfPromises: (() => Promise<T>)[],
  accumulator: T[] = []
): Promise<T[]> => {
  const lastItem = arrayOfPromises.shift()!();
  return lastItem
    .then((result) => {
      accumulator.push(result);
      if (arrayOfPromises.length === 0) {
        return accumulator;
      }
      return recursivePromiseB(arrayOfPromises, accumulator);
    })
    .catch((error) => {
      return accumulator;
    });
};

// ASYNC/AWAIT

const recursivePromiseAsyncAwaitB = async <T>(
  arrayOfPromises: (() => Promise<T>)[],
  accumulator: T[] = []
): Promise<T[]> => {
  try {
    const lastItem = await arrayOfPromises[0]();
    accumulator.push(lastItem);
    arrayOfPromises.shift();
    if (arrayOfPromises.length === 0) {
      return accumulator;
    }
    return recursivePromiseAsyncAwaitB(arrayOfPromises, accumulator);
  } catch (error) {
    return accumulator;
  }
};

console.time("A");
recursivePromiseAsyncAwaitB(PROMISEARRAY).then((value) => {
  console.log(value);
  console.timeEnd("A");
});
