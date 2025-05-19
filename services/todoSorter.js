export class TodoSorter {
  static byCreationDate(a, b) {
    return a.createdAt - b.createdAt;
  }

  static byPriority(a, b) {
    const priorities = { high: 3, normal: 2, low: 1 };
    return priorities[b.priority] - priorities[a.priority];
  }

  static byState(a, b) {
    const states = { pending: 1, completed: 2, archived: 3 };
    return states[a.state] - states[b.state];
  }
}