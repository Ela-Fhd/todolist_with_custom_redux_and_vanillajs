import createStore from "./redux.js";
import todosReducer from "./todo/todoReducer.js";

const store = createStore(todosReducer);
export default store;
