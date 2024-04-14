# 1、状态管理如何实现（todo）

1. 组件之外，可以全局共享数据状态
   - Closure 可以（runtime 的状态管理用这个）
   - Window/global 可以
2. 我修改数据，改了以后，相关方要感知到
   界面以一个函数来去感知，数据改变的时候，我把这个函数执行一下。
   - 发布订阅 -- redux
   - Proxy -- mobx
3. 修改状态，会触发 UI 更新 -- connect
   - setState
   - useState
   - forceUpdate

# 2、实现发布订阅的 redux

## 2.1、最简化的 Store

> 如何保证 changeData 是 safe 状态

## 2.2、实现 Reducer

> 如何实现 一个 store 管理多个 state

## 2.3、实现 CombineReducers

> 如何简化，组件中使用 redux 繁琐语法

## 2.4、实现 Connect（react-Redux）

# 3、实现 Proxy 的 Mobx
