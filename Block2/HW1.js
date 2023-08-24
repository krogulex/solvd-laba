// Analyzing Sorting Algorithm Performance

const array = [4, 3, 2, 9, 10, 42, 4, 5, 5];

function quickSort(array) {
  if (array.length <= 1) return array;

  const pivotIndex = Math.floor(Math.random() * array.length);
  const pivot = array[pivotIndex];

  let leftArray = [];
  let rightArray = [];

  for (let i = 0; i < array.length; i++) {
    if (i === pivotIndex) continue;

    if (array[i] < pivot) {
      leftArray.push(array[i]);
    } else {
      rightArray.push(array[i]);
    }
  }
  return [...quickSort(leftArray), pivot, ...quickSort(rightArray)];
}
//console.log(quickSort(array))

function bubbleSort(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }
  return array;
}
//console.log(bubbleSort(array));

function mergeSort(array) {
  if (array.length <= 1) return array;

  const middleElementIndex = Math.floor(array.length / 2);

  let leftArray = [];
  let rightArray = [];

  for (let i = 0; i < array.length; i++) {
    if (i < middleElementIndex) {
      leftArray.push(array[i]);
    } else {
      rightArray.push(array[i]);
    }
  }
  return mergeArrays(mergeSort(leftArray), mergeSort(rightArray));
}

function mergeArrays(leftArray, rightArray) {
  const sortedArray = [];
  let leftPointer = 0;
  let rightPointer = 0;

  while (leftPointer < leftArray.length && rightPointer < rightArray.length) {
    if (leftArray[leftPointer] <= rightArray[rightPointer]) {
      sortedArray.push(leftArray[leftPointer]);
      leftPointer++;
    } else {
      sortedArray.push(rightArray[rightPointer]);
      rightPointer++;
    }
  }

  sortedArray.push(...leftArray.slice(leftPointer));
  sortedArray.push(...rightArray.slice(rightPointer));

  return sortedArray;
}

//console.log(mergeSort(array));



function measureExecutionTime(sortFunction, array) {
  const startTime = performance.now();
  sortFunction(array);
  const endTime = performance.now();
  return endTime - startTime;
}

const arrayLengths = [
  2, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 125, 150, 175, 200, 300, 400, 500
];

const sortingAlgorithms = {
  quickSort,
  bubbleSort,
  mergeSort,
};

const sortedArrayResults = [
  ["Sorted Array"],
  ["Array Length", "QuickSort Time", "BubbleSort Time", "Merge Sort Time"],
];

const backwardArrayResults = [
  ["Backward sorted Array"],
  ["Array Length", "QuickSort Time", "BubbleSort Time", "Merge Sort Time"],
];

const randomArrayResults = [
  ["Random Array"],
  ["Array Length", "QuickSort Time", "BubbleSort Time", "Merge Sort Time"],
];

for (const length of arrayLengths) {
  const sortedArray = Array.from({ length }, (_, index) => index + 1);

  const result = [length];

  for (const algorithmName in sortingAlgorithms) {
    const executionTimeSorted = measureExecutionTime(
      sortingAlgorithms[algorithmName],
      sortedArray
    );

    const roundedTime = executionTimeSorted.toFixed(4);

    result.push([roundedTime + " ms"]);
  }
  sortedArrayResults.push(result);
}

for (const length of arrayLengths) {
  const backwardArray = Array.from({ length }, (_, index) => length - index);

  const result = [length];

  for (const algorithmName in sortingAlgorithms) {
    const executionTimeSorted = measureExecutionTime(
      sortingAlgorithms[algorithmName],
      backwardArray
    );

    const roundedTime = executionTimeSorted.toFixed(4);

    result.push([roundedTime + " ms"]);
  }
  backwardArrayResults.push(result);
}

for (const length of arrayLengths) {
  const randomArray = Array.from({ length: length }, () =>
    Math.floor(Math.random() * length)
  );

  const result = [length];

  for (const algorithmName in sortingAlgorithms) {
    const executionTimeSorted = measureExecutionTime(
      sortingAlgorithms[algorithmName],
      randomArray
    );

    const roundedTime = executionTimeSorted.toFixed(4);

    result.push([roundedTime + " ms"]);
  }
  randomArrayResults.push(result);
}

function createTable(data) {
  const columnWidths = [];

  data.forEach((row) => {
    row.forEach((cell, columnIndex) => {
      const cellWidth = cell.toString().length;
      if (!columnWidths[columnIndex] || cellWidth > columnWidths[columnIndex]) {
        columnWidths[columnIndex] = cellWidth;
      }
    });
  });

  data.forEach((row) => {
    let rowString = "";
    row.forEach((cell, columnIndex) => {
      const padding = columnWidths[columnIndex] - cell.toString().length + 2;
      rowString += cell.toString() + " ".repeat(padding);
    });
    console.log(rowString);
  });
  console.log();
  console.log();
}

createTable(sortedArrayResults);
createTable(backwardArrayResults);
createTable(randomArrayResults)

//Conclusions
/* 
Merge and quick sort algorithms are getting faster when array lenght is getting bigger. 
The break point is changing if array is sorted or backward sorted or have random numbers. 

In sorted array bubble sort is slower with about 60 elements in the array.
In backward sorted array bubble sort is slower from the beggining because it has to swap every element
In random array bubble sort is slower with about 60 elements in the array.

Quick sort and merge sort algorithms have similar execution time, especially in a sorted array. in backward sorted  quick sort is better, but in random merge sort is better.

 */