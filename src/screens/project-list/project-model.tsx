import React from "react";
import { Button, Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListAction,
  selectProjectModalOpen,
} from "./project-list.slice";

export const ProjectModal = () =>
  // projectModelOpen: boolean;
  // onClose: () => void;
  {
    const dispatch = useDispatch();
    const projectModalOpen = useSelector(selectProjectModalOpen);
    return (
      <Drawer
        onClose={() => dispatch(projectListAction.closeProjectModal())}
        open={projectModalOpen}
        width={"100%"}
      >
        <h1>Project Modal</h1>
        <Button style={{}}>关闭</Button>
      </Drawer>
    );
  };
