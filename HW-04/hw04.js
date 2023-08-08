//Task 1: Object Property Manipulation
const person = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "john.doe@example.com",

  updateInfo: function (newInfo) {
    Object.keys(newInfo).forEach((property) => {
      if (person.hasOwnProperty(property) && Object.getOwnPropertyDescriptor(person, property).writable){
        Object.defineProperty(person, property, {
          value: newInfo[property],
          writable: false,
          configurable: true,
        });
      }
    });
  },
};

Object.keys(person).forEach((property) => {
  Object.defineProperty(person, property, {
    writable: false,
    configurable: true,
  });
});

Object.defineProperty(person, "address", {
  value: {},
  writable: true,
  enumerable: false,
  configurable: false,
});

person.updateInfo({ firstName: "maciek", age: 666 });
person.address = {
  street: "piekna",
  town: "Warsaw",
};

/* console.log(person);
console.log(person.address); */

//Task 2: Object Property Enumeration and Deletion

const product = {
  name: "Laptop",
  price: 1000,
  quantity: 5,
};

Object.keys(product).forEach((property) => {
  Object.defineProperty(product, property, {
    writable: false,
    enumerable: false,
  });
});

const getTotalPrice = (product) => {
  const priceDescriptor = Object.getOwnPropertyDescriptor(product, "price");
  const quantityDescriptor = Object.getOwnPropertyDescriptor(
    product,
    "quantity"
  );

  const price = priceDescriptor.value;
  const quantity = quantityDescriptor.value;

  const sum = price * quantity;

  return sum;
};

const deleteNonConfigurable = (product, propertyName) => {
  const property = Object.getOwnPropertyDescriptor(product, propertyName);

  if (property === undefined) {
    throw new Error(`There is no ${propertyName} property in this object`);
  }

  if (!property.configurable) {
    throw new Error("This property is not configurable");
  }

  delete product[propertyName];
  return product;
};

deleteNonConfigurable(product, "name");

/* console.log(product.name)
console.log(product.price) */

//Task 3: Object Property Getters and Setters

const bankAccount = {
  balance: 1000,

  get formattedBalance() {
    return `$${this.balance}`;
  },

  set setFormattedBalance(newBalance) {
    this.balance = newBalance;
  },
  transfer(nextAccount, amount) {
    if (this.balance < amount) {
      console.log("Amount is bigger than current balance!");
    } else {
      this.balance = this.balance - amount;

      nextAccount.balance = nextAccount.balance + amount;

      this.setFormattedBalance = this.balance;
      nextAccount.setFormattedBalance = nextAccount.balance;

      return console.log(`$${amount} was transfered to next account.
            First acc balance is ${this.formattedBalance}
            Next acc balance is ${nextAccount.formattedBalance} `);
    }
  },
};

/* console.log(bankAccount.formattedBalance);
bankAccount.setFormattedBalance = 200;
console.log(bankAccount.formattedBalance); */

const firstAccount = Object.create(bankAccount);
const secondAccount = Object.create(bankAccount);

/*firstAccount.transfer(secondAccount, 200);

 console.log(firstAccount)
console.log(secondAccount) */

//Task 4: Advanced Property Descriptors

const createImmutableObject = (object) => {
  if (typeof object !== "object") {
    return console.log("Input is not an object or array.");
  }

  const newObject = Array.isArray(object) ? [] : {};

  const propertyNames = Object.getOwnPropertyNames(object);

  for (const propertyName of propertyNames) {
    const descriptor = Object.getOwnPropertyDescriptor(object, propertyName);

    if (descriptor.value && typeof descriptor.value === "object") {
      descriptor.value = createImmutableObject(descriptor.value);
    }

    Object.defineProperty(newObject, propertyName, descriptor);
  }

  return Object.freeze(newObject);
};

const immutablePerson = createImmutableObject(person);

/* console.log(immutablePerson)

const propertyNames = Object.getOwnPropertyNames(immutablePerson);

propertyNames.forEach((propertyName) => {
  const descriptor = Object.getOwnPropertyDescriptor(immutablePerson, propertyName);
  console.log(`${propertyName}:`);
  console.log("Value:", descriptor.value);
  console.log("Writable:", descriptor.writable);
  console.log("Enumerable:", descriptor.enumerable);
  console.log("Configurable:", descriptor.configurable);
}); */

//Task 5: Object Observation

const observeObject = (object, callback) => {
  return new Proxy(object, {
    get(target, property) {
      return property in target
        ? callback(property, "get")
        : `There is no property ${property} in object ${object}`;
    },
    set(target, property, value) {
      object.updateInfo({ [property]: value });
      return property in target
        ? callback(property, "set")
        : `There is no property ${property} in object ${object}`;
    },
  });
};

const callback = (property, action, value) => {
  if (value) {
    return console.log(
      `Action '${action}' was performed on property '${property}', new value is ${value}`
    );
  }
  return console.log(
    `Action '${action}' was performed on property '${property}'`
  );
};

const observedPerson = observeObject(person, callback);

/* observedPerson.age = 50

console.log(observedPerson) */

//Task 6: Object Deep Cloning

const deepCloneObject = (object) => {
  if (typeof object !== "object") {
    return object;
  }
  const newObject = Array.isArray(object) ? [] : {};

  return Object.keys(object).reduce((acc, key) => {
    acc[key] = deepCloneObject(object[key]);
    return acc;
  }, newObject);
};

const clonedPerson = deepCloneObject(person);

clonedPerson.firstName = "klon";
clonedPerson.age = 10;

clonedPerson.updateInfo({ firstName: "clone", age: 0 });

/* console.log(clonedPerson);

console.log(person);
 */
// This function properly clone all data from the person object. But it does not clone function. Now when i use updateInfo on clonedPerson data is changing in person object, not clonedPerson. Is this allright? Maybe i should not clone functions? And also it does not copy object properites. Please give me feedback if it is necessary.

// Task 7: Object Property Validationconst

personSchema = {
  firstName: { type: "string", required: true },
  lastName: { type: "string", required: true },
  age: { type: "number", required: false, minAge: 0 },
  email: {
    type: "string",
    required: true,
    regex:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  updateInfo: { type: "function", required: false },
};

const validateObject = (object, validationSchema) => {
  for (const property in validationSchema) {
    if (validationSchema[property].required && !(property in object)) {
      return false;
    }
  }

  for (const property in object) {
    if (typeof object[property] !== validationSchema[property].type) {
      return false;
    }
    if (object[property] < validationSchema[property].minAge) {
      return false;
    }
    if (
      validationSchema[property].regex !== undefined &&
      !validationSchema[property].regex.test(object[property])
    ) {
      return false;
    }
  }

  return true;
};

const person2 = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
  email: "johnee3doeexa@mple.com",

  updateInfo: function (newInfo) {
    Object.keys(newInfo).forEach((property) => {
      if (person2.hasOwnProperty(property)) {
        Object.defineProperty(person2, property, {
          value: newInfo[property],
          writable: false,
          configurable: true,
        });
      }
    });
  },
};

console.log(validateObject(person2, personSchema));
