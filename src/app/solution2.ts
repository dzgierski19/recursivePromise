import { PROMISEARRAY } from "./Global";

// solution with resolving promises because of its place in original array

// promises

const recursivePromiseB = <T, G>(
  arrayOfPromises: (() => Promise<T>)[],
  accumulator: T[] = []
): Promise<T[]> => {
  arrayOfPromises.reverse();
  const lastItem = arrayOfPromises.pop()!();
  return lastItem
    .then((result) => {
      accumulator.push(result);
      if (arrayOfPromises.length === 0) {
        return accumulator;
      }
      return recursivePromiseB(arrayOfPromises.reverse(), accumulator);
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
    arrayOfPromises.reverse();
    const lastItem = await arrayOfPromises[arrayOfPromises.length - 1]();
    accumulator.push(lastItem);
    arrayOfPromises.pop();
    if (arrayOfPromises.length === 0) {
      return accumulator;
    }
    return recursivePromiseAsyncAwaitB(arrayOfPromises.reverse(), accumulator);
  } catch (error) {
    return accumulator;
  }
};

console.time("A");
recursivePromiseAsyncAwaitB(PROMISEARRAY).then((value) => {
  console.log(value);
  console.timeEnd("A");
});
