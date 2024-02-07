import store from "../redux/store.js";
import {
  addTodo,
  clearTodos,
  completeTodo,
  deleteTodo,
  getAllTodo,
} from "../redux/todo/actions.js";

const inputValue = document.querySelector(".todo-value");
const form = document.querySelector(".input-form");
const container = document.querySelector(".todo-container");

// filter btns
const allTodos = document.querySelector(".all-todos");
const incompleteTodos = document.querySelector(".incomplete-todos");
const completeTodos = document.querySelector(".complete-todos");
const todosState = document.querySelectorAll(".todos-state");

// operation btns
const clearAll = document.querySelector(".clearAll-btn");

// numbers
const numAllTodos = document.querySelector(".all-number");
const numCompletedTodos = document.querySelector(".completed-number");
const numIncompletedTodos = document.querySelector(".incompleted-number");

// pass active class between filter states
todosState.forEach((todo) => {
  todo.addEventListener("click", (e) => {
    document.querySelector(".todos-state.active").classList.remove("active");
    e.target.classList.add("active");
  });
});

//load all todos
window.addEventListener("load", () => {
  store.dispatch(getAllTodo());
  const todos = store.getState();
  numAllTodos.innerHTML = `(${todos.length})`;
  const completedTodos = todos.filter((todo) => todo.isCompleted);
  const incompletedTodos = todos.filter((todo) => !todo.isCompleted);
  numCompletedTodos.innerHTML = `(${completedTodos.length})`;
  numIncompletedTodos.innerHTML = `(${incompletedTodos.length})`;
  generateTodos(todos);
});

//add new todo
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = inputValue.value.trim();
  if (!value) return;
  store.dispatch(addTodo(value));
  inputValue.value = "";
  const todos = store.getState();
  generateTodos(todos);
  numAllTodos.innerHTML = `(${todos.length})`;
  const incompletedTodos = todos.filter((todo) => !todo.isCompleted);
  numIncompletedTodos.innerHTML = `(${incompletedTodos.length})`;
});

//clear all todos
clearAll.addEventListener("click", () => {
  store.dispatch(clearTodos());
  const todos = store.getState();
  generateTodos(todos);
  numAllTodos.innerHTML = `(${todos.length})`;
  const completedTodos = todos.filter((todo) => todo.isCompleted);
  const incompletedTodos = todos.filter((todo) => !todo.isCompleted);
  numCompletedTodos.innerHTML = `(${completedTodos.length})`;
  numIncompletedTodos.innerHTML = `(${incompletedTodos.length})`;
});

//delete todo
const handleDeleteTodo = (todoId) => {
  store.dispatch(deleteTodo(todoId));
  const todos = store.getState();
  generateTodos(todos);
  numAllTodos.innerHTML = `(${todos.length})`;
  const completedTodos = todos.filter((todo) => todo.isCompleted);
  const incompletedTodos = todos.filter((todo) => !todo.isCompleted);
  numCompletedTodos.innerHTML = `(${completedTodos.length})`;
  numIncompletedTodos.innerHTML = `(${incompletedTodos.length})`;
};

// bind handleDeleteTodo function to window
window.handleDeleteTodo = handleDeleteTodo;

//filter incomplete Todos
incompleteTodos.addEventListener("click", () => {
  store.dispatch(getAllTodo());
  const todos = store.getState();
  const incompleteTodos = todos.filter((todo) => !todo.isCompleted);
  generateTodos(incompleteTodos);
});

//filter complete Todos
completeTodos.addEventListener("click", () => {
  store.dispatch(getAllTodo());
  const todos = store.getState();
  const completeTodos = todos.filter((todo) => todo.isCompleted);
  generateTodos(completeTodos);
});

//show all todos
allTodos.addEventListener("click", () => {
  store.dispatch(getAllTodo());
  const todos = store.getState();
  generateTodos(todos);
});

//complete todo
const handleCompleteTodo = (todoId) => {
  store.dispatch(completeTodo(todoId));
  const todos = store.getState();
  generateTodos(todos);
  const completedTodos = todos.filter((todo) => todo.isCompleted);
  const incompletedTodos = todos.filter((todo) => !todo.isCompleted);
  numCompletedTodos.innerHTML = `(${completedTodos.length})`;
  numIncompletedTodos.innerHTML = `(${incompletedTodos.length})`;
};

// bind handleCompleteTodo function to window
window.handleCompleteTodo = handleCompleteTodo;

const generateTodos = (todos) => {
  container.innerHTML = "";
  todos.forEach((todo) => {
    container.insertAdjacentHTML(
      "beforeend",
      ` <li class="border-b border-b-gray-300 pb-2">
         <div class="flex items-center">
          <span class="${
            todo.isCompleted && "line-through decoration-red-400"
          }">${todo.title}</span>
           
          <button class="ml-auto border  px-2 py-1 text-xs  rounded-md transition ${
            todo.isCompleted
              ? "border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
              : " border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
          }" onclick="handleCompleteTodo(${todo.id})">${
        todo.isCompleted ? "completed" : "incompleted"
      }</button>
          <button class="ml-2" onclick=handleDeleteTodo("${todo.id}")>
            <img
              src="./assets/delete.png"
              alt="delete-todo"
              class="delete-btn w-5"
            />
          </button>
          </div>
         <p class="text-sm text-gray-400 mt-3">${todo.date}</p>
        </li>`
    );
  });
};
