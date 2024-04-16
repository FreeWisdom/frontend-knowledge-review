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

export const store = createStore(initialState);
