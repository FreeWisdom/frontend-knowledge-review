import "./App.css";
// import ContextDemo from "./ContextDemo.tsx";
// import HOCPackage from "./HOCPackage.tsx";
// import ReverseExtend from "./ReverseExtend.tsx";
// import ReverseExtendFun from "./ReverseExtendFun.tsx";
// import RenderControlFun from "./RenderControlFun.tsx";

import ReduxDemo from "./ReduxDemo/index.tsx";
import store from "./ReduxDemo/useLibRedux/store.ts";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      {/* <ContextDemo />
      <HOCPackage text="Hello World" />
      <ReverseExtend />
      <ReverseExtendFun /> */}
      {/* <RenderControlFun /> */}
      {/* <PropertyBroker title="Property Broker" /> */}
      <Provider store={store}>
        <ReduxDemo />
      </Provider>
    </div>
  );
}

export default App;
