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
      reject("Third Promise rejected");
    }, 2000);
  });
};

const promise4 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Fourth Promise resolved");
    }, 4000);
  });
};

export const PROMISEARRAY = [promise1, promise2, promise3, promise4];
