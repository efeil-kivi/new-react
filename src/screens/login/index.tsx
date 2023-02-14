import React, { FormEvent, HTMLInputTypeAttribute } from "react";

const apiUrl = process.env.REACT_APP_API_URL;
export const LoginScreen = () => {
  const login = (param: { username: string; password: string }) => {
    console.log(param.password, "password");
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        Content_type: "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (response) => {
      if (response.ok) {
      }
    });
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userName">userName</label>
        <input type="text" id="userName" />
      </div>
      <div>
        <label htmlFor="passWord">密码</label>
        <input type="text" id="passWord" />
      </div>
      <button type={"submit"}>login</button>
    </form>
  );
};
