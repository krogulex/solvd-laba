//Classes

//https://tranquil-calendula-0cd.notion.site/Classes-d4e0fc6a3b434e51b5f08a06b451fb75

//Homework Assignment: Building an Online Bookstore

class Book {
// Properties and methods...
  constructor(title, author, isbn, price, availability) {
    this.title = title,
    this.author = author,
    this.isbn = isbn,
    this.price = price;
    this.availability = availability;
  }
}

class User {
// Properties and methods...
  constructor(name, email, userId) {
    this.name = name;
    this.email = email;
    this.userId = userId;
  }
}

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

    for (let index = 0; index < this.inCart.length; index++) {
      const book = this.inCart[index];
      totalPrice = totalPrice + book.price;
    }
    console.log(`Total price in this cart is ${totalPrice}`);
  }

  //Method for clearing cart after succes order. 
  clearCart() {
    this.inCart = [];
  }
}

class Order {   
 // Properties and methods...
  constructor(cart) {
    this.cart = cart;
    this.user = cart.user;
    this.books = cart.inCart;
  }

  //Method for displaying order's details
  orderDetails() {
    console.log(`Order placed by ${this.user.name}:`);
    let totalPrice = 0;
    for (const book of this.books) {
      totalPrice += book.price;
      console.log(`- ${book.title} by ${book.author}, price: $${book.price}`);
    }
    console.log(`Total price for this order is ${totalPrice}`);

    //Zmienić to, żeby order Details wyświetliło już w momencie swtorzenia tego ordera
    this.cart.clearCart();
  }
}

// Instantiate objects and simulate bookstore interactions...

const book1 = new Book("Introduction to Algorithms", 'Thomas H. Cormen', "978-0-9767736-6-5", 30, 3 );
const book2 = new Book("The Art of Computer Programming", 'Donald E. Knuth', "978-0-201-89683-1", 40, 5 );
const book3 = new Book("Clean Code: A Handbook of Agile Software Craftsmanship", 'Robert C. Martin', "978-0-13-235088-4", 25, 2 );
const book4 = new Book("Design Patterns: Elements of Reusable Object-Oriented Software", 'Erich Gamma', "978-0-201-63361-0", 35, 4 );
const book5 = new Book("JavaScript: The Good Parts", 'Douglas Crockford', "978-0-596-00048-6", 20, 6 );

const user1 = new User("Alice Smith", "alice@example.com", 1);
const user2 = new User("Bob Johnson", "bob@example.com", 2);
const user3 = new User("Charlie Brown", "charlie@example.com", 3);

const cart1 = new Cart(user1);
const cart2 = new Cart(user2);
const cart3 = new Cart(user3);

cart1.addBook(book1);
cart1.addBook(book2);
cart1.addBook(book3);

cart1.removeBook(book3);

const order1 = new Order(cart1);

order1.orderDetails();

console.log(cart1);
