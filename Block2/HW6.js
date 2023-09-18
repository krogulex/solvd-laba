// Hash Functions and Hash Tables

// https://tranquil-calendula-0cd.notion.site/Hash-Functions-and-Hash-Tables-5196082ce5924bb89248635b5d57d82c

//### Task
/* Your task is to explore the concepts of hash functions and hash tables, and to implement a hash table with a custom hash function in JavaScript. This assignment will test your understanding of hash functions, collision resolution, and the practical application of hash tables. */

// Importing linkedList Class
const LinkedList = require("./HW5");

// Class for custum hash table
class CustomHashTable {
  // Conmstructor creates table with size 10, and every element is a linked list to hadnle collisions
  constructor() {
    this.size = 10;
    this.table = new Array(this.size);
    for (let i = 0; i < this.size; i++) {
      this.table[i] = new LinkedList();
    }
  }

  // Method for hashing
  hash(key) {
    let hash = 0;

    for (let i = 0; i < key.length; i++) {
      const charCode = key.charCodeAt(i);
      hash += charCode;
    }

    return hash % this.size;

    // More complicated hash function
    /*     let hash1 = 12459875;
    let hash2 = 55643356;

    const maxUInt32 = Math.pow(2, 32);

    for (let i = 0; i < key.length; i++) {
        const char = key.charCodeAt(i);
        hash1 = (((hash1 + char) % maxUInt32) * 4534543) % maxUInt32;
        hash2 = (((hash2 + char) % maxUInt32) * 5645645) % maxUInt32;
        hash1 = ((hash1 << 5) | (hash1 >>> 27)) % maxUInt32;
        hash2 = ((hash2 << 3) | (hash2 >>> 29)) % maxUInt32;
    }

    return ((hash1 + hash2) % maxUInt32) >>> 0; */
  }

  // Method for inserting new data
  insert(key, value) {
    const index = this.hash(key);
    const bucket = this.table[index];

    let currentNode = bucket.head;

    // Loop for checking if there is a node with key
    while (currentNode) {
      if (currentNode.data.key === key) {
        // Updating value
        currentNode.data.value = value;
        return;
      }
      currentNode = currentNode.next;
    }
    // Inserting new key -value to the table. Insert is a linked list method
    this.table[index].insert({ key, value });
  }

  // Method for getting existed data
  get(key) {
    // looking for index by hashing the key
    const index = this.hash(key);
    const bucket = this.table[index];

    let currentNode = bucket.head;

    // Looking for specific node in linked list
    while (currentNode) {
      if (currentNode.data.key === key) {
        // Returning found key and value
        return {
          key: currentNode.data.key,
          value: currentNode.data.value,
        };
      }
      currentNode = currentNode.next;
    }
    // Returning string if there is no such node in table
    return "Cant find value with this key";
  }

  // Method for deleting specific data from table
  delete(key) {
    const index = this.hash(key);
    const bucket = this.table[index];
    return bucket.delete(bucket.head.data);
  }
}

// Create an instance of CustomHashTable and demonstrate its usage...

// Creating instance of custumHashTable
const hashTable = new CustomHashTable();

// Inserting data to the table
hashTable.insert("name", "John");
hashTable.insert("lastName", "Doe");

console.log(hashTable.table[1]);

// Inserting data with the same key to see if values override
hashTable.insert("name", "Mary");
hashTable.insert("lastName", "Smith");

// Checking if the values was updated
console.log(hashTable.table[1]);

// Console log whole table
console.log(hashTable.table);

// Deleting element from hash table
hashTable.delete("lastName");

// Consoling to see the result
console.log(hashTable.table[1]);

// Consoling whole table
console.log(hashTable.table);

// Inserting other key - value which hashes to already occupied index in the table
hashTable.insert("team6", "Lakers");

// Checking the result
console.log(hashTable.table[7]);
console.log(hashTable.table[7].head.next);
