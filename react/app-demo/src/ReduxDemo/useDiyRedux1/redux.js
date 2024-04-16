/**
 * 思路：
 * 入参：reducer, initialState
 * 返回值：store
 * store 中实现了：
 *    订阅 subscribe(listener)：在组件中 listener 执行时，会读取最新的 store 并更新视图
 *    发布 dispatch(action)：在组件中 dispatch 执行时，会传入 action，更新 store ，然后触发订阅的 listener 执行
 *    获取状态 getState()
 **/

export const createStore = (reducer, initialState) => {
  let data = initialState;
  let listeners = [];

  // listener 是订阅了 store 数据的函数
  // 需要在数据更新时候被调用执行
  // 在组件中 listener 执行时，会读取最新的 store 并更新视图
  const subscribe = (listener) => {
    listeners.push(listener);
  };

  const dispatch = (action) => {
    data = reducer(data, action);
    listeners.forEach((listener) => listener());
  };

  const getState = () => {
    return data;
  };

  return {
    subscribe,
    dispatch,
    getState,
  };
};
