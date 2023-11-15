const promise1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("First Promise resolved");
    }, 3000);
  });
};

const promise2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Second Promise resolved");
    }, 1000);
  });
};

const promise3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Third Promise resolved");
    }, 2000);
  });
};

const promise4 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Forth Promise resolved");
    }, 4000);
  });
};

export const PROMISEARRAY = [promise1, promise2, promise3, promise4];
