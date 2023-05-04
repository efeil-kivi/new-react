import React from "react";
import { Button, Divider, List, Popover, Typography } from "antd";
import { useProject } from "../utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";

export const ProjectPopover = (prop: {
  setProjectModalOpen: (isOpen: boolean) => void;
}) => {
  const { data: projects, isLoading } = useProject();
  const pinnedProjects = projects?.filter((projects) => projects.pin);
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((projects) => (
          <List.Item style={{ paddingLeft: "0" }}>
            <List.Item.Meta title={projects.name} />
          </List.Item>
        ))}
      </List>
      <Divider style={{ padding: "0px", margin: "0" }} />
      <ButtonNoPadding
        onClick={() => prop.setProjectModalOpen(true)}
        type={"link"}
      >
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
