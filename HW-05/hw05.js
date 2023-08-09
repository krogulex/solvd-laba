// Task 1: Advanced Array Filtering

const customFilterUnique = (array, callback) => {
  if (!Array.isArray(array)) {
    return "Input is not an array.";
  }

  const uniqueArray = Array.from(new Set(array));

  const filteredArray = [];

  for (let i = 0; i < uniqueArray.length; i++) {
    const element = uniqueArray[i];
    if (callback(element)) {
      filteredArray.push(element);
    }
  }
  return filteredArray;
};

const array1 = [1, 2, 3, 4, 5, 1]

const array2 = [
  { id: 1, name: "John" },
  { id: 2, name: "Jane" },
  { id: 3, name: "Maria" },
  { id: 4, name: "Tom" },
  { id: 5, name: "Monica" },
];

const numberBigerThan2 = (number) => {
  return number > 2 
};

console.log(customFilterUnique(array1, numberBigerThan2))

const idBigerThan2NameStartsWithM = (object) => {
  if (object.id > 2 && Array.from(object.name)[0] === "M") {
    return true;
  } else {
    return false;
  }
};

//console.log(customFilterUnique(array1, numberBigerThan2));

//console.log(customFilterUnique(array2, idBigerThan2NameStartsWithM));

// Task 2: Array Chunking

const chunkArray = (array, chunkSize) => {
  if (chunkSize === 0) {
    return;
  }
  const chunkedArray = [];
  let index = 0;

  while (index < array.length) {
    chunkedArray.push(array.splice(index, chunkSize));
  }
  return chunkedArray;
};

//console.log(chunkArray(array1, 2));

// Task 3: Array Shuffling

const customShuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//console.log(customShuffle(array1));

// Task 4: Array Intersection and Union

const getArrayIntersection = (array1, array2) => {
  const intersectionArray = [];

  for (let i = 0; i < array1.length; i++) {
    const element = array1[i];
    if (array2.includes(element)) {
      if (!intersectionArray.includes(element)) {
        intersectionArray.push(element);
      }
    }
  }

  return intersectionArray;
};

const array3 = [4, 5, 3, 4];

//console.log(getArrayIntersection(array1, array3));

const getArrayUnion = (array1, array2) => {
  const unionArray = [];

  for (let i = 0; i < array1.length; i++) {
    const element = array1[i];
    if (!array2.includes(element)) {
      if (!unionArray.includes(element)) {
        unionArray.push(element);
      }
    }
  }

  return unionArray;
};

//console.log(getArrayUnion(array1, array3));

//Task 5: Array Performance Analysis

const measureArrayPerformance = (fn, array, callback) => {

  const uniqueArray = Array.from(new Set(array));

  const startTime = performance.now();

  fn(uniqueArray, callback);

  const endTime = performance.now();
  const executionTime = endTime - startTime;

  console.log(`Function ${fn.name} needed ${executionTime} ms to execute`);
};

const filteredArray = (array) => {
  array.filter((number) => number > 2);

  return array;
};

measureArrayPerformance(customFilterUnique, array1, numberBigerThan2);

measureArrayPerformance(filteredArray, array1);

/*  When array1 = [1, 2, 3, 4, 5, 1, 2, 2, 5, 1, 2, 3, 4, 5, 1, 2, 2, 5, 1, 2, 3, 4, 5, 1, 2, 2, 5, 1, 2, 3, 4, 5, 1, 2, 2, 5];
Function customFilterUnique needed 0.018500030040740967 ms to execute
Function filteredArray needed 0.08969998359680176 ms to execute

When array1 = [1, 2, 3, 4, 5, 1];
Function customFilterUnique needed 0.020500004291534424 ms to execute
Function filteredArray needed 0.06610000133514404 ms to execute

It can be concluded that the filter method gives a slightly worse result than the custom filter function
  */
