// Promises
//https://tranquil-calendula-0cd.notion.site/Promises-f7326fd22f384d6eb7c859ede9484d94

//Task 1: Implement promiseAll Function

function promiseAll(array) {
  return new Promise((resolve, reject) => {
    const results = [];
    let numberOfResolved = 0;

    for (let i = 0; i < array.length; i++) {
      const promise = array[i];

      promise
        .then((result) => {
          results[i] = result;
          numberOfResolved++;

          if (array.length === numberOfResolved) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}

//const promises = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
//const promises = [Promise.resolve(1), Promise.reject(2), Promise.resolve(3)];
const delay = (ms, value) =>
  new Promise((res) => setTimeout(() => res(value), ms));

const promises = [delay(3000, "a"), delay(1000, "b"), delay(2000, "c")];

/* promiseAll(promises)
  .then((results) => {
    console.log("All promises resolved:", results);
  })
  .catch((error) => {
    console.error("At least one promise rejected:", error);
  }); */

//Task 2: Implement promiseAllSettled Function

function promiseAllSettled(array) {
  return new Promise((resolve, reject) => {
    const results = [];
    let numberOfSettled = 0;

    for (let i = 0; i < array.length; i++) {
      const promise = array[i];

      promise
        .then((result) => {
          const promiseData = {
            status: "fulfilled",
            value: result,
          };
          results[i] = promiseData;
          numberOfSettled++

          if (array.length === numberOfSettled) {
            resolve(results);
          }
        })
        .catch((error) => {
          const promiseData = {
            status: "rejected",
            reason: error,
          };
          results[i] = promiseData;
          numberOfSettled++

          if (array.length === numberOfSettled) {
            resolve(results);
          }
        });
    }
  });
}

 const promises2 = [
  Promise.resolve(1),
  Promise.reject("Error occurred"),
  Promise.resolve(3),
];

promiseAllSettled(promises2).then((results) => {
  console.log("All promises settled:", results);
  // Expected: [{ status: 'fulfilled', value: 1 },
  //            { status: 'rejected', reason: 'Error occurred' },
  //            { status: 'fulfilled', value: 3 }]
});

// Task 3: Implement Chaining of Promises as a Separate Function

function chainPromises(array) {
  let result = Promise.resolve();

  for (let i = 0; i < array.length; i++) {
    const promiseFn = array[i];

    result = result
      .then((result) => {
        return promiseFn(result);
      })
      .catch((error) => {
        return (result = Promise.reject(error));
      });
  }
  return result;
}

function asyncFunction1() {
  return Promise.resolve("Result from asyncFunction1");
}

function asyncFunction2(data) {
  return Promise.resolve(data + " - Result from asyncFunction2");
}

function asyncFunction3(data) {
  return Promise.resolve(data + " - Result from asyncFunction3");
}

const functionsArray = [asyncFunction1, asyncFunction2, asyncFunction3];

/* chainPromises(functionsArray)
  .then((result) => {
    console.log("Chained promise result:", result);
    // Expected: "Result from asyncFunction1 - Result from asyncFunction2 - Result from asyncFunction3"
  })
  .catch((error) => {
    console.error("Chained promise error:", error);
  }); */

//Task 4: Implement promisify Function

function promisify(callback) {
  return (value) => {
    return new Promise((resolve, reject) => {
      const secondCalback = (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      };
      callback(value, secondCalback);
    });
  };
}

function callbackStyleFunction(value, callback) {
  setTimeout(() => {
    if (value > 0) {
      callback(null, value * 2);
    } else {
      callback("Invalid value", null);
    }
  }, 1000);
}

/* const promisedFunction = promisify(callbackStyleFunction);

promisedFunction(3)
  .then((result) => {
    console.log("Promised function result:", result); // Expected: 6
  })
  .catch((error) => {
    console.error("Promised function error:", error);
  });
 */
