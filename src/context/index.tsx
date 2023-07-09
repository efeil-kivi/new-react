import { ReactNode } from "react";
import React from "react";
import { AuthProvider } from "context/auth-context";
import { Provider } from "react-redux";
import { store } from "store";
export const AppProviders = ({ children }: { children: ReactNode }) => {
  // <div children={    //介绍children用法
  //   <> <label htmlFor="username">用户名</label>
  //     <input type="text" id={"username"}/>
  //   </>
  // }/>
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
};
