// Model
function LoginModel() {
  this.username = ""; // 存储用户名
  this.password = ""; // 存储密码
}

// ViewModel: 定义登录视图模型，连接 Model 和 View，并处理用户操作
function LoginViewModel(model) {
  this.model = model; // 关联的登录模型
  this.bindings = {}; // 存储数据绑定信息的对象

  // 添加数据绑定方法
  this.bind = function (elementId, property) {
    // 获取指定id的DOM元素
    const element = document.getElementById(elementId);

    // 将数据绑定信息存储到bindings对象中
    this.bindings[elementId] = {
      element: element, // 存储DOM元素
      property: property, // 存储绑定的属性名
    };

    // 添加input事件监听器，实现数据绑定
    const _this = this;
    element.addEventListener("input", function () {
      _this.model[property] = element.value; // 更新Model中对应的属性值
    });
  };

  // 更新视图方法，以备手动触发可以删除
  this.updateView = function () {
    for (const key in this.bindings) {
      const binding = this.bindings[key];
      // 将Model中的属性值更新到对应的DOM元素上
      binding.element.value = this.model[binding.property];
    }
  };

  // 初始化方法：将Model中的属性值初始化到对应的DOM元素上
  this.init = function () {
    for (const key in this.bindings) {
      const binding = this.bindings[key];
      binding.element.value = this.model[binding.property];
    }
  };

  console.log("this-a", this);

  // 登录按钮点击事件处理程序
  document.getElementById("login-btn").addEventListener("click", function () {
    const resultDisplay = document.getElementById("login-result");
    console.log("this-b", this);
    const isValid = model.username !== "" && model.password !== "";
    // 根据用户名和密码是否为空来更新登录结果显示
    resultDisplay.textContent = isValid
      ? "Login successful!"
      : "Please enter username and password.";
  });
}

// 创建 Model 实例
const model = new LoginModel();

// 创建 ViewModel 实例，并进行数据绑定
const viewModel = new LoginViewModel(model);
viewModel.bind("username", "username"); // 绑定用户名输入框
viewModel.bind("password", "password"); // 绑定密码输入框
viewModel.init(); // 初始化视图
