// Data Structures and Algorithms

// https://tranquil-calendula-0cd.notion.site/Data-Structures-and-Algorithms-0d434da97e4249efa86e491d840bb50b

//  Homework Assignment: Data Structures and Algorithms in JavaScript

// Class for Stack
class Stack {
  constructor() {
    //variables to store items in stack, and max and min values
    this.elements = [];
    this.minStack = null;
    this.maxStack = null;
  }
  // Implement methods for push, pop, peek...

  // Method for pushing new element to stack
  push(element) {
    this.elements.push(element);

    // Condition to establish max and min stack value
    if (element > this.maxStack || this.maxStack === null) {
      this.maxStack = element;
    }
    if (element < this.minStack || this.minStack === null) {
      this.minStack = element;
    }

    return element;
  }

  // Method for poping upper element from the stack
  pop() {
    const lastElement = this.elements.pop();

    // Condition to possible change in minStack and maxStack values
    if (this.elements.length === 0) {
      this.minStack = null;
      this.maxStack = null;
    } else {
      if (lastElement === this.minStack) {
        this.minStack = Math.min(this.elements);
      } else if (lastElement === this.maxStack) {
        this.maxStack = Math.max(this.elements);
      }
    }

    return lastElement;
  }

  // Method to console.log the upper value on the stack
  peek() {
    const lastElement = this.elements[this.elements.length - 1];
    return lastElement;
  }

  // Method for getting minimal value from the stack
  getMin() {
    if (this.minStack === null) {
      return console.log("There is no min stack");
    } else {
      return console.log(`Min stack is: ${this.minStack}`);
    }
  }

  // Method for getting maximum value from the stack
  getMax() {
    if (this.maxStack === null) {
      console.log("There is no max stack");
    } else {
      console.log(`Max stack is: ${this.maxStack}`);
    }
  }
}

// Class for Queue
class Queue {
  constructor() {
    this.elements = [];
  }

  // Implement methods for enqueue, dequeue, peek...

  // Method for addding elements to the queue
  enqueue(element) {
    this.elements.push(element);
    return element;
  }

  // Method for removing first element from the queue
  dequeue() {
    const firstElement = this.elements.shift();
    return firstElement;
  }

  // Method for console.log first element in line from the queue
  peek() {
    const firstElement = this.elements[0];
    return firstElement;
  }
}

// Class for Node. It helps to create binary tree
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

// Class for BinaryTree
class BinaryTree {
  constructor() {
    this.root = null;
    this.traversalInOrder = []; // array for storing traversal in order
  }
  // Implement methods for inserting nodes, searching, traversing...

  // Method for inserting new data to the binary tree
  insert(data) {
    const newNode = new Node(data); // Creating new Node

    if (!this.root) {
      this.root = newNode; // If there is no node in binary tree, code creats it
    } else {
      this.insertNewNode(this.root, newNode); // Calling function to crete new node which is connected to the previous node
    }
  }

  // Method that helps to insert data to the binary tree
  insertNewNode(node, newNode) {
    // Conditions to check where new node should be placed, after witch existed node and which side (right or left)
    if (newNode.data > node.data) {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNewNode(node.right, newNode);
      }
    } else if (newNode.data < node.data) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNewNode(node.left, newNode);
      }
    } else if (newNode.data === node.data) {
      throw new Error("You entered already existed node number"); // If already existed node was passed it wil throw an error
    } else {
      throw new Error("Error");
    }
  }

  // Method for searching specific node
  search(data) {
    return this.searchNode(this.root, data);
  }

  // Method that helps to find specific node. Method checks every node until it will find existed specific node and console.log success. On the other hand if searched node does not exist it will console.log it.
  searchNode(node, data) {
    if (!node) {
      throw new Error("Can't find this node ");
    }
    if (data === node.data) {
      return node;
    } else if (data < node.data) {
      return this.searchNode(node.left, data);
    } else {
      return this.searchNode(node.right, data);
    }
  }

  // Method for traversal all nodes in binary tree in ascending order
  inOrderTraversal() {
    this.traversalInOrder = [];
    this.inOrder(this.root);
    return this.traversalInOrder; // Returing sorted array
  }

  // Method that helps to put nodes in order
  inOrder(node) {
    if (node) {
      this.inOrder(node.left); // Starts from the lowest level on the left and moves right and up
      this.traversalInOrder.push(node.data); // Adding nodes to the array
      this.inOrder(node.right);
    }
  }

  // Method for checking if created binary tree is a valid binary search tree
  isBST() {
    const array = this.inOrderTraversal();
    // If traversal is in sorted ascending order this binary tree is valid binary search tree
    for (let index = 0; index < array.length; index++) {
      if (array[index] > array[index + 1]) {
        return console.log(`This binary tree is not valid BST`);
      }
    }
    return console.log(`This binary tree is valid BST`);
  }
}

