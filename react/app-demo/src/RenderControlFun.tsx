import React, { useMemo, useRef, useState } from "react";

/**
 * 实现 useMemo
 * 实现解析:
 * useMemo函数接收两个参数：callback（计算函数）和dependencies（依赖数组）
 * 使用useRef创建memoRef和prevDependencies，分别用于存储计算结果和上一次的依赖数组。
 * 如果依赖数组发生变化（使用areDependenciesEqual函数进行比较），则重新计算并更新memoRef和prevDependencies。
 * 如果依赖数组没有变化，则直接返回上一次计算的结果，避免不必要的计算。
 */

const isDepEqual = (preDep, curDep) => {
  if (preDep === null) return false;
  for (let index = 0; index < curDep.length; index++) {
    if (preDep[index] !== curDep[index]) return false;
  }
  return true;
};
const useMyMemo = (callback, dep) => {
  const memoResRef = useRef(callback());
  const preDepRef = useRef(dep);
  console.log("preDepRef", preDepRef.current, dep);

  const isDepChange = !isDepEqual(preDepRef.current, dep);

  if (isDepChange) {
    memoResRef.current = callback();
    preDepRef.current = dep;
  }

  return memoResRef.current;
};

const RenderControlFun = () => {
  const [name, setName] = useState("张三");
  const [age, setAge] = useState(18);

  const newName = useMyMemo(() => {
    return `姓名：${name}，年龄：${age}，随机数：${Math.random()}`;
  }, [name]);

  return (
    <div>
      {/* <h3>useMemo的用</h3> */}
      姓名：
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      年龄：
      <input
        type="text"
        value={age}
        onChange={(e) => setAge((e.target.value as unknown as number) * 1)}
      />
      <br />
      {newName}
    </div>
  );
};

export default RenderControlFun;
