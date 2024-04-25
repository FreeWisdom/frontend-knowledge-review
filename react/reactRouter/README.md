> 详细总结：https://juejin.cn/post/7187199524903845946

# 1、路由的核心

- 根据/监听 path/url 的变化，然后根据 path 和 components 的对应关系，触发一些组件的 unmount 和 mount， 同时使用 context 注入上下文 location, navigator
- react-router：为 React 应用提供了路由的核心功能；
- react-router-dom：基于 react-router，加入了在浏览器运行环境下的一些功能。

# 2、路由的分类

1. BrowserRouter 是最常用的路由方式，即浏览器路由。官方文档也建议将 BrowserRouter 组件用于 Web 应用程序。
2. HashRouter：在路径前加入#成为一个哈希值，Hash 模式的好处是不会因为刷新页面而找不到对应路径；
3. MemoryRouter：不存储 history，路由过程保存在内存中，适用于 React Native 这种非浏览器环境；
4. NativeRouter：配合 React Native 使用，多用于移动端；
5. StaticRouter：主要用于服务端渲染时。

# 3、基本使用

1. <font color="red">BrowserRouter</font>

   ```js
   import { StrictMode } from "react";
   import * as ReactDOMClient from "react-dom/client";
   import { BrowserRouter } from "react-router-dom";

   import App from "./App";

   const rootElement = document.getElementById("root");
   const root = ReactDOMClient.createRoot(rootElement);

   root.render(
     <StrictMode>
       <BrowserRouter>
         <App />
       </BrowserRouter>
     </StrictMode>
   );
   ```

2. <font color="red">NavLink</font>

   - NavLink 是存在 active 状态的，所以可以为 active 状态和非 active 状态的导航链接添加样式

   ```js
   import { NavLink } from "react-router-dom";
   import "./styles.css";

   export default function App() {
     return (
       <div className="App">
         <header>
           <h1>Hello World</h1>
         </header>
         <nav>
           <NavLink
             to=""
             className={({ isActive }) => (isActive ? "nav-active" : void 0)}
           >
             首页
           </NavLink>
           <NavLink to="product">产品</NavLink>
           <NavLink to="about">关于</NavLink>
         </nav>
       </div>
     );
   }
   ```

3. <font color="red">Link</font>

- Link 组件与 NavLink 组件非常相似，唯一的区别就是 NavLink 存在 active 状态，而 Link 没有。
- 如果需要对 Link 进行更多控制，也可以传递给 to 一个对象，在这个对象中，可以通过 search 属性来添加查询字符串或通过 hash 属性来传递 hash 值

  - 点击“设置”时，路由就变成了：/settings?sort=date#hash

  ```js
  import { Link } from "react-router-dom";
  import "./styles.css";

  export default function Settings() {
    return (
      <div className="settings">
        <header>
          <h1>Hello World</h1>
          <Link
            to={{
              pathname: "/settings",
              search: "?sort=date",
              hash: "#hash",
            }}
          >
            设置
          </Link>
        </header>
      </div>
    );
  }
  ```

4. <font color="red">Routes</font>

- 如果想要在所有 Route 都不匹配时就渲染 404 页面，只需将 404 页面对应的 Route 的 path 设置为 \*

  ```js
  import { NavLink, Routes, Route } from "react-router-dom";
  import Product from "./Product";
  import About from "./About";
  import Home from "./Home";
  import Error from "./Error";
  import "./styles.css";

  export default function App() {
    return (
      <div className="App">
        <header>
          <h1>Hello World</h1>
        </header>
        <nav>
          <NavLink to="">首页</NavLink>
          <NavLink to="product">产品</NavLink>
          <NavLink to="about">关于</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    );
  }
  ```

5. 路由顺序
   在 React Router v6 以前，我们必须按照一定的顺序来定义路由，以获得准确的渲染。在 v6 及之后的版本中，路由定义的顺序无关紧要。
   以下代码在 v5 中，/product/new 将匹配到第一个路由并渲染 Product 组件：

   ```js
   <Switch>
     <Route path="/product/:id" component={Product} />
     <Route path="/product/new" component={NewProduct} />
   </Switch>
   ```

   而在 v6 中，将 <Switch> 组件替换为了 <Routes> 组件。/products/new 将匹配这两个路由，但只会渲染 NewProduct 组件，因为它是更具体的匹配：

   ```js
   <Routes>
     <Route path="/product/:id" element={<Product />} />
     <Route path="/product/new" element={<NewProduct />} />
   </Routes>
   ```

# 3、编程式导航

1. 命令式导航方法：<font color="red">useNavigate</font> Hook

   ```tsx
   // 例如，使用 Navigate 进行编程式导航
   function SomeComponent() {
     const navigate = useNavigate(); // 导入 useNavigate 钩子

     const handleClick = () => {
       navigate("/some/route"); // 点击事件触发导航到 /some/route
     };

     return (
       <button type="button" onClick={handleClick}>
         Navigate to Some Route
       </button>
     );
   }
   ```

   > 如果你确实需要在 JSX 中使用 Navigate 可以使用声明式导航

