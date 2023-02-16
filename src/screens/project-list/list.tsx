import React from "react";
import { User } from "./search-panel";
import { Table } from "antd";
import dayjs from "dayjs";
interface project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
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
          title: "organization",
          dataIndex: "organization",
        },
        {
          title: "created",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "no time"}
              </span>
            );
          },
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
