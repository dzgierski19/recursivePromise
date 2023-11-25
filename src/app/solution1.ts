import { PROMISEARRAY } from "./Global";

// solution with resolving promises because of its resolving speed

// promises

const recursivePromise = <T>(
  arrayOfPromises: (() => Promise<T>)[],
  accumulator: T[] = []
): Promise<T[]> => {
  return Promise.race(
    arrayOfPromises.map((element, index) => {
      return element().then((value) => {
        return { value, index };
      });
    })
  )
    .then((firstPromise) => {
      accumulator.push(firstPromise.value);
      arrayOfPromises.splice(firstPromise.index, 1);
      return { arrayOfPromises, accumulator };
    })
    .then(() => {
      if (arrayOfPromises.length === 0) {
        return accumulator;
      }
      return recursivePromise(arrayOfPromises, accumulator);
    })
    .catch((error) => {
      return [...accumulator, error];
    });
};

// ASYNC/AWAIT

const recursivePromiseAsyncAwait = async <T>(
  arrayOfPromises: (() => Promise<T>)[],
  accumulator: T[] = []
): Promise<T[]> => {
  try {
    const race = await Promise.race(
      arrayOfPromises.map(async (element, index) => {
        const firstPromise = await element();
        return { firstPromise, index };
      })
    );
    accumulator.push(race.firstPromise);
    arrayOfPromises.splice(race.index, 1);
    if (arrayOfPromises.length === 0) {
      return accumulator;
    }
    console.log(arrayOfPromises.length);
    return recursivePromiseAsyncAwait(arrayOfPromises, accumulator);
  } catch (error) {
    return accumulator;
  }
};

console.time("A");
recursivePromise(PROMISEARRAY).then((value) => {
  console.log(value);
  console.timeEnd("A");
});
