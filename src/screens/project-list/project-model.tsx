import React from "react";
import { Button, Drawer } from "antd";

export const ProjectModal = (prop: {
  projectModelOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      onClose={prop.onClose}
      visible={prop.projectModelOpen}
      width={"100%"}
    >
      <h1>Project Modal</h1>
      <Button onClick={prop.onClose}>关闭</Button>
    </Drawer>
  );
};