2. 声明式导航组件：<font color="red">Navigate</font> 组件

   ```tsx
   // 直接在 JSX 中使用 Navigate 进行导航
   // 这将立即导航到指定的路由
   <Navigate to="/some/route" replace={true} />;

   // 使用 Navigate 进行条件渲染
   function ConditionalNavigation() {
     const shouldNavigate = true; // 假设这是根据某些条件确定的

     if (shouldNavigate) {
       return <Navigate to="/other/route" />;
     }

     return <div>Stay on the current page</div>;
   }
   ```

# 4、路由传参

1. 使用 <font color="red">Link</font> 组件

   ```jsx
   import React from "react";
   import { Link } from "react-router-dom";
   function Contact() {
     return (
       <div>
         <header>产品页面</header>
         <Link to="/" state={"From Product"}>
           返回
         </Link>
       </div>
     );
   }
   export default Contact;
   ```

2. 使用 <font color="red">Navigate</font> 组件

   ```jsx
   <Route path="/about" element={<Navigate to="/" state={"From About"} />} />
   ```

3. 使用 <font color="red">useNavigate</font> 钩子

   ```jsx
   import { useNavigate } from 'react-router-dom

      function Register () {
      const navigate = useNavigate()

      return (
         <div>
            <Form afterSubmit={() => navigate('/', { state: "From the About Page"})} />
         </div>
      )
   }
   ```

4. 在首页中使用 <font color="red">useLocation</font> 钩子来获取状态值

   ```jsx
   import { useLocation } from "react-router-dom";
   import "./styles.css";

   export default function Settings() {
     let location = useLocation();
     return (
       <div className="App">
         <header>首页</header>
         <p>{location.state}</p>
       </div>
     );
   }
   ```

# 5、动态路由

1. Route 组件的 path props 声明动态路由

   ```jsx
   <Route path="/wiki/:keyword" element={<Wiki />} />
   ```

2. 在组件中访问 URL 中的动态部分

   ```jsx
   import React from "react";
   import { useParams } from "react-router";

   function Wiki() {
     const { keyword } = useParams();

     return <div>{keyword}</div>;
   }
   ```

# 6、嵌套路由

- 使用 `<BrowserRouter>` 来创建一个可以监听浏览器历史变化的路由器。
- `<Routes>` 组件定义了应用程序中所有可能的路由。
- `<Route>` 组件定义了一个路由，并可以指定 path 和 element 属性。element 属性接收一个组件，该组件将被渲染，当路由匹配时。
- Dashboard 组件内部，我们又定义了一个新的 `<Routes>` 组件，它包含了 dashboard 路径下的嵌套路由。
- Reports 和 Settings 组件作为 Dashboard 的子路由，被定义在 Dashboard 组件内部的 `<Routes>` 中。

  ```tsx
  import React from "react";
  import { BrowserRouter, Routes, Route } from "react-router-dom";

  // 子路由组件
  function Home() {
    return <h2>Home Page</h2>;
  }

  function About() {
    return <h2>About Page</h2>;
  }

  function Dashboard() {
    return (
      <div>
        <h2>Dashboard Page</h2>
        {/* Dashboard 子路由 */}
        <Routes>
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Routes>
      </div>
    );
  }

  function Reports() {
    return <h3>Reports Page</h3>;
  }

  function Settings() {
    return <h3>Settings Page</h3>;
  }
  ```

  ```jsx
  // 主路由组件
  function App() {
    return (
      <BrowserRouter>
        <Routes>
          {/* 嵌套路由 */}
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    );
  }

  export default App;
  ```

- 如果我们希望在 App 组件包含创建嵌套路由所需的所有信息， React Router 也是支持这种创建嵌套路由的方式

  ```jsx
  function App() {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/messages" element={<Messages />}>
          <Route path=":id" element={<MessagesDetails />} />
        </Route>
        <Route path="/settings" element={<Settings />} />
      </Routes>
    );
  }
  ```

# 7、查询参数

1. 从 v6 开始，React Router 使用 <font color="red">URLSearchParams</font> API 来处理查询字符串，URLSearchParams 内置于所有浏览器（IE 除外）中，并提供了处理查询字符串的实用方法。当创建 URLSearchParams 实例时，需要向它传递一个查询字符串：

   ```js
   const queryString = "?q=react&src=typed_query&f=live";
   const sp = new URLSearchParams(queryString);

   sp.has("q"); // true
   sp.get("q"); // react
   sp.getAll("src"); // ["typed_query"]
   sp.get("nope"); // null

   sp.append("sort", "ascending");
   sp.toString(); // "?q=react&src=typed_query&f=live&sort=ascending"

   sp.set("q", "bytes.dev");
   sp.toString(); // "?q=bytes.dev&src=typed_query&f=live&sort=ascending"

   sp.delete("sort");
   sp.toString(); // "?q=bytes.dev&src=typed_query&f=live"
   ```

