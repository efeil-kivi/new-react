import { ReactNode } from "react";
import React from "react";
import { AuthProvider } from "context/auth-context";
export const AppProviders = ({ children }: { children: ReactNode }) => {
  // <div children={    //介绍children用法
  //   <> <label htmlFor="username">用户名</label>
  //     <input type="text" id={"username"}/>
  //   </>
  // }/>
  return <AuthProvider>{children}</AuthProvider>;
};
