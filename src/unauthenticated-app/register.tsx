import { useAuth } from "../context/auth-context";
import React, { FormEvent } from "react";
import { Button, Form, Input } from "antd";
import { LongButton } from "./index";

export const RegisterScreen = () => {
  const { register, user } = useAuth();
  const handleSubmit = (values: { username: string; password: string }) => {
    register(values).then();
  };

  return (
    <Form onFinish={handleSubmit}>
      {user ? <div>登陆成功，用户名：{user?.name}</div> : null}

      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "please input username" }]}
      >
        <Input placeholder={"username"} type="text" id="username" />
      </Form.Item>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "please input password" }]}
      >
        <Input placeholder={"password"} type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          register
        </LongButton>
      </Form.Item>
    </Form>
  );
};
