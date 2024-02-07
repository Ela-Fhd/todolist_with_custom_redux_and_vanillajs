import {
  ADD_TODO,
  CLEAR_TODOS,
  COMPLETE_TODO,
  DELETE_TODO,
  GET_ALL_TODO,
} from "./actionTypes.js";

export const addTodo = (todo) => {
  return { type: ADD_TODO, payload: todo };
};

export const deleteTodo = (id) => {
  return { type: DELETE_TODO, payload: id };
};

export const completeTodo = (id) => {
  return { type: COMPLETE_TODO, payload: id };
};

export const getAllTodo = () => {
  return { type: GET_ALL_TODO };
};

export const clearTodos = () => {
  return { type: CLEAR_TODOS };
};
