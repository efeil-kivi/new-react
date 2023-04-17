import { useState } from "react";
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
  const setData = (data: D) =>
    setState({
      data,
      state: "success",
      error: null,
    });
  const setError = (error: Error) =>
    setState({
      error,
      state: "error",
      data: null,
    });
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("please input promise");
    }
    setState({ ...state, state: "loading" });
    return promise
      .then((data) => {
        setData(data);
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
  };
  return {
    isIdle: state.state === "idle",
    isLoading: state.state === "loading",
    isError: state.state === "error",
    isSuccess: state.state === "success",
    run,
    setData,
    setError,
    ...state,
  };
};
