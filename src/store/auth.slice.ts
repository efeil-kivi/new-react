import { createSlice } from "@reduxjs/toolkit";
import { User } from "screens/project-list/search-panel";
import * as auth from "auth-provider";
import { AppDispatch, RootState } from "store";
import { AuthForm, bootstrapUser } from "context/auth-context";
interface State {
  user: User | null;
}
const initialState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)));
export const register = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(setUser(user)));
export const logout = () => async (dispatch: AppDispatch) => {
  try {
    // 执行异步操作，例如向服务器发送注销请求
    // ...
    console.log("logout");
    // 设置state.user为null
    //   dispatch(setUser(null));
  } catch (error) {
    console.log(error);
    // 处理错误情况
    // ...
  }
};
// export const logout = () => (dispatch:AppDispatch) => dispatch(setUser(null))
// .then(user => {dispatch(setUser(null))
//     console.log("user==",user)
// })
export const bootstrap = () => (dispatch: AppDispatch) =>
  bootstrapUser().then((user) => dispatch(setUser(user)));
