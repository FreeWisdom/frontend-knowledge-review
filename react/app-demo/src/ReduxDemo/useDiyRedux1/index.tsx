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
