//Task 1: Immutability and Pure Functions

const calculateDiscountedPrice = (array, discount) => {
  discount = discount * 0.01;

  const newArray = [];

  for (let i = 0; i < array.length; i++) {
    let element = array[i];
    const newPrice = element.price * discount;

    newArray.push({ product: element.product, price: newPrice });
  }
  return newArray;
};

const firstArray = [
  { product: "1", price: 10 },
  { product: "2", price: 50 },
  { product: "3", price: 30 },
];

// console.log(calculateDiscountedPrice(firstArray, 50))

const calculateTotalPrice = (array) => {
  let totalPrice = 0;

  for (let i = 0; i < array.length; i++) {
    let element = array[i].price;
    totalPrice = totalPrice + element;
  }
  return totalPrice;
};

//console.log(calculateTotalPrice(firstArray))

//Task 2: Function Composition and Point-Free Style

const person1 = {
  firstName: "Maciej",
  lastName: "Nowak",
};
const getName = (name, object) => object[name];
const addNames = (firstName, lastName) => `${firstName} ${lastName}`;

const getFullName = (person) => {
  const firstName = getName("firstName", person);
  const lastName = getName("lastName", person);
  const fullName = addNames(firstName, lastName);
  return fullName;
};

// console.log(getFullName(person1))

const string = "Hi person 12 welcome";

const getWords = (string) => string.split(" ");
const sortWords = (array) => array.sort();

const filterUniqueWords = (string) => {
  const arrayOfStrings = getWords(string);
  const sortedArrayOfStrings = sortWords(arrayOfStrings);
  return sortedArrayOfStrings;
};

//console.log(filterUniqueWords(string))
const students = [
  {
    name: "Celina",
    grades: [2, 4, 5, 5],
  },
  {
    name: "Albert",
    grades: [3, 3, 4, 5],
  },
  {
    name: "Tom",
    grades: [6, 5, 5, 2],
  },
];

const sumGrades = (student) =>
  student.grades.reduce((sum, grade) => sum + grade, 0);

const studendsAverageGrades = (array) =>
  array.map((student) => {
    const sumStudentGrades = sumGrades(student);
    const studentAverage = sumStudentGrades / student.grades.length;
    return {
      name: student.name,
      averageGrades: studentAverage,
    };
  });

const getAverageGrade = (array) => {
  const studentsAverage = studendsAverageGrades(array);
  return studentsAverage;
};

//console.log(getAverageGrade(students));

//Task 3: Closures and Higher-Order Functions

const createCounter = () => {
  let sum = 0;

  const inner = () => {
    sum = sum + 1;
    return sum;
  };
  return inner;
};

const closure = createCounter();

/* console.log(closure())
console.log(closure())
console.log(closure()) */

const repeatFunction = (fn, number) => {
  if (number > 0) {
    return (newFunction = () => {
      for (let i = 0; i < number; i++) {
        fn();
      }
    });
  } else if (number < 0) {
    return (newFunction = () => {
      while (true) {
        fn();
      }
    });
  } else {
    return;
  }
};

const test = () => {
  console.log("Test");
};

/* const test1 = repeatFunction(test, 5)
test1()

const test2 = repeatFunction(test, -2)
test2()

const test3 = repeatFunction(test, 0)
test2()
 */

//Task 4: Recursion and Tail Call Optimization

const calculateFactorial = (number, sum = 1) => {
  if (number === 0 || number === 1) {
    return sum;
  } else if (number < 0) {
    return "Number is negative";
  } else {
    return calculateFactorial(number - 1, number * sum);
  }
};

// console.log(calculateFactorial(50));

const power = (base, exponent, sum = 1) => {
  if (exponent === 0) {
    return sum;
  } else if (exponent < 0) {
    return power(base, exponent + 1, sum / base);
  } else {
    return power(base, exponent - 1, base * sum);
  }
};

/*   console.log(power(2, 5));
  console.log(power(3, 0));
  console.log(power(3, -5)); */

//Task 5: Lazy Evaluation and Generators

const numbers = [5, 2, 2, 6, 1];

const lazyMap = function (array, mappingFunction) {
  let index = 0;

  return {
    next: function () {
      if (index < array.length) {
        const value = mappingFunction(array[index]);
        index++;
        return { value: value, done: false };
      } else {
        return { done: true };
      }
    },
  };
};

const multiplyBy5 = (number) => {
  return number * 5;
};

const result = lazyMap(numbers, multiplyBy5);
/* 
console.log(result);

console.log(result.next());
console.log(result.next());
console.log(result.next());
console.log(result.next());
console.log(result.next());
console.log(result.next());
console.log(result.next()); */

const fibonacciGenerator = function () {
  let currentFiboNumber = 0;
  let nextFiboNumber = 1;

  return {
    next: function () {
      const value = currentFiboNumber;
      const x = nextFiboNumber;
      nextFiboNumber = currentFiboNumber + nextFiboNumber;
      currentFiboNumber = x;
      return { value: value, done: false };
    },
  };
};

const resultFibo = fibonacciGenerator();

console.log(resultFibo.next());
console.log(resultFibo.next());
console.log(resultFibo.next());
console.log(resultFibo.next());
console.log(resultFibo.next());
console.log(resultFibo.next());
console.log(resultFibo.next());
console.log(resultFibo.next());
console.log(resultFibo.next());
console.log(resultFibo.next());
console.log(resultFibo.next());
console.log(resultFibo.next());
