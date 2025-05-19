import { TodoFactory } from './todoFactory.js';
import { TodoList } from "./todoList.js";
import { TodoSorter } from './todoSorter.js';

export const Commands = {
  ADD: "add",
  DELETE: "delete",
  COMPLETE: "complete",
  ARCHIVE: "archive",
  SORT: "sort"
};

export const CommandExecutor = {
  execute(command) {
    const todoList = TodoList.getInstance();
    switch (command.name) {
      case Commands.ADD:
        const todoInput = globalThis.DOM.todoInput;
        const todoText = todoInput.value.trim();
        const todoExist = todoList.find(todoText);
        if (todoExist == undefined && todoText !== "") {
          const newTodo = TodoFactory.createTodoItem(todoText);
          todoList.add(newTodo);
          todoInput.value = "";
        }
        break;
      case Commands.COMPLETE:
        const todo = command.args.todo;
        todo.complete();
        todoList.notify();
        break;
      case Commands.ARCHIVE:
        const todoToArchive = command.args.todo;
        todoToArchive.archive();
        todoList.notify();
        break;
      case Commands.SORT:
        todoList.setSortStrategy(command.args.strategy);
        break;
      case Commands.DELETE:
        break;
    }
  },
};
