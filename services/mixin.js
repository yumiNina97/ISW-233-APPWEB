export const observerMixin = {
  observers: new Set(),
  addObserver(obs) {
    this.observers.add(obs);
  },
  removeObserver(obs) {
    this.observers.delete(obs);
  },
  notify() {
    // Separar por funcionalidad
    this.observers.forEach((obs) => obs());
  },
};
