import React, { useState } from "react";
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { ButtonNoPadding, Row } from "./components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { Routes, Navigate, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "./screens/project";
import { resetRoute } from "./utils";
import { ProjectModal } from "./screens/project-list/project-model";
import { ProjectPopover } from "./components/project-popover";

//prop drilling
export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader setProjectModalOpen={setProjectModalOpen} />
      {/*<Button onClick={()=>setProjectModalOpen(true)} >打开</Button>*/}
      <Main>
        {/*<ProjectListScreen />*/}
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/projects" />} />
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen setProjectModalOpen={setProjectModalOpen} />
              }
            />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            />
          </Routes>
        </Router>
      </Main>
      <ProjectModal
        projectModelOpen={projectModalOpen}
        onClose={() => {
          setProjectModalOpen(false);
        }}
      />
    </Container>
  );
};

const PageHeader = (props: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const { logout } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(36,78,255)"} />
        </ButtonNoPadding>
        <ProjectPopover setProjectModalOpen={props.setProjectModalOpen} />
        <span>user</span>
        {/*<h2 as={"div"}>another</h2>*/}
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <Button type={"link"} href={""} onClick={logout}>
                  logout
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type={"link"} onClick={(e) => e.preventDefault()}>
            Hi, 213
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;
const Header = styled(Row)`
  box-shadow: 0 0 5px rgba(60, 117, 0, 0.56);
  z-index: 1;
  padding: 3.2rem;
`;
const Main = styled.main`
  height: calc(100vh - 6rem);
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
//grid 和 flex 的用法
// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 6rem 1fr 6rem;
//   grid-template-columns: 20rem 1fr 20rem;
//   grid-template-areas:
//     "header header header"
//     "nav main aside"
//     "footer footer footer"
//   ;
//   height: 100vh;
//   grid-gap: 1rem;
// `
// const Header = styled.header`
//   grid-area: header;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: space-between;
// `
// const HeaderLeft = styled.div`
//   display: flex;
//   align-items: center;
// `
// const HeaderRight = styled.div``
// const Main = styled.main`grid-area: main`
// const Nav = styled.nav`grid-area: nav`
// const Aside = styled.aside`grid-area: aside`
// const Footer = styled.footer`grid-area: footer`
