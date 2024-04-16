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
