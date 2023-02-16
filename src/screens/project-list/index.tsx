import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useEffect, useState } from "react";
import { cleanObject, useMount } from "utils";
import qs from "qs";
import { useDebounce } from "utils";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 2000); //每次param变化都会运行
  const [list, setList] = useState([]);
  const client = useHttp();
  //由于用了泛型
  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
  }, [debouncedParam]);
  useMount(() => {
    client("users").then(setUsers);
  });
  return (
    <Container>
      <h1>Project List</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
};
const Container = styled.div`
  padding: 3.2rem;
`;
