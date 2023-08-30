// Event Loop in Node.js

class AsyncOperationManager {
  //Method with setTimeout that delay console.log at least about the delay argument
  simulateAsyncOperation(delay) {
    // startTime for method to check real dealay
    const startTime = Date.now();

    setTimeout(() => {
      //end and actualTime of execution
      const endTime = Date.now();
      const actualTime = endTime - startTime;

      console.log(
        `Async operation completed after ${actualTime} ms (Expected: ${delay} ms)`
      );
      //Microtask in setTimeout after above console.log
      process.nextTick(() => {
        console.log("Microtask in setTimeout executed");
      });
    }, delay);
    //Microtask after setTimeout
    process.nextTick(() => {
      console.log("Microtask after SetTimeout executed");
    });
  }

  //Method with setImmediate that execute immediately
  scheduleImmediate() {
    setImmediate(() => {
      console.log("Immediate task executed");
      //Microtask in setImmediate after above console.log
      process.nextTick(() => {
        console.log("Microtask in setImmediate executed");
      });
    });
    //Microtask after setImmediate
    process.nextTick(() => {
      console.log("Microtask after setImmediate executed");
    });
  }

  // Implement process.nextTick scheduling and event loop interactions
}

// Creating manager by AsyncOperatonManager class
const manager = new AsyncOperationManager();

// Using simulateAsyncOperation method with 200 ms delay in manager object
manager.simulateAsyncOperation(200);


//First use scheduleImmediate method in the manager object
manager.scheduleImmediate();

// After using above method, nextTick is scheduled
process.nextTick(() => {
  console.log(
    "Microtask executed immediately after simulateAsyncsOperation and scheduleImmediate and before scheduleImmediate"
  );
});

//After microtask (nextTick), second use scheduleImmediate method in the manager object
manager.scheduleImmediate();

/*
console.logs:

1 Microtask after SetTimeout executed
2 Microtask after setImmediate executed
3 Microtask executed immediately after simulateAsyncsOperation and scheduleImmediate and before scheduleImmediate
4 Microtask after setImmediate executed
5 Immediate task executed
6 Microtask in setImmediate executed
7 Immediate task executed
8 Microtask in setImmediate executed
9 Async operation completed after 203 ms (Expected: 200 ms)
10 Microtask in setTimeout executed

loop events: 

JS want to call simulateAsyncOperation with delay 200ms, so this call is going from stack to webApis and then to the queue, 
then nextTick after setTimeout is scheduled and console.log 1, 
After simulateAsyncOperation there is scheduleImmediate
then nextTick after setImmediate is scheduled and console.log 2,
then nextTick after simulateAsyncsOperation and scheduleImmediate and before second scheduleImmediate is executed and console.log 3,
then nextTick after setImmediate is executed and console.log 4,

Then JS try to call setImmediate and console.log 5 and 6, 
After that second scheduleImmediate is called and console.log 7 and 8,

While all microtasks and scheduleImmediate are done, timeout is still in the callback queue. 
After execution microtask and immediate callbacks, stack is finally free, event loop checks the callback queue and
console.log 9 Async operation with delay bigger than 200ms.
then console.log 10.

*/
