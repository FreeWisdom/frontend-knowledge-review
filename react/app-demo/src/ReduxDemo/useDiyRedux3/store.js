import { createStore, combineReducer } from "./redux";

const initialState = {
  counter: {
    count: 0,
  },
  info: {
    name: "张三",
  },
};

const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const nameReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_NAME":
      return { name: action.payload };
    default:
      return state;
  }
};

const reducer = combineReducer({
  counter: counterReducer,
  info: nameReducer,
});

export const store = createStore(reducer, initialState);
