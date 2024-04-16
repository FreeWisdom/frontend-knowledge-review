export const createStore = (reducer, initialState) => {
  let data = initialState;
  let listeners = [];

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  const dispatch = (action) => {
    data = reducer(data, action);
    listeners.forEach((listener) => listener());
  };

  const getState = () => {
    return data;
  };

  return {
    subscribe,
    dispatch,
    getState,
  };
};

export const combineReducer = (reducers) => {
  const keys = Object.keys(reducers); // 先拿到 ['counter', 'info'];

  // 返回的也是一个 reducer
  return function (state = {}, action) {
    const nextState = {};

    keys.forEach((key) => {
      const reducer = reducers[key]; // counterReducer, infoReducer
      const prev = state[key]; // { count: 1 },   { name: "luyi", age: 36 }
      const next = reducer(prev, action); // { count: 2 }, { name: "luyi", age: 37 }

      nextState[key] = next;
    });

    return nextState;
  };
};
