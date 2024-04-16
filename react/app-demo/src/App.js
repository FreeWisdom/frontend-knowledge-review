import "./App.css";
// import ContextDemo from "./ContextDemo.tsx";
// import HOCPackage from "./HOCPackage.tsx";
// import ReverseExtend from "./ReverseExtend.tsx";
// import ReverseExtendFun from "./ReverseExtendFun.tsx";
// import RenderControlFun from "./RenderControlFun.tsx";

// import ReduxLibDemo from "./ReduxDemo/useLibRedux/index.tsx";
// import store from "./ReduxDemo/useLibRedux/store.ts";
// import { Provider } from "react-redux";

// import ReduxDiyDemo0 from "./ReduxDemo/useDiyRedux0/index.tsx";
// import ReduxDiyDemo1 from "./ReduxDemo/useDiyRedux1/index.tsx";
import ReduxDiyDemo2 from "./ReduxDemo/useDiyRedux2/index.tsx";

function App() {
  return (
    <div className="App">
      {/* 

      // contex API 使用示例
      <ContextDemo />

      // 高级组件包裹
      <HOCPackage text="Hello World" />

      // 反向继承
      <ReverseExtend />
      <ReverseExtendFun /> 
      
      */}

      {/* 渲染控制-手写 useMemo */}
      {/* <RenderControlFun /> */}
      {/* <PropertyBroker title="Property Broker" /> */}

      {/* redux 使用示例 */}
      {/* <Provider store={store}>
        <ReduxLibDemo />
      </Provider> */}

      {/* 手写 redux 示例 */}
      {/* <ReduxDiyDemo0 /> */}
      {/* <ReduxDiyDemo1 /> */}
      <ReduxDiyDemo2 />
    </div>
  );
}

export default App;
