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

1. BrowserRouter

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

2. NavLink

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

3. Link

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

4. Routes

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

1. Navigate
2. useNavigate

# 4、路由传参

# 5、动态路由

# 6、嵌套路由

# 7、查询参数

# 8、Route 配置

# 9、手撕代码 react 的路由原理

- todo