2. React Router 提供了一个自定义的 <font color="red">useSearchParams</font> Hook，它是基于 URLSearchParams 进行的封装。useSearchParams 返回一个数组，该数组第一个元素是 URLSearchParams 的实例，第二个元素是更新查询参数的一个方法。

   ```jsx
   import { useSearchParams } from 'react-router-dom'

   const Results = () => {
      const [searchParams, setSearchParams] = useSearchParams();

      const q = searchParams.get('q')
      const src = searchParams.get('src')
      const f = searchParams.get('f')

      // 如果需要更新查询字符串，可以使用 setSearchParams，向它传递一个对象，
      // 该对象的key/value 对将作为 &key=value 添加到 url
      const updateOrder = (sort) => {
         setSearchParams({ sort })
      }

      return (
         // ...
      )
   }
   ```

# 8、Route 配置

- React Router v6 内置了一个 <font color="red">useRoutes</font> Hook，它在功能上等同于 `<Routes>`
- 假如应用中有以下路径：

  ```js
  /
  /invoices
  :id
  pending
  complete
  ```

- 使用 `<Route>` 组件来定义路由将会是这样的：
  ```jsx
  export default function App() {
    return (
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invoices" element={<Invoices />}>
            <Route path=":id" element={<Invoice />} />
            <Route path="pending" element={<Pending />} />
            <Route path="complete" element={<Complete />} />
          </Route>
        </Routes>
      </div>
    );
  }
  ```
- 使用 `useRoutes` 组件来定义路由将会是这样的：

  ```jsx
  import { useRoutes } from "react-router-dom";

  const routes = useRoutes([
    { path: "/", element: <Home /> },
    {
      path: "/invoices",
      element: <Invoices />,
      children: [
        { path: ":id", element: <Invoice /> },
        { path: "/pending", element: <Pending /> },
        { path: "/complete", element: <Complete /> },
      ],
    },
  ]);

  export default function App() {
    return (
      <div>
        <Navbar />
        {routes}
      </div>
    );
  }
  ```

# 9、手撕代码 react 的路由原理

1. 第一步，以 Routes 为抓手，带出来一些与 Routes 相关的核心方法

```js
// router.js

const LocationContext = createContext({});

// ④
const useLocation = () => {
  return useContext(LocationContext).location;
};

// ③
// 根据 js 树和 url 路径，返回与路由匹配的 element（组件）
const useRoutes = (routes) => {
  let location = useLocation();
  const curPath = location.pathname || "/";

  for (let i = 0; i <= routes.length; i++) {
    let { path, element } = routes[i];
    let match = curPath.match(new RegExp(`^${path}`));

    if (match) {
      return element;
    }
  }

  return null;
};

// ②
// 根据 Routes 嵌套语法，生成 js 树
const createRoutesFromChildren = (children) => {
  let routes = [];
  React.Children.forEach(chidren, (node) => {
    let route = {
      path: node.props.path,
      element: node.props.element,
    };

    if (node.props.children) {
      route.children = createRoutesFromChildren(node.props.chidren);
    }

    routes.push(route);
  });
  return routes;
};

// ①
export const Routes = ({ children }) => {
  return useRoutes(createRoutesFromChildren(children));
};
```

2. 第一步中，使用了 LocationContext ，接下来要写 BrowserRouter ，用来初始化 LocationContext 和 NavigationContext 上下文

```js
// router.js

import { createBrowserHistory } from "history";

// ②
const Router = ({ children, location, history }) => {
  const historyContext = useMemo(() => ({ history }), [history]);
  const locationContext = useMemo(() => ({ location }), [location]);

  return (
    <LocationContext.Provider value={historyContext}>
      <LocationContext.Provider value={locationContext} children={children} />
    </LocationContext.Provider>
  );
};

// ①
const BrowserRouter = ({ children }) => {
  const historyRef = useRef();
  if (historyRef.current === null) {
    historyRef.current = createBrowserHistory();
  }

  let history = historyRef.current;

  let [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  // listen(listener)：添加一个监听器来监听 history 变化。监听器是一个函数，它接收两个参数：location 和 action。location 是当前的 location 对象，包含 pathname、search、hash、state 和 key 等属性；action 是触发变化的动作，如 PUSH 或 POP。
  // 此处当 history 变化的时候，（浏览器输入、获取a标签跳转，api跳转），派发更新，渲染整个 router 树
  useLayoutEffect(() => {
    return history.listen(setState);
  }, [history]);

  return (
    <Router children={children} location={state.location} history={history} />
  );
};
```
