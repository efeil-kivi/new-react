import React from "react";
import { User } from "./search-panel";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
export interface project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}
interface ListProps extends TableProps<project> {
  //extends TableProps<any> 方便以后传值
  // list: project[];
  users: User[];
}
export const List = ({ users, ...props }: ListProps) => {
  //export const List = ({ list, users,isLodaing}: ListProps) => {
  //list 被删除因为 extends TableProps<project>有了

  return (
    //table 根据datasource 推断columns 的类型
    <Table
      columns={[
        //type为project
        {
          title: "name",
          // dataIndex: "name", //因为table为pj类型
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={`${String(project.id)}`}>{project.name}</Link>;
          },
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
      //dataSource={list} //定义了table为project类型
      {...props} //代替了上面一行
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
