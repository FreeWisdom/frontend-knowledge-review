# 1、状态管理如何实现

1. 组件之外，可以全局共享数据状态
   - Closure 可以（runtime 的状态管理用这个）
   - Window/global 可以
2. 我修改数据，改了以后，相关方要感知到
   界面以一个函数来去感知，数据改变的时候，我把这个函数执行一下。
   - 发布订阅 -- redux
   - Proxy -- mobx
3. 修改状态，会触发 UI 更新 -- connect
   - setState
   - useState
   - forceUpdate

# 2、实现发布订阅的 redux

## 2.1、最简化的 Store

- 见 ./app-demo/src/ReduxDemo/useDiyRedux0

- redux.js

```js
export const createStore = (initialState) => {
  let data = initialState;
  let listeners = [];

  // listener 是订阅了 store 数据的函数
  // 需要在数据更新时候被调用执行
  // 在组件中 listener 执行时，会读取最新的 store 并更新视图
  const subscribe = (listener) => {
    listeners.push(listener);
  };

  const dispatch = (value) => {
    data = value;
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
```

- store.js

```js
import { createStore } from "./redux";

const initialState = {
  count: 0,
};

export const store = createStore(initialState);
```

- ReduxDiyDemo.tsx（组件中使用 store）

```tsx
import React, { useEffect } from "react";
import { useState } from "react";
import { store } from "./store.js";

const ReduxDiyDemo = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    store.subscribe(() => {
      const curData = store.getState();
      setCount(curData.count);
    });
  });

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => store.dispatch({ count: count + 1 })}>
        Increment
      </button>
      <button onClick={() => store.dispatch({ count: count - 1 })}>
        Decrement
      </button>
    </div>
  );
};

export default ReduxDiyDemo;
```

> 🤔：如何保证 dispatch 更改的 store 是 safe 状态？

## 2.2、实现 Reducer

- 见 ./app-demo/src/ReduxDemo/useDiyRedux1

- redux.js

```js
/**
 * 思路：
 * 入参：reducer, initialState
 * 返回值：store
 * store 中实现了：
 *    订阅 subscribe(listener)：在组件中 listener 执行时，会读取最新的 store 并更新视图
 *    发布 dispatch(action)：在组件中 dispatch 执行时，会传入 action，更新 store ，然后触发订阅的 listener 执行
 *    获取状态 getState()
 **/

export const createStore = (reducer, initialState) => {
  let data = initialState;
  let listeners = [];

  // listener 是订阅了 store 数据的函数
  // 需要在数据更新时候被调用执行
  // 在组件中 listener 执行时，会读取最新的 store 并更新视图
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
```

- store.js

```js
import { createStore } from "./redux";

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
```

- ReduxDiyDemo.tsx（组件中使用 store）

```tsx
import React, { useEffect } from "react";
import { useState } from "react";
import { store } from "./store.js";

const ReduxDiyDemo = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    store.subscribe(() => {
      const curData = store.getState();
      setCount(curData.count);
    });
  });

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => store.dispatch({ type: "INCREMENT" })}>
        Increment
      </button>
      <button onClick={() => store.dispatch({ type: "DECREMENT" })}>
        Decrement
      </button>
    </div>
  );
};

export default ReduxDiyDemo;
```

> 如何实现 一个 store 管理多个 state

## 2.3、实现 CombineReducer

- 见 ./app-demo/src/ReduxDemo/useDiyRedux2
- redux.js

```js
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
```

- store.js

```js
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
```

- ReduxDiyDemo.tsx（组件中使用 store）

```tsx
import React, { useEffect } from "react";
import { useState } from "react";
import { store } from "./store.js";

const ReduxDiyDemo = () => {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("ZHZ");

  useEffect(() => {
    store.subscribe(() => {
      const curData = store.getState();
      setCount(curData.counter.count);
      setName(curData.info.name);
    });
  });

  return (
    <div>
      <h2>Count: {count}</h2>
      <h2>Name: {name}</h2>
      <button onClick={() => store.dispatch({ type: "INCREMENT" })}>
        Increment
      </button>
      <button onClick={() => store.dispatch({ type: "DECREMENT" })}>
        Decrement
      </button>
      <input
        value={name}
        onChange={(e) =>
          store.dispatch({ type: "UPDATE_NAME", payload: e.target.value })
        }
      />
    </div>
  );
};

export default ReduxDiyDemo;
```

> 如何简化，组件中使用 subscribe 繁琐语法

## 2.4、实现 Connect（react-Redux）

# 3、实现 Proxy 的 Mobx
