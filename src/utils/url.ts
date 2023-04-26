import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "./index";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key: string) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      //iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
      // fromEntries 读取searchParams参数，并转化为普通对象   https://developer.mozilla.org
      //ex: var u = new URLSearchParams({name:'jack'})
      //    fromEntries(u)        // 41 节课
      //    {name："jack "}
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParams(o);
    },
  ] as const;
};
