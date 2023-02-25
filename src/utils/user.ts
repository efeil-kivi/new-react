import { project } from "../screens/project-list/list";
import { useAsync } from "./use-async";
import { useHttp } from "./http";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { User } from "../screens/project-list/search-panel";

export const useUsers = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>(); //代替上面三行
  const client = useHttp();
  //由于用了泛型
  useEffect(() => {
    // setIsLoading(true);
    run(client("users", { data: cleanObject(param || {}) })); //代替了上1下7行。
    // client("projects", { data: cleanObject(debouncedParam) })
    //   .then(setList)
    //   .catch(error =>{
    //     setList([])
    //     setError(error)
    //   })
    //   .finally(() => setIsLoading(false));
  }, []);
  return result;
};
