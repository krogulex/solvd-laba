function addValues(value1, value2) {
  if (
    (typeof value1 === "string" || typeof value1 === "number") &&
    (typeof value2 === "string" || typeof value2 === "number")
  ) {
    return value1 + value2;
  } else {
    throw new Error("Error! Value1 and Value2 must be strings or numbers.");
  }
}

function stringifyValue(value) {
  if (typeof value === "object") {
    return JSON.stringify(value);
  } else {
    return String(value);
  }
}

function invertBoolean(value) {
  if (typeof value === "boolean") {
    return !value;
  } else {
    throw new Error("Error! Value is not a boolean.");
  }
}

function convertToNumber(value) {
  if (typeof value === "boolean") {
    return value === true ? 1 : 0;
  } else if (typeof value === "number") {
    if (isNaN(value)) {
      throw new Error("This is NaN");
    }
    return value;
  } else if (typeof value === "string") {
    const valueNumeric = parseFloat(value);
    if (isNaN(valueNumeric)) {
      throw new Error("This string can't convert to number.");
    }
    return valueNumeric;
  } else {
      throw new Error("This value can't convert to number.");
  }
}

function convertToBoolean(value) {
  if (typeof value === "string") {
    if (value === "") {
      return false;
    } else {
      return true;
    }
  } else if (typeof value === "number") {
    if (value === 1) {
      return true;
    } else if (value === 0) {
      return false;
    } else {
      throw new Error("Converting number to boolean is not possible.");
    }
  } else {
    throw new Error("Converting to boolean is not possible.");
  }
}

function coerceToType(value, type) {
  if (type === "boolean") {
    return convertToBoolean(value);
  } else if (type === "string") {
    return stringifyValue(value);
  } else if (type === "number") {
    return convertToNumber(value);
  } else {
    throw new Error("Unsupported type for coercion.");
  }
}

//Additional functions:

function reverseString(value) {
  if (typeof value === "string") {
    return value.split("").reverse().join("");
  } else {
    throw new Error("Value is not a string.");
  }
}

function reverseNumber(value) {
  if (typeof value === "number" && !isNaN(value)) {
    const reverse = (value) =>
      parseInt(String(value).split("").reverse().join(""), 10);
    return reverse(value);
  } else {
    throw new Error("Value is not a number.");
  }
}

function sumEveryIndexInArrays(array1, array2) {
  if (!Array.isArray(array1) || !Array.isArray(array2)) {
    throw new Error("array1 and array2 must be arrays.");
  }

  if (array1.length !== array2.length) {
    throw new Error("array1 and array2 must have the same length.");
  }

  const sum = [];
  for (let i = 0; i < array1.length; i++) {
    sum.push(addValues(array1[i], array2[i]));
  }
  return sum;
}

function minusValues(value1, value2) {
  if (typeof value1 === "number" && typeof value2 === "number") {
    return value1 - value2;
  } else if (typeof value1 === "string" && typeof value2 === "string") {
    const value1Numeric = parseFloat(value1);
    const value2Numeric = parseFloat(value2);

    if (isNaN(value1Numeric) || isNaN(value2)) {
      throw new Error("Subtraction is not possible for the given strings.");
    }
    return value1Numeric - value2Numeric;
  } else if (typeof value1 === "number" && typeof value2 === "string") {
    const value2Numeric = parseFloat(value2);
    if (isNaN(value1) || isNaN(value2Numeric)) {
      throw new Error("Subtraction is not possible for NaN.");
    }
    return value1 - value2Numeric;
  } else {
    throw new Error("Subtraction is not possible for the given types.");
  }
}

module.exports = {
  addValues,
  stringifyValue,
  invertBoolean,
  convertToNumber,
  convertToBoolean,
  coerceToType,
  reverseString,
  reverseNumber,
  sumEveryIndexInArrays,
  minusValues,
};
