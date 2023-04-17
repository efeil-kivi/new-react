import { useAuth } from "../context/auth-context";
import { Button, Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/use-async";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  const { login, user } = useAuth();
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
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
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          login
        </LongButton>
      </Form.Item>
    </Form>
  );
};
