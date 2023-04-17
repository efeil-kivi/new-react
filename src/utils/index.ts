import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";
// let b:{[key: string]: unknown} = {}
export const cleanObject = (object: { [key: string]: unknown }) => {
  //不建议改变传输对象
  // object.name = 123123
  const result = { ...object };
  //遍历result 当value为空：删掉；
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line
  }, []);
};
export const useDebounce = <T>(value: T, delay?: number) => {
  //将value由any改成unknown所以useDebounce也是unknown；
  // 然后cleanObject出错，因为unknown不能被赋给任何值.解决方法1加“:any”--export const useDebounce = (value: unknown, delay?: number):any => {
  //解决方法2:泛型。
  //?:传进来的为空or number
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    // console.log("value=",value)
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  // setTimeout(() => setDebouncedValue("1"), 2000)
  // setTimeout(() => setDebouncedValue("2"), 4000)
  // console.log("debouncedValue=",debouncedValue)
  //此处返回特殊
  return debouncedValue;
};
//                首次return d -> const
//此useEffect程序 第一次执行return d -> return() -> const -> return d(由于debounceValue变化所以返回)
//               第二次执行return d -> return() -> const -> return d  ....
export const resetRoute = () => (window.location.href = window.location.origin);
