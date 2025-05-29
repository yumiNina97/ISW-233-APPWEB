import { TodoList, TodoItem } from "./services/todoList.js";
import { CommandExecutor, Command, Commands } from "./services/command.js";
import { LocalStorage } from "./services/storage.js";

globalThis.DOM = {};

const DOM = globalThis.DOM;

// Make sure TodoFactory is imported if not already via other modules
// import { TodoFactory } from "./services/todoFactory.js"; 

function renderList() {
  const todos = TodoList.getInstance();
  DOM.todoList.innerHTML = "";
  for (let todo of todos.items) {
    const listItem = document.createElement("li");
    listItem.className = "todo-item";
    listItem.innerHTML = `${todo.text} 
                <button class="delete-btn">Delete</button>`;
    listItem.dataset.text = todo.text;
    DOM.todoList.appendChild(listItem);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  DOM.todoList = document.getElementById("todo-list");
  DOM.addBtn = document.getElementById("add-btn");
  DOM.todoInput = document.getElementById("todo-input");

  DOM.addBtn.addEventListener("click", () => {
    const todoText = DOM.todoInput.value;
    if (todoText.trim() !== "") {
      const cmd = new Command(Commands.ADD, { text: todoText }); // Pass text as payload
      CommandExecutor.execute(cmd);
      DOM.todoInput.value = ""; // Clear input after adding
    } else {
      alert("Please enter a task!");
    }
  });

  DOM.todoList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
      const todoText = event.target.parentNode.dataset.text;
      const cmd = new Command(Commands.DELETE, { text: todoText }); // Pass text as payload
      CommandExecutor.execute(cmd);
    }
    // Add logic for toggling complete/pending if needed
    // e.g., if (event.target.classList.contains('todo-item-text')) { ... }
  });

  LocalStorage.load(); // This likely populates TodoList.getInstance()

  renderList();
  TodoList.getInstance().addObserver(renderList);
});

document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && event.key === "p") {
    event.preventDefault();
    const cmd = new Command(Commands.ADD);
    CommandExecutor.execute(cmd);
  }
  if (event.ctrlKey && event.key === "z") {
    event.preventDefault();
    const cmd = new Command(Commands.UNDO);
    CommandExecutor.execute(cmd);
  }
});

// Update renderList to show more details and handle states
function renderList() {
  const todosInstance = TodoList.getInstance();
  DOM.todoList.innerHTML = "";
  // items should be an array now from TodoList.get items()
  for (let todo of todosInstance.items) { 
    const listItem = document.createElement("li");
    // Using BEM classes from previous suggestion
    listItem.className = "todo-app__item"; 
    if (todo.state === 'completed') { // Assuming 'completed' is a state in your TodoItem
        listItem.classList.add("todo-app__item--completed");
    }
    listItem.dataset.text = todo.text; // Keep for delete functionality

    const textSpan = document.createElement("span");
    textSpan.className = "todo-app__item-text";
    textSpan.textContent = todo.text;
    // Add event listener to textSpan for toggling completion if desired
    // textSpan.addEventListener('click', () => { /* toggle command */ });

    const deleteButton = document.createElement("button");
    deleteButton.className = "todo-app__delete-button delete-btn"; // Added BEM class
    deleteButton.textContent = "Delete";

    listItem.appendChild(textSpan);
    listItem.appendChild(deleteButton);
    DOM.todoList.appendChild(listItem);
  }
}
