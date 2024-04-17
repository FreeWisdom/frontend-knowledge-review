import React from "react";
import { connect } from "./connect";

const ReduxDiyDemo = (props) => {
  const { counter, info, increment, decrement, updateName } = props;

  return (
    <div>
      <h2>Count: {counter.count}</h2>
      <h2>Name: {info.name}</h2>
      <button onClick={() => increment()}>Increment</button>
      <button onClick={() => decrement()}>Decrement</button>
      <input value={info.name} onChange={(e) => updateName(e.target.value)} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => {
      dispatch({ type: "INCREMENT" });
    },
    decrement: () => {
      dispatch({ type: "DECREMENT" });
    },
    updateName: (name: string) => {
      dispatch({ type: "UPDATE_NAME", payload: name });
    },
  };
};

const mapStateToProps = (state) => ({
  counter: state.counter,
  info: state.info,
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxDiyDemo);
