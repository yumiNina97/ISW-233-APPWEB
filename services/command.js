import { TodoHistory } from "./memento.js";
import { TodoItem, TodoList } from "./todoList.js";
import { TodoFactory } from "./todoFactory.js";

export class Command {
  name;
  args;
  constructor(name, args) {
    this.name = name;
    this.args = args;
  }
}

export const Commands = {
  ADD: "add",
  DELETE: "delete",
  UNDO: "undo",
};

export class CommandExecutor {
    static #commandHistory = [];

    static execute(command) {
        switch (command.type) {
            case Commands.ADD:
                // The 'payload' for ADD should be the text from the input field
                if (command.payload && command.payload.text && command.payload.text.trim() !== "") {
                    const newItem = TodoFactory.createTodoItem(command.payload.text.trim());
                    TodoList.getInstance().add(newItem);
                    this.#commandHistory.push({commandType: Commands.ADD, item: newItem});
                } else {
                    console.warn("Cannot add empty TODO item.");
                }
                break;
            case Commands.DELETE:
                // Payload for DELETE should be the text of the item to delete
                if (command.payload && command.payload.text) {
                    const itemToDelete = TodoList.getInstance().find(command.payload.text);
                    if (itemToDelete) {
                        TodoList.getInstance().delete(command.payload.text);
                        this.#commandHistory.push({commandType: Commands.DELETE, item: itemToDelete });
                    }
                }
                break;
            case Commands.UNDO:
                const lastCommandAction = this.#commandHistory.pop();
                if (lastCommandAction) {
                    if (lastCommandAction.commandType === Commands.ADD && lastCommandAction.item) {
                        TodoList.getInstance().delete(lastCommandAction.item.text);
                    } else if (lastCommandAction.commandType === Commands.DELETE && lastCommandAction.item) {
                        TodoList.getInstance().add(lastCommandAction.item); 
                    }
                    // Note: This simple undo for add/delete might not perfectly restore order or handle complex states.
                    // A more robust Memento pattern might be needed for complex undos.
                }
                break;
    }
}

// Ensure Command and Commands are defined and exported as you have them.
// export class Command { constructor(type, payload) { this.type = type; this.payload = payload; } }
// export const Commands = { ADD: 'ADD', DELETE: 'DELETE', UNDO: 'UNDO' /* ... */ };

export const CommandExecutor = {
  execute(command) {
    const todoList = TodoList.getInstance();
    switch (command.name) {
      case Commands.ADD:
        const todoInput = globalThis.DOM.todoInput;
        const todoText = todoInput.value.trim();
        const todoToAdd = todoList.find(todoText);

        if (todoText !== "" && todoToAdd == undefined) {
          todoList.add(new TodoItem(todoText));
          todoInput.value = "";
        }
        break;
      case Commands.DELETE:
        const [texTodo] = command.args;
        todoList.delete(texTodo);
        break;
      case Commands.UNDO:
        const todos = TodoHistory.pop();
        todoList.replaceList(todos);
        break;
    }
  },
};
