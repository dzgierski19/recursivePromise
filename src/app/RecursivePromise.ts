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
    .then((array) => {
      console.log(array);
      if (array.arrayOfPromises.length === 0) {
        return accumulator;
      }
      return recursivePromise(array.arrayOfPromises);
    });
};

recursivePromise(PROMISEARRAY).then((value) => {
  console.log(value);
});
