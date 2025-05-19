export class TodoFactory {
  static createTodoItem(text, priority = 'normal') {
    return new TodoItem(text, priority);
  }
}