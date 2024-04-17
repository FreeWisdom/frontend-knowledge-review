import { useCallback, useState } from "react";

const useForceUpdate = () => {
  const [, setState] = useState(true);

  const update = useCallback(() => {
    setState((s) => !s);
  }, []);

  return update;
};

export default useForceUpdate;
