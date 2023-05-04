import qs from "qs";
import { useAuth } from "../context/auth-context";
import * as auth from "auth-provider";
import { useCallback } from "react";
const apiUrl = process.env.REACT_APP_API_URL;
interface Config extends RequestInit {
  token?: string;
  data?: object;
}
export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "", //Bearer 标准格式
      Content_type: data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  //axios 当401 500.。。可以抛异常
  return window.fetch(`${apiUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "please login again" });
    }
    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      //fetch很多时候并不会抛出异常（401 500。。。） 所以用else
      return Promise.reject(data);
    }
  });
};
export const useHttp = () => {
  const { user } = useAuth();
  // utility types 这中 typeof 为ts静态的typeof--编译时用到 和js 中的typeof--动态的，运行时用到。
  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};

// interface Person{
//   name:string
//   age: string
// }
// type a = Person["name"]tsx
// // Partial的实现
// type partialInitial<T> = {
//   [P in keyof T] ?: T[P];
// };
// //Omit 实现
// const  she888: Omit<Person, 'name'> = { age: "12"}           //correct
// const  she990: Omit<Person2, 'name'> = { name: '121'}   //error
//   // Pick
//   type Pick<T, K extends keyof T> = {
//     [P in K] ?: T;
//   }
//   type PersonOnlyName = Pick<Person, 'name'>
//   type PersonOnlyName1 = Pick<Person, 'name' | 'age'>
//   //Exclude 的实现
//   type PreasonKeys = keyof Person
//   type age = Exclude<PreasonKeys, 'name'>

// //联合类型
// let myFavoriteNumber: string | number
// myFavoriteNumber = 7
// myFavoriteNumber = '121'
// let youFavoriteNumber: string | number
//
// //交叉类型
// // let youFavoriteNumber: string & number
//
// //类型别名
// type FavoriteNumber = string | number
// let heFavoriteNumber: FavoriteNumber = 2
//
// // interface Person{
// //   name:string
// // }
// //intrface and type 在很多情况下可以互换
// type Person = {name?:string,age?:number}
// const me: Person = {name:'12341321'}
//
