import React from "react";
import { User } from "./search-panel";
import { Table } from "antd";
interface project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}
interface ListProps {
  list: project[];
  users: User[];
}
export const List = ({ list, users }: ListProps) => {
  return (
    //table 根据datasource 推断columns 的类型
    <Table
      columns={[
        {
          title: "name",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "unknown"}
              </span>
            );
          },
        },
        {
          title: "name",
          dataIndex: "name",
        },
      ]}
      dataSource={list}
    >
      {/*<thead>*/}
      {/*  <tr>*/}
      {/*    <th>名称</th>*/}
      {/*    <th>负责人</th>*/}
      {/*  </tr>*/}
      {/*</thead>*/}
      {/*<tbody>*/}
      {/*  {list.map((project) => {*/}
      {/*    return (*/}
      {/*      <tr key={project.id}>*/}
      {/*        <td>{project.name}</td>*/}
      {/*        <td>*/}
      {/*          {users.find((user) => user.id === project.personId)?.name ||*/}
      {/*            "unknown"}*/}
      {/*        </td>*/}
      {/*      </tr>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</tbody>*/}
    </Table>
  );
};
