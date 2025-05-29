import { observerMixin } from "./mixins.js";
import { TodoItem } from "./todoItem.js"; // Import the detailed TodoItem

// Remove the local TodoItem class definition
// export class TodoItem {
//   constructor(text) {
//     this.text = text;
//   }
//   equals(other) {
//     return this.text == other.text;
//   }
// }

export class TodoList {
  #data = new Set();
  get items() {
    // Return an array for easier iteration and to prevent direct modification of the Set
    return Array.from(this.#data);
  }

  static instance = null;
  static {
    this.instance = new TodoList();
  }

  static getInstance() {
    return this.instance;
  }

  constructor() {
    if (TodoList.instance && TodoList.instance !== this) { // Ensure correct singleton check
      throw new Error("use getInstance");
    }
    // If TodoList.instance is null, this constructor is called by getInstance, so allow it.
  }

  add(item) {
    // Assuming item is an instance of TodoItem from todoItem.js
    // The Set will handle uniqueness based on object reference.
    // If you need uniqueness based on text, you'd need to check manually.
    let exists = false;
    for (const existingItem of this.#data) {
      if (existingItem.text === item.text) { // Simple text-based existence check
        exists = true;
        break;
      }
    }
    if (!exists) {
      this.#data.add(item);
      this.notify();
    }
  }

  delete(text_todo) {
    let itemToDelete = null;
    for (const item of this.#data) {
      if (item.text === text_todo) {
        itemToDelete = item;
        break;
      }
    }
    if (itemToDelete) {
      this.#data.delete(itemToDelete);
      this.notify();
    }
  }

  find(text_todo) {
    for (const item of this.#data) {
      if (item.text === text_todo) {
        return item;
      }
    }
    return undefined;
  }

  replaceList(list) {
    this.#data = new Set(list); // Ensure it's a Set if the input is an array
    this.notify();
  }
}

Object.assign(TodoList.prototype, observerMixin);
