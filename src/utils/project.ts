import { useAsync } from "./use-async";
import { project } from "../screens/project-list/list";
import { useHttp } from "./http";
import { useEffect } from "react";
import { cleanObject } from "./index";

export const useProject = (param?: Partial<project>) => {
  const { run, ...result } = useAsync<project[]>(); //代替上面三行
  const client = useHttp();
  //由于用了泛型
  useEffect(() => {
    // setIsLoading(true);
    run(client("projects", { data: cleanObject(param || {}) })); //代替了上1下7行。
    // client("projects", { data: cleanObject(debouncedParam) })
    //   .then(setList)
    //   .catch(error =>{
    //     setList([])
    //     setError(error)
    //   })
    //   .finally(() => setIsLoading(false));
  }, [param]);
  return result;
};
