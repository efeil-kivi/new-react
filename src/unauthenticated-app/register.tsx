import { useAuth } from "../context/auth-context";
import React, { FormEvent } from "react";
import { Button, Form, Input } from "antd";
import { LongButton } from "./index";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register, user } = useAuth();
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("verify two password are same!"));
      return;
    }
    try {
      await register(values);
    } catch (e) {
      // @ts-ignore
      onError(e);
    }
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
        name={"password"}
        rules={[{ required: true, message: "please input password" }]}
      >
        <Input placeholder={"password"} type="password" id="password" />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "please verify password" }]}
      >
        <Input placeholder={"verify password"} type="password" id="cpassword" />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          register
        </LongButton>
      </Form.Item>
    </Form>
  );
};
