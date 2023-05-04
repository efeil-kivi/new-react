import { useAsync } from "./use-async";
import { project } from "../screens/project-list/list";
import { useHttp } from "./http";
import { useCallback, useEffect } from "react";
import { cleanObject } from "./index";

export const useProject = (param?: Partial<project>) => {
  const { run, ...result } = useAsync<project[]>(); //代替上面三行
  const client = useHttp();
  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [client, param]
  );
  //由于用了泛型
  useEffect(() => {
    // setIsLoading(true);
    run(fetchProjects(), { retry: fetchProjects }); //代替了上1下7行。
    // client("projects", { data: cleanObject(debouncedParam) })
    //   .then(setList)
    //   .catch(error =>{
    //     setList([])
    //     setError(error)
    //   })
    //   .finally(() => setIsLoading(false));
  }, [param, run, fetchProjects]);
  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const clint = useHttp();
  const mutate = (params: Partial<project>) => {
    return run(
      clint(`project/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