// Class for Graph
class Graph {
  constructor() {
    this.vertices = {};
  }
  // Implement methods for adding vertices, edges, DFS, BFS...

  // Method for adding new vertex. Creating vertex with empty array with links to other vertexes
  addVertex(vertex) {
    if (!this.vertices[vertex]) {
      this.vertices[vertex] = [];
    }
  }

  // Method for creating links between existed vertexes
  addEdge(vertex1, vertex2) {
    if (this.vertices[vertex1] && this.vertices[vertex2]) {
      this.vertices[vertex1].push(vertex2);
      this.vertices[vertex2].push(vertex1);
      return;
    }
    throw new Error("Cant add edge, cant find two existed vertexes");
  }

  // Method breadth-first search
  BFS(vertex) {
    const visited = [vertex];
    const queue = [vertex];

    // Loop between vertexes until queue is empty
    while (queue.length > 0) {
      // Adding all vertexes that are neighbors to current vertex
      for (let i = 0; i < this.vertices[queue[0]].length; i++) {
        const element = this.vertices[queue[0]][i];
        if (!visited.includes(element)) {
          queue.push(element);
        }
      }

      // Adding vertexes to the already visited vertexes. All vertexes should be visited
      for (let i = 0; i < queue.length; i++) {
        const element = queue[i];
        if (!visited.includes(element)) {
          visited.push(element);
        }
      }

      // First element from the queue should be removed, because we already checked every neighbor of this element
      queue.shift();
    }

    return console.log(
      `Result of Breadth First Search starting from vertex "${vertex}": ${visited}`
    );
  }

  DFS(vertex) {
    const visited = [];
    const stack = [vertex];

    // Loop between vertexes until stack is empty
    while (stack.length > 0) {
      // Establish current vertex. it is the upper element from the stack
      const currentVertex = stack.pop();

      // If current vertex is not visited yet. Algorithm should check every linked vertex and their linked vertexes to the current vertex
      if (!visited.includes(currentVertex)) {
        visited.push(currentVertex);

        for (let i = 0; i < this.vertices[currentVertex].length; i++) {
          const nextVertex = this.vertices[currentVertex][i];
          if (!visited.includes(nextVertex)) {
            stack.push(nextVertex);
          }
        }
      }
    }

    // Consoling result
    return console.log(
      `Result of Depth First Search starting from vertex "${vertex}": ${visited}`
    );
  }

  reconstructPath(previous, endVertex) {
    const path = [endVertex];
    let current = endVertex;
    while (previous[current] !== null) {
      path.unshift(previous[current]);
      current = previous[current];
    }
    return path.join(" -> ");
  }

  BFSShortestPath(startVertex, endVertex) {
    const queue = [startVertex]; // Queue with the starting vertex
    const visited = {}; // Visited
    const previous = {}; // Prevoious vertex

    previous[startVertex] = null; // There is no prevoius vertex
    visited[startVertex] = true; // StartVertex as visited

    // Loop until queue is empty
    while (queue.length > 0) {
      const currentVertex = queue.shift();

      // Checking if vertex with the smallest distance is the end vertex
      if (currentVertex === endVertex) {
        const path = this.reconstructPath(previous, endVertex); // Creating path

        return console.log(
          `Shortest path from ${startVertex} to ${endVertex}: ${path}`
        );
      }

      // Loop in neighbors of the current vertex
      for (const neighbor of this.vertices[currentVertex]) {
        if (!visited[neighbor]) {
          queue.push(neighbor);
          visited[neighbor] = true;
          previous[neighbor] = currentVertex;
        }
      }
    }

    return console.log(`No path found from ${startVertex} to ${endVertex}`);
  }

  dijkstraShortestPath(startVertex, endVertex) {
    const distances = {}; // Distances from startVertex to every other vertex
    const previous = {}; // Previous vertex in the shortest path
    const visited = []; // Already visited vertices
    const queue = []; // Queue with vertices to visit

    // Initialize distances and previous for all vertices
    for (const vertex in this.vertices) {
      if (vertex === startVertex) {
        distances[vertex] = 0; // Distance startVertex is 0
      } else {
        distances[vertex] = Infinity; // Set initial distance to Infinity for others
      }
      previous[vertex] = null; // Initialize previous to null
      queue.push(vertex); // Add all vertices to the queue
    }

    while (queue.length > 0) {
      // Finding vertex with the smallest distance
      const minVertex = queue.reduce(
        (min, vertex) => (distances[vertex] < distances[min] ? vertex : min),
        queue[0]
      );

      // Removing the vertex from the queue
      queue.splice(queue.indexOf(minVertex), 1);

      // Checking if vertex with the smallest distance is the end vertex
      if (minVertex === endVertex) {
        const path = this.reconstructPath(previous, endVertex);
        return console.log(
          `Shortest path from ${startVertex} to ${endVertex}: ${path}`
        );
      }

      if (!visited.includes(minVertex)) {
        visited.push(minVertex);

        for (const neighbor of this.vertices[minVertex]) {
          const distance = distances[minVertex] + 1;
          if (distance < distances[neighbor]) {
            distances[neighbor] = distance; // Updating distance
            previous[neighbor] = minVertex; // Updating previous vertex
          }
        }
      }
    }

    return console.log(`No path found from ${startVertex} to ${endVertex}`);
  }
}

