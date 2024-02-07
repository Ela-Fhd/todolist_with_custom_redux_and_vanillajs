const createStore = (Reducer) => {
  let state;
  function dispatch(action) {
    state = Reducer(state, action);
  }
  function getState() {
    return state;
  }
  return { dispatch, getState };
};

export default createStore;
