import {
  ADD_TODO,
  CLEAR_TODOS,
  COMPLETE_TODO,
  DELETE_TODO,
  GET_ALL_TODO,
} from "./actionTypes.js";

const todosReducer = (
  state = JSON.parse(localStorage.getItem("TODOS")) || [],
  { type, payload }
) => {
  switch (type) {
    case ADD_TODO: {
      let new_state = [...state];
      const new_todo = {
        id: Date.now(),
        title: payload,
        date: new Date().toLocaleString("en-US"),
        isCompleted: false,
      };
      new_state.push(new_todo);
      localStorage.setItem("TODOS", JSON.stringify(new_state));
      return new_state;
    }

    case CLEAR_TODOS: {
      let new_state = [...state];
      new_state = [];
      localStorage.setItem("TODOS", JSON.stringify(new_state));
      return new_state;
    }

    case DELETE_TODO: {
      let new_state = [...state];
      const filtered_todo = new_state.filter(
        (todo) => todo.id !== Number(payload)
      );
      localStorage.setItem("TODOS", JSON.stringify(filtered_todo));
      return filtered_todo;
    }

    case COMPLETE_TODO: {
      let new_state = [...state];
      let completed_todo = new_state.find(
        (todo) => todo.id === Number(payload)
      );
      completed_todo.isCompleted = !completed_todo.isCompleted;
      localStorage.setItem("TODOS", JSON.stringify(new_state));
      return new_state;
    }

    case GET_ALL_TODO: {
      return state;
    }

    default:
      return state;
  }
};

export default todosReducer;
