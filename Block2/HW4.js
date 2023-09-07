//Classes

//https://tranquil-calendula-0cd.notion.site/Classes-d4e0fc6a3b434e51b5f08a06b451fb75

//Homework Assignment: Building an Online Bookstore

//Class for creating books.
class Book {
  // Properties and methods...
  constructor(title, author, isbn, price, availability) {
    this.title = title,
    this.author = author,
    this.isbn = isbn,
    this.price = price;
    this.availability = availability;
  }

  //Method for adding a discount to the book price. Must be a number from 0 to 100.
  applyDiscount(percentage) {
    if (!isNaN(percentage && percentage > 0 && percentage <= 100)) {
      const discount = this.price * (percentage * 0.01);
      this.price = this.price - discount;
    } else {
      console.log(`${percentage} is not a valid discount percentage`);
    }
  }
}

//Class for creating users.
class User {
  // Properties and methods...
  constructor(name, email, userId) {
    this.name = name;
    this.email = email;
    this.userId = userId;
  }
}

//Class for creating user's carts.
class Cart {
  // Properties and methods...
  constructor(user) {
    this.user = user;
    this.inCart = [];
  }
  // Method for adding specific book to the specific user's cart.
  addBook(book) {
    //This if allow to add book poprawić to, bo powinno być availability obniżone dopiero  po złożeniu ordera
    if (book.availability > 0) {
      book.availability--;
      this.inCart.push(book);
      console.log("Book was added to the cart");
    } else {
      console.log("You can't add this book because book's availability is 0");
    }
  }
  // Method for removing specific book from specific user's cart.
  removeBook(book) {
    const index = this.inCart.indexOf(book);
    //This if allows to remove book from the cart only when there is this specific book in the cart.
    if (index === -1) {
      console.log("Can't remove book from the cart");
    } else {
      const removedBook = this.inCart.splice(index, 1);
      book.availability++;
      console.log("Book was removed from the cart");
    }
  }

  //Method for calculating current total price in this cart.
  calcTotalPrice() {
    let totalPrice = 0;

    for (const book of this.inCart) {
      totalPrice += book.price;
    }
    console.log(`Total price in this cart is ${totalPrice}`);
  }

  //Method for clearing cart after succes order.
  clearCart() {
    this.inCart = [];
  }

  //Method for paying for cart. Just a basic one. Just to show that this can be done.
  processPayment(cardNumber) {
    //Just to check if card number has 16 digits. Validation should be more complicated.
    if (cardNumber.length === 16) {
      console.log(`Payment successful!`);
      //Automatically placing an order.
      const order = new Order(this);
    } else {
      console.log("Payment failed. Please provide a valid card number.");
    }
  }
}

//Class for placing orders from the carts.
class Order {
  // Properties and methods...
  constructor(cart) {
    this.cart = cart;
    this.user = cart.user;
    this.books = cart.inCart;

    //Automatically call this method when Order instance is created.
    this.orderDetails();
  }

  //Method for displaying order's details.
  orderDetails() {
    //If there is no books in the cart method will console log this information.
    if (this.books.length > 0) {
      console.log(`Order placed by ${this.user.name}:`);
      let totalPrice = 0;
      for (const book of this.books) {
        totalPrice += book.price;
        console.log(`- ${book.title} by ${book.author}, price: $${book.price}`);
      }
      console.log(`Total price for this order is $${totalPrice}`);

      //Clearing cart that is passed while creating instance of Order.
      this.cart.clearCart();
    } else {
      console.log(`There are no books in this cart`);
    }
  }
}
//Class for the bookstore.
class Bookstore {
  constructor() {
    this.books = [];
  }

  //Method for adding books to the bookstore.
  addBook(book) {
    this.books.push(book);
  }

  // Method for searching books by phrase that is in their title.
  searchBooksByPhrase(phrase) {
    const foundBooks = this.books.filter((book) =>
      book.title.toLowerCase().includes(phrase.toLowerCase())
    );

    if (foundBooks.length > 0) {
      console.log(`Books found with phrase: '${phrase}':`);
      foundBooks.forEach((book) => {
        console.log(`- ${book.title} by ${book.author}`);
      });
    } else {
      console.log(`No books found with this phrase: '${phrase}'.`);
    }
  }
}

// Instantiate objects and simulate bookstore interactions...

//Basic scenario task:

// Creating instances of Book.
const book1 = new Book("Introduction to Algorithms", 'Thomas H. Cormen', "978-0-9767736-6-5", 30, 3 );
const book2 = new Book("The Art of Computer Programming", 'Donald E. Knuth', "978-0-201-89683-1", 40, 5 );
const book3 = new Book("Clean Code: A Handbook of Agile Software Craftsmanship", 'Robert C. Martin', "978-0-13-235088-4", 25, 2 );
const book4 = new Book("Design Patterns: Elements of Reusable Object-Oriented Software", 'Erich Gamma', "978-0-201-63361-0", 35, 4 );
const book5 = new Book("JavaScript: The Good Parts", 'Douglas Crockford', "978-0-596-00048-6", 20, 6 );

// Creating instances of User.
const user1 = new User("Alice Smith", "alice@example.com", 1);
const user2 = new User("Bob Johnson", "bob@example.com", 2);
const user3 = new User("Charlie Brown", "charlie@example.com", 3);

// Creating instances of Cart. Every Cart is bind to the user. For Example user1 has cart1..
const cart1 = new Cart(user1);
const cart2 = new Cart(user2);
const cart3 = new Cart(user3);

//Adding few books to cart1. cart1 belongs to user1.
cart1.addBook(book1);
cart1.addBook(book2);
cart1.addBook(book3);

//Removing book from the cart1.
cart1.removeBook(book3);

//Placing the order from cart1. user1 wanted to place an order from his cart1. After that his cart1 is empty.
const order1 = new Order(cart1);

//Proof that after placing the order cart1 does not have books.
console.log(cart1);

//End of the basic scenario task.

//Bonus task:

//Creating bookstore:

const bookstore = new Bookstore();

//Adding books to bookstore.
bookstore.addBook(book1);
bookstore.addBook(book2);
bookstore.addBook(book3);
bookstore.addBook(book4);
bookstore.addBook(book5);

// Searching for books by phrase.
console.log("Searching bookstore for books by phrase:");
bookstore.searchBooksByPhrase("a");
bookstore.searchBooksByPhrase("algorithm");

//Applying 20% discount to one book.
book2.applyDiscount(20);
console.log(book2);

//Scenario with payment example for user3

cart3.addBook(book4);
cart3.addBook(book5);

//Adding discount to book4
book4.applyDiscount(20);

//Case when user3 want to pay for his cart3. After paying. Program automatically placed and order.
cart3.processPayment("1234567890123456");
