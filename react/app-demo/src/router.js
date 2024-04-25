import { createBrowserHistory, createHashHistory } from "history";
import { useLayoutEffect, useState } from "react";
import { useMemo } from "react";
import { useRef } from "react";
import { useContext } from "react";
import React, { createContext } from "react";

// 创建上下文
const NavigationContext = createContext({});
const LocationContext = createContext({});

export function HashRouter({ children }) {
  let historyRef = useRef();
  if (historyRef.current == null) {
    historyRef.current = createHashHistory();
  }

  let history = historyRef.current;

  let [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  // 我们需要监听 history 的变化, 用useLayoutEffect
  // 当 history 变化的时候，（浏览器输入、获取a标签跳转，api跳转）
  // 派发更新，渲染整个 router 树
  useLayoutEffect(() => history.listen(setState), [history]);
  return (
    <Router
      children={children}
      location={state.location}
      navigator={history}
      navigationType={state.action}
    />
  );
}

export function BrowserRouter({ children }) {
  let historyRef = useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory();
  }

  let history = historyRef.current;

  let [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  // 我们需要监听 history 的变化, 用useLayoutEffect
  // 当 history 变化的时候，（浏览器输入、获取a标签跳转，api跳转）
  // 派发更新，渲染整个 router 树
  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      children={children}
      location={state.location}
      navigator={history}
      navigationType={state.action}
    />
  );
}

// Provider
function Router({ children, location: locationProp, navigator }) {
  const navigationContext = useMemo(() => ({ navigator }), [navigator]);
  const locationContext = useMemo(
    () => ({ location: locationProp }),
    [locationProp]
  );
  return (
    <NavigationContext.Provider value={navigationContext}>
      <LocationContext.Provider
        value={locationContext}
        children={children}
      ></LocationContext.Provider>
    </NavigationContext.Provider>
  );
}

// ④
function useLocation() {
  return useContext(LocationContext).location;
}

function useNavigate() {
  return useContext(NavigationContext).navigator;
}

// ③
// const Routing = () => useRoutes(routes)
// Routing 就是 我跟你 routes 参数的内容，
// 结合当前浏览器上的 url， 返回具体是哪个 element
export function useRoutes(routes) {
  let location = useLocation(); // 当前路径
  let currentPath = location.pathname || "/";
  console.log(currentPath);
  for (let i = 0; i < routes.length; i++) {
    let { path, element } = routes[i];
    let match = currentPath.match(new RegExp(`^${path}`));
    if (match) {
      return element;
    }
  }
  return null;
}

// ②
// 我就是要把 <Route /> 的嵌套，转成一棵树。
export const createRoutesFromChildren = (children) => {
  let routes = [];
  React.Children.forEach(children, (node) => {
    let route = {
      element: node.props.element,
      path: node.props.path,
    };

    if (node.props.children) {
      route.children = createRoutesFromChildren(node.props.children);
    }

    routes.push(route);
  });
  console.log(routes);
  return routes;
};

// ①
// Routes 这个东西，
// 我就是要把所有的 Route 组件，创建成一棵树
export const Routes = ({ children }) =>
  useRoutes(createRoutesFromChildren(children));

export const Route = () => {};
