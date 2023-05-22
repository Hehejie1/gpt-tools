import * as React from "react";
import { Layout } from "antd";

import { InputFooter } from "./components/input-footer";
import { UserMessage } from "./components/user-message";
import { SideMenu } from "./components/menu";

const { Content, Footer, Sider } = Layout;

const Home: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <Layout className="w-screen h-screen flex">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <SideMenu />
      </Sider>
      <Layout className="relative h-full">
        <Content className="h-full" style={{ overflow: "initial" }}>
          <div className="h-screen overflow-y-scroll pb-20 scroll">
            <UserMessage />
          </div>
        </Content>
        <Footer className="absolute bottom-0 left-0 w-full">
          <InputFooter />
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Home;
