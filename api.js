let todos = [
  { id: 1, text: "Learn JavaScript", completed: true },
  { id: 2, text: "Build a TODO App", completed: false },
  { id: 3, text: "Deploy the project", completed: false },
];

export function getTodos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...todos]);
    }, 500);
  });
}

export function addTodo(text) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newTodo = {
        id: Date.now(),
        text,
        completed: false,
      };
      todos.push(newTodo);
      resolve(newTodo);
    }, 300);
  });
}

export function toggleTodo(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const todoIndex = todos.findIndex(todo => todo.id === id);
      if (todoIndex !== -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed;
        resolve(todos[todoIndex]);
      } else {
        reject(new Error("TODO not found"));
      }
    }, 300);
  });
}

export function deleteTodo(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const initialLength = todos.length;
      todos = todos.filter(todo => todo.id !== id);
      if (todos.length < initialLength) {
        resolve({ id });
      } else {
        reject(new Error("TODO not found for deletion"));
      }
    }, 300);
  });
}