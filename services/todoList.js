import { TodoFactory } from './todoFactory.js';
import { TodoSorter } from './todoSorter.js';
import { observerMixin } from "./mixin.js";

export class TodoItem {
  constructor(text) {
    this.text = text;
  }
}

export class TodoList {
  #data = new Set();
  #sortStrategy = TodoSorter.byCreationDate;

  get items() {
    return this.#data;
  }

  static instance = null;
  static {
    this.instance = new TodoList();
  }

  constructor() {
    if (TodoList.instance) {
      throw new Error("USe get instace");
    }
  }

  static getInstance() {
    return this.instance;
  }

  setSortStrategy(strategyFn) {
    this.#sortStrategy = strategyFn;
    this.notify();
  }

  add(todoItem) {
    const array = Array.from(this.#data);
    const todoExist = array.filter((t) => t.text == todoItem.text).length > 1;
    if (!todoExist) {
      this.#data.add(todoItem);
      this.notify();
    }
  }

  getSortedItems() {
    return Array.from(this.#data).sort(this.#sortStrategy);
  }
  delete() {}

  find(text) {
    const array = Array.from(this.#data);
    return array.find((t) => t.text == text);
  }
}

Object.assign(TodoList.prototype, observerMixin);
