import React from "react";
import { SearchPanel } from "./search-panel";
import { List, project } from "./list";
import { useState } from "react";
import { useMount } from "utils";
import { useDebounce } from "utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "../../utils/project";
import { useUsers } from "../../utils/user";
export const ProjectListScreen = () => {
  const { data: users } = useUsers();
  // const [users, setUsers] = useState([]);
  // const client = useHttp();
  // useMount(() => {
  //   client("users").then(setUsers);
  // });
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<null | Error>(null);
  // const [list, setList] = useState([]);
  const debouncedParam = useDebounce(param, 2000); //每次param变化都会运行
  //下面22行由project.ts替代
  const { isLoading, error, data: list } = useProject(debouncedParam);
  // const {run,isLoading,error,data: list} = useAsync<project[]>()//代替上面三行

  // //由于用了泛型
  // useEffect(() => {
  //   // setIsLoading(true);
  //   run(client("projects", {data: cleanObject(debouncedParam)})).then() //代替了上1下7行。
  //    // client("projects", { data: cleanObject(debouncedParam) })
  //   //   .then(setList)
  //   //   .catch(error =>{
  //   //     setList([])
  //   //     setError(error)
  //   //   })
  //   //   .finally(() => setIsLoading(false));
  // }, [debouncedParam]);

  return (
    <Container>
      <h1>Project List</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message} </Typography.Text>
      ) : null}
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
`;
