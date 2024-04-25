import { BrowserRouter, Route, Routes, useRoutes } from "./router";

function App() {
  const styleCss = {
    border: "1px solid #000",
    height: "30px",
    display: "inline-block",
    width: "200px",
  };

  const Menu = () => {
    return (
      <header>
        <a style={styleCss} href="./index">
          首页
        </a>
        <a style={styleCss} href="./list">
          新闻列表
        </a>
        <a style={styleCss} href="./about">
          关于我们
        </a>
        <a style={styleCss} href="./hot">
          热点新闻
        </a>
      </header>
    );
  };

  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/list" element={<div>新闻列表--pages</div>} />
        <Route path="/about" element={<div>关于我们--pages</div>} />
        <Route path="/hot" element={<div>热点新闻--pages</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
