import React, { createContext, useContext, useState } from "react";

const propTypes = {};
const defaultProps = {};

const NavContex = createContext<any>({
  theme: "light",
  setTheme: () => {},
});
const history = window.history;

// const DiyButton = () => {
//   const navContexdata = useContext(NavContex);
//   console.log("navContexdata", navContexdata);
//   return (
//     <button onClick={() => {navContexdata?.setTheme("dark")}}>changeTheme</button>
//   )
// }

const WithRouter = (Component) => {

  // 类的写法
  class XXX extends React.Component {
    static contextType = NavContex;
    
    render() {
      return (
        <div>
          <button onClick={() => {(this.context as any)?.setTheme("dark")}}>changeTheme</button>
          <Component navContexdata={this.context}  />
        </div>
      );
    }
  }
  return XXX;

  // 函数写法
  //  return () => {
  //   return (
  //     <div>
  //       <DiyButton />
  //       <Component />
  //     </div>
  //   );
  // };
};

const Child = (props) => {
  // const {navContexdata} = props;
  const navContexdata = useContext(NavContex);

  return (
    <div>
      <div>WithRouter</div>
      <div>{navContexdata.theme}</div>
      <button
        onClick={() => {
          navContexdata.history.pushState(
            { params: "xxx" },
            "newPage",
            "./newPage"
          );
        }}
      >
        bbb
      </button>
    </div>
  );
};

const WithRouterChild = WithRouter(Child);

const Parent = () => {
  return (
    <div>
      <WithRouterChild />
    </div>
  );
};

const ContextDemo = () => {
  const [theme, setTheme] = useState("light");

  return (
    <NavContex.Provider
      value={{
        history: history || null,
        theme,
        setTheme,
      }}
    >
      <Parent />
    </NavContex.Provider>
  );
};

ContextDemo.propTypes = propTypes;
ContextDemo.defaultProps = defaultProps;

export default ContextDemo;
