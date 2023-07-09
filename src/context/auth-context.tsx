import React, { ReactNode, useCallback, useState } from "react";
import * as auth from "auth-provider";
import { User } from "../screens/project-list/search-panel";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";
import { useDispatch, useSelector } from "react-redux";
import useSelection from "antd/es/table/hooks/useSelection";
import { bootstrap, selectUser } from "store/auth.slice";
import * as authStore from "store/auth.slice";
export interface AuthForm {
  username: string;
  password: string;
}
export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};
// const AuthContext = React.createContext<
//   //在程序中由43行定义，能够被定义成AuthProvider中的函数
//   | {
//       user: User | null;
//       login: (form: AuthForm) => Promise<void>;
//       register: (form: AuthForm) => Promise<void>;
//       logout: () => Promise<void>;
//     }
//   | undefined
// >(undefined);
// AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const [user, setUser] = useState<User | null>(null);
  const { error, isLoading, isIdle, isError, run } = useAsync<User | null>();
  //point free::user => setUser(user)   ->   setUser
  // const login = (form: AuthForm) => auth.login(form).then(setUser);
  // const register = (form: AuthForm) => auth.register(form).then(setUser);
  // const logout = () => auth.logout().then(() => setUser(null));
  const dispatch = useDispatch() as (...args: unknown[]) => Promise<User>;

  useMount(() => {
    run(dispatch(bootstrap()));
  });
  if (isIdle || isLoading) return <FullPageLoading></FullPageLoading>;
  if (isError) return <FullPageErrorFallback error={error} />;
  // then(user => setUser(user))
  return <div>{children}</div>;
};
export const useAuth = () => {
  // const context = React.useContext(AuthContext);
  // if (!context) {
  //   throw new Error("userAuth必须在AuthProvider中使用");
  // }
  // return context;
  const dispatch = useDispatch() as (...args: unknown[]) => Promise<User>;
  const user = useSelector(selectUser);
  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch]
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.register(form)),
    [dispatch]
  );
  const logout = useCallback(
    (form: AuthForm) => dispatch(authStore.logout()),
    [dispatch]
  );

  return {
    user,
    login,
    register,
    logout,
  };
};
