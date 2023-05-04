import { useCallback, useState } from "react";
import { useMountedRef } from "./index";
interface State<D> {
  error: Error | null;
  data: D | null;
  state: "idle" | "loading" | "error" | "success"; //idle:表示请求还没有发生
}
const defaultInitialState: State<null> = {
  state: "idle",
  data: null,
  error: null,
};
const defaultConfig = {
  throwOnError: false,
};
export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initialConfig };
  const [state, setState] = useState({
    ...defaultInitialState,
    ...initialState,
    //const arr = {name:"jjj", age:"32"};
    // a={...arr,name:"kkk"}
    // console.log(a)
  });
  const mountedRef = useMountedRef();
  //useState 直接传入函数的含义是：惰性初始化；所以，要用useState 保存函数，不能直接传入函数
  //https://codesandbox.io/s/blissful-water-230u4?file=/src/App.js
  //https://www.youtube.com/watch?v=FM9LL_UUK34&list=PL5FIFxLsMtxTTxwZ3D86ymwUSZl7YR_Tr&index=46
  const [retry, setRetry] = useState(() => () => {});
  const setData = useCallback(
    (data: D) =>
      setState({
        data,
        state: "success",
        error: null,
      }),
    []
  );
  const setError = useCallback(
    (error: Error) =>
      setState({
        error,
        state: "error",
        data: null,
      }),
    []
  );
  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("please input promise");
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });
      setState((prevState) => ({ ...prevState, state: "loading" }));
      return promise
        .then((data) => {
          if (mountedRef.current) setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);

          // console.log(initialConfig?.throwOnError,"throwOnError", config)
          if (config.throwOnError) {
            // console.log("throwOnError")
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwOnError, mountedRef, setData, setError]
  );

  return {
    isIdle: state.state === "idle",
    isLoading: state.state === "loading",
    isError: state.state === "error",
    isSuccess: state.state === "success",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
