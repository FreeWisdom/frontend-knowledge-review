import { useContext, useEffect } from "react";
import ReduxContext from "./context";
import useForceUpdate from "./useForceUpdate";

/**
 *
 * @param {*} mapStateToProps
 * @param {*} mapDispatchToProps
 * @returns
 *
 * 手写 connect 思路：
 * 1、使用createContext来进行跨层级数据传递（store）
 * 2、使用connect返回新组件（高阶组件思想）
 */

export const connect =
  (mapStateToProps, mapDispatchToProps) => (MyComponent) => {
    return function ConnectComponent(props) {
      const _store = useContext(ReduxContext);
      const update = useForceUpdate();

      useEffect(() => {
        // 订阅
        const unsuscribe = _store.subscribe(() => {
          update();
        });

        // 取消订阅
        return () => {
          unsuscribe();
        };
      }, [_store, update]);

      return (
        <MyComponent
          {...props}
          {...mapStateToProps(_store.getState())}
          {...mapDispatchToProps(_store.dispatch)}
        />
      );
    };
  };
