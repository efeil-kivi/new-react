import qs from "qs";
import { useAuth } from "../context/auth-context";
import * as auth from "auth-provider";
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
  // utility types
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
