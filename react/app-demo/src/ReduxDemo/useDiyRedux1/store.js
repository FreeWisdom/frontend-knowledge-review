import { createStore } from "./redux";

// const initialState = {
//   counter: {
//     count: 0,
//   },
//   info: {
//     name: "张三",
//     age: 25,
//   },
// };

const initialState = {
  count: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

export const store = createStore(reducer, initialState);
