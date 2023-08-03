function stringPlus(string1, string2) {
  let result = "";
  let carry = 0;
  let x = string1.length - 1;
  let y = string2.length - 1;

  while (x >= 0 || y >= 0 || carry > 0) {
    const digit1 = x >= 0 ? parseInt(string1[x]) : 0;
    const digit2 = y >= 0 ? parseInt(string2[y]) : 0;

    const sum = digit1 + digit2 + carry;
    const digitSum = sum % 10;
    carry = Math.floor(sum / 10);

    result = digitSum.toString() + result;

    x--;
    y--;
  }

  return result;
}

function stringMinus(string1, string2) {
  /*   if (string2 > string1) {
    return console.log('String2 is bigger than string1')
  } */

  let result = "";
  let up = 0;
  let x = string1.length - 1;
  let y = string2.length - 1;

  while (x >= 0 || y >= 0 || up < 0) {
    const digit1 = x >= 0 ? parseInt(string1[x]) : 0;
    const digit2 = y >= 0 ? parseInt(string2[y]) : 0;

    let diff = digit1 - digit2 - up;

    if (diff < 0) {
      up = 1;
      diff = 10 + diff + 10;
    } else {
      up = 0;
    }

    const digitDiff = diff % 10;

    result = digitDiff.toString() + result;

    x--;
    y--;
  }

  return result;
}

function stringMultiply(string1, string2) {
  if (string1 === "0" || string2 === "0") {
    return "0";
  }
  if (string1 === "1") {
    return string2;
  }
  if (string1 === "1") {
    return string1;
  }
  let result = "0";
  let up = 0;

  for (let i = string1.length - 1; i >= 0; i--) {
    let resultEveryLoop = "";

    for (let j = string2.length - 1; j >= 0; j--) {
      const digit1 = parseInt(string1[i]);
      const digit2 = parseInt(string2[j]);

      let multi = digit1 * digit2 + up;
      const digitMulti = multi % 10;
      up = Math.floor(multi / 10);

      resultEveryLoop = digitMulti.toString() + resultEveryLoop;
    }

    if (up > 0) {
      resultEveryLoop = up.toString() + resultEveryLoop;
    }

    for (let k = i; k < string1.length - 1; k++) {
      resultEveryLoop += "0";
    }

    result = stringPlus(result.toString(), resultEveryLoop.toString());
  }
  return result;
}

function stringDivide(string1, string2) {
  if (string2 === "0") {
    throw new Error("Cannot divide by 0.");
  }

  if (string1 === "0") {
    return "0";
  }

  if (string1 === string2) {
    return "1";
  }

  if (string2 === "1") {
    return string1;
  }

  if (
    string2.length > string1.length ||
    (string2.length === string1.length && string2[1] > string1[1])
  ) {
    return "0";
  }

  let quotient = "";
  let dividend = "";

  for (let i = 0; i < string1.length; i++) {
    dividend += string1[i];

    if (parseInt(dividend) >= parseInt(string2)) {
      let count = 0;

      while (parseInt(dividend) >= parseInt(string2)) {
        dividend = stringMinus(dividend, string2);
        count++;
      }

      quotient += count;
    } else {
      quotient += "0";
    }
  }

  function removeLeadingZeros(str) {
    let i = 0;
    while (str[i] === "0") {
      i++;
    }

    return i === str.length ? "0" : str.substring(i);
  }
  
  return removeLeadingZeros(quotient);
}

const string1 = "4444444444444444444444444444444444444444440";
const string2 = "2";

const plusResult = stringPlus(string1, string2);
const minusResult = stringMinus(string1, string2);
const multiplyResult = stringMultiply(string1, string2);
const divideResult = stringDivide(string1, string2);

console.log("sum:", plusResult);
console.log("subtraction:", minusResult);
console.log("multiply:", multiplyResult);
console.log("quotient:", divideResult);