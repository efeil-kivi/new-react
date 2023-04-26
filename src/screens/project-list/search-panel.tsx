/** @jsxImportSource @emotion/react */

import React from "react";
import { Form, Input, Select } from "antd";
import { project } from "./list";
import { UserSelect } from "../../components/user-select";
export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}
interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<project, "name" | "personId">>;
  // param: {
  //   name: string;
  //   personId: number;
  // };
  setParam: (param: SearchPanelProps["param"]) => void;
}
export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form css={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        {/*setParam(Object.assign({},param,{name:evt.target.value}))*/}
        <Input
          placeholder={"project name"}
          type={"text"}
          value={param.name}
          onChange={(env) =>
            setParam({
              ...param,
              name: env.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};
