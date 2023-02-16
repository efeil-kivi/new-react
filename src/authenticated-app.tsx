import React from "react";
import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from "@emotion/styled";
import { Row } from "./components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Dropdown, Menu } from "antd";
export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <PageHeader between={true}>
        <HeaderLeft gap={true}>
          <SoftwareLogo width={"18rem"} color={"rgb(36,78,255)"} />
          <h2>project</h2>
          <h2>user</h2>
          {/*<h2 as={"div"}>another</h2>*/}
        </HeaderLeft>
        <HeaderRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <a onClick={logout}>logout</a>
                </Menu.Item>
              </Menu>
            }
          >
            <a onClick={(e) => e.preventDefault()}>Hi, 213</a>
          </Dropdown>
        </HeaderRight>
      </PageHeader>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  height: 100vh;
`;
const PageHeader = styled(Row)`
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
