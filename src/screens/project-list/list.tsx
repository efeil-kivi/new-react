import React from "react";
import { User } from "./search-panel";
import { Button, Dropdown, Menu, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useEditProject } from "../../utils/project";
import { ButtonNoPadding } from "../../components/lib";
export interface project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}
interface ListProps extends TableProps<project> {
  //extends TableProps<any> 方便以后传值
  // list: project[];
  users: User[];
  refresh?: () => void;
  setProjectModalOpen: (isOpen: boolean) => void;
}
export const List = ({ users, ...props }: ListProps) => {
  //export const List = ({ list, users,isLodaing}: ListProps) => {
  //list 被删除因为 extends TableProps<project>有了
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(props.refresh);
  return (
    //table 根据datasource 推断columns 的类型
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
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
        {
          title: "edit",
          render(value, project) {
            return (
              <Dropdown
                overlay={
                  <Menu>
                    <Menu.Item key={"edit"}>
                      <ButtonNoPadding
                        type={"link"}
                        onClick={() => props.setProjectModalOpen(true)}
                      >
                        编辑
                      </ButtonNoPadding>
                    </Menu.Item>
                  </Menu>
                }
              >
                <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
              </Dropdown>
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
