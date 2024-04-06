// Model
function TodoModel() {
  this.todos = []; // 存储待办事项的数组
}
TodoModel.prototype.addTodo = function (todo) {
  this.todos.push(todo);
};

// View
function TodoView() {
  this.todoList = document.getElementById("todo-list"); // 获取待办事项列表的 DOM 元素
}
TodoView.prototype.render = function (todos) {
  this.todoList.innerHTML = ""; // 清空列表
  todos.forEach((todo) => {
    // 为每个待办事项创建一个列表项并添加到列表中
    const listItem = document.createElement("li");
    listItem.textContent = todo;
    this.todoList.appendChild(listItem);
  });
};

// Presenter
function TodoPresenter(model, view) {
  this.model = model; // 关联模型
  this.view = view; // 关联视图
}
TodoPresenter.prototype.addTodo = function (todo) {
  this.model.addTodo(todo); // 将待办事项添加到模型中
  this.view.render(this.model.todos); // 更新视图，重新渲染待办事项列表
};

// 创建待办事项视图的工厂函数
function createTodoView() {
  return new TodoView(); // 返回一个新的待办事项视图对象
}

// -------------------------------------------------
// 初始化 MVP
const model = new TodoModel(); // 创建待办事项模型对象
const view = createTodoView(); // 使用工厂函数创建待办事项视图对象
const presenter = new TodoPresenter(model, view); // 创建待办事项的 Presenter 对象

// 添加待办事项按钮点击事件处理程序
document.getElementById("add-todo").addEventListener("click", function () {
  const todoInput = document.getElementById("todo-input");
  const todoText = todoInput.value.trim();
  if (todoText !== "") {
    presenter.addTodo(todoText); // 委托 Presenter 处理添加待办事项的逻辑
    todoInput.value = ""; // 清空输入框
  }
});

// 初始化视图：渲染初始的待办事项列表
view.render(model.todos);