// Class for LinkedList
class LinkedList {
  constructor() {
    this.head = null;
  }

  // Method to insert a new node at the end of the linked list
  insert(data) {
    const newNode = { data, next: null };
    if (!this.head) {
      // If the list is empty, create first element
      this.head = newNode;
    } else {
      // else add next element to existed last element
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  // Method for deleting a specific node from the list
  delete(data) {
    if (this.head.data === data) {
      // If deleting the head, next element become the head
      this.head = this.head.next;
      return;
    }
    let current = this.head;
    let prev = null;
    while (current && current.data !== data) {
      prev = current;
      current = current.next;
    }
    if (!current) {
      return console.log("Node is not found");
    }
    // Remove the current node from the list by updating the previous node's next pointer
    prev.next = current.next;
  }

  // Method for searching a node with a specific value and return it
  search(data) {
    let current = this.head;
    while (current) {
      if (current.data === data) {
        return current;
      }
      current = current.next;
    }
    return console.log("Node is not found");
  }

  // Method for detecting a cycle in the linked list
  hasCycle() {
    let slow = this.head;
    let fast = this.head;

    while (fast !== null && fast.next !== null) {
      slow = slow.next; // Moving slow pointer by one step
      fast = fast.next.next; // Moving fast pointer by two steps

      // If the fast pointer meets the slow pointer, there is a cycle
      if (slow === fast) {
        return console.log("There is a cycle in this linked list");
      }
    }

    return console.log("There is no cycle in this linked list");
  }

  // Method for consoling list which does not have a cycle
  consoleList() {
    let current = this.head;
    const result = [];

    while (current) {
      result.push(current.data);
      current = current.next;
    }

    return console.log(result.join(" -> "));
  }
}

// Creating new Stack and use theirs methods
const stack = new Stack();

console.log(`Added elements to stack:`, stack.push(2), stack.push(10));
console.log(`Poped element from the stack:`, stack.pop());
console.log(`Added elements to stack:`, stack.push(50));

console.log(`Peek element from the stack:`, stack.peek());

console.log(stack);

// Getting min and max
stack.getMin();
stack.getMax();

// Creating new Queue and use theirs methods
const queue = new Queue();

console.log(
  `Added elements to stack:`,
  queue.enqueue(10),
  queue.enqueue(20),
  queue.enqueue(30)
);

console.log("Remove element from the start of the queue", queue.dequeue());

console.log(`Peek element from the queue:`, queue.peek());

console.log(queue);

// Creating new binaryTree and use their methods
const binaryTree = new BinaryTree();

binaryTree.insert(5);
binaryTree.insert(6);
binaryTree.insert(2);
binaryTree.insert(10);
binaryTree.insert(3);
binaryTree.insert(4);
binaryTree.insert(1);

console.log(binaryTree);

binaryTree.search(2);
console.log(`Node was found:`, binaryTree.search(2));

const inOrderTraversal = binaryTree.inOrderTraversal();
console.log(`Traversal in order: ${inOrderTraversal}`);
binaryTree.isBST();

// Creating graph and using theirs methods

const graph = new Graph();

// Adding vertexes
graph.addVertex("1");
graph.addVertex("2");
graph.addVertex("3");
graph.addVertex("4");
graph.addVertex("5");

// Adding vertexes edges
graph.addEdge("1", "2");
graph.addEdge("1", "4");
graph.addEdge("4", "5");
graph.addEdge("2", "3");
graph.addEdge("2", "5");

console.log(graph);

// Using method for depth first search and breadth first search
graph.BFS("2");
graph.DFS("2");

// Calculating shortest path in graph
graph.BFSShortestPath("4", "3");
graph.dijkstraShortestPath("4", "3");

//Creating a linkedList
const linkedList = new LinkedList();

//Inserting elements
linkedList.insert(1);
linkedList.insert(2);
linkedList.insert(3);
linkedList.insert(5);
linkedList.insert(6);

console.log(linkedList);

// Searching for specific element
console.log("Current element: ", linkedList.search(2));
console.log("Current element: ", linkedList.search(10));

// Deleting specific element
linkedList.delete(1);

console.log(linkedList);

// Making cycle in the existed list
//linkedList.head.next.next.next = linkedList.head.next;

linkedList.hasCycle();

linkedList.consoleList();
