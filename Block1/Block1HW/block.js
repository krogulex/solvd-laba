// Task 1: Quasi-Tagged Templates

const translations = {
  en: {
    greet: "Hello",
    intro: "Welcome to our website",
  },
  fr: {
    greet: "Bonjour",
    intro: "Bienvenue sur notre site web",
  },
};

const language = "fr"; // Change to "en" for English
const greeting = "greet";
const introduction = "intro";

function localize(strings, ...values) {
  const translationKey = values.join("");
  const translation = translations[language][translationKey];
  return translation;
}

const localizedGreeting = localize`${greeting}`;
const localizedIntroduction = localize`${introduction}`;

/* console.log(localizedGreeting); // Expected: "Bonjour" (for language "fr")  
console.log(localizedIntroduction); // Expected: "Bienvenue sur notre site web" (for language "fr") */

// Task 2: Advanced Tagged Template

const keywords = ["JavaScript", "template", "tagged"];
const template =
  "Learn ${0} tagged templates to create custom ${1} literals for ${2} manipulation.";

function highlightKeywords(template, keywords) {
  let index = 0;

  const spanGenerator = () => {
    const span = `<span class='highlight'>${keywords[index]}</span>`;
    index++;
    return span;
  };

  return template.replace(/\${(\d+)}/g, spanGenerator);
}

const highlighted = highlightKeywords(template, keywords);

//console.log(highlighted);
// Expected: "Learn <span class='highlight'>JavaScript</span> tagged templates to create custom <span class='highlight'>template</span> literals for <span class='highlight'>tagged</span> manipulation."

//Task 3: Multiline Tagged Template

function multiline(strings) {
  let number = 0;

  const newStrings = strings.map((string) =>
    string.replace(/\n/g, () => {
      number++;
      return `\n${number} `;
    })
  );

  return String(newStrings);
}

const code = multiline`  
function add(a, b) {  
return a + b;  
}`;

//console.log(code);
// Expected:
// "1 function add(a, b) {
// 2 return a + b;
// 3 }"

// Task 4: Implementing Debounce Function
let currentSetTimeoutID = null;

function debounce(func, delay) {
  return function (...args) {
    clearTimeout(currentSetTimeoutID);

    currentSetTimeoutID = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

function debouncedSearch(query) {
  // Perform search operation with the query
  console.log("Searching for:", query);
}

const debouncedSearchHandler = debounce(debouncedSearch, 500);

/* const inputElement = document.getElementById("search-input");

inputElement.addEventListener("input", (event) => {
  debouncedSearchHandler(event.target.value);
}); */

//Task 5: Implementing Throttle Function

let wait = false;

function throttle(func, delay) {
  return function (...args) {
    if (!wait) {
      func(...args);
      wait = true;

      setTimeout(() => {
        wait = false;
      }, delay);
    }
  };
}

function onScroll(event) {
  // Handle scroll event
  console.log("Scroll event:", event);
}

const throttledScrollHandler = throttle(onScroll, 1000);

//  window.addEventListener("scroll", throttledScrollHandler);

//Task 6: Currying Function Implementation

function curry(func, arity) {
  return function curried(...args) {
    if (args.length >= arity) {
      return func(...args);
    } else {
      return function (...moreArgs) {
        return curried(...args, ...moreArgs);
      };
    }
  };
}

function multiply(a, b, c) {
  return a * b * c;
}

const curriedMultiply = curry(multiply, 3);

const step1 = curriedMultiply(2); // Returns a curried function
const step2 = step1(3); // Returns a curried function
const result = step2(4); // Returns the final result: 2 * 3 * 4 = 24

console.log("Result:", result); // Expected: 24
