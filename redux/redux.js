const createStore = (Reducer) => {
  let state;
  let listeners = [];

  function dispatch(action) {
    state = Reducer(state, action);
    notifyListeners();
  }
  function getState() {
    return state;
  }

  function subscribe(listener) {
    listeners.push(listener);

    return function unsubscribe() {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  function notifyListeners() {
    listeners.forEach((listener) => listener());
  }

  return { dispatch, getState, subscribe };
};

export default createStore;
