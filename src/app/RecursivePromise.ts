import { PROMISEARRAY } from "./Global";

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
      return accumulator;
    });
};

recursivePromise(PROMISEARRAY).then((value) => {
  console.log(value);
});

//type guard
