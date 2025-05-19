export class TodoState {
  static PENDING = 'pending';
  static COMPLETED = 'completed';
  static ARCHIVED = 'archived';
}

export class TodoItem {
  constructor(text, priority = 'normal') {
    this.text = text;
    this.priority = priority;
    this.state = TodoState.PENDING;
    this.createdAt = new Date();
  }

  complete() {
    this.state = TodoState.COMPLETED;
  }

  archive() {
    this.state = TodoState.ARCHIVED;
  }

  reopen() {
    this.state = TodoState.PENDING;
  }
}