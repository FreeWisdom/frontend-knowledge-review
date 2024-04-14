import "./App.css";
import ContextDemo from "./ContextDemo.tsx";
import HOCPackage from "./HOCPackage.tsx";
import ReverseExtend from "./ReverseExtend.tsx";
import ReverseExtendFun from "./ReverseExtendFun.tsx";

function App() {
  return (
    <div className="App">
      <ContextDemo />
      <HOCPackage text="Hello World" />
      <ReverseExtend />
      <ReverseExtendFun />
      {/* <PropertyBroker title="Property Broker" /> */}
    </div>
  );
}

export default App;
