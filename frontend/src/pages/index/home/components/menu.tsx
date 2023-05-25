import * as React from "react";
import { Button, Input, Menu, Select, Space, message } from "antd";
import { groupBy } from "lodash-es";

import { models } from "@/constant";
import { useMessageStore } from "@/store/useMessage";
import { useConfigStore } from "@/store/useConfig";

export type SideMenuProps = {};

export const SideMenu: React.FC<SideMenuProps> = () => {
  const {
    currentId,
    message: allMessage,
    getTitles,
    createMessage,
    resetMessage,
    updateId,
  } = useMessageStore((state) => state);
  const { config, updateConfig } = useConfigStore((state) => state);

  const handleSelect = React.useCallback((item: any) => {
    updateId(item.key);
  }, []);

  const menuList = React.useMemo(() => {
    const list = getTitles() || [];

    const result = groupBy(list, "tag");

    return Object.entries(result).map(([key, val]) => {
      return {
        key,
        label: key,
        children: val,
      };
    });
  }, [allMessage]);

  return (
    <div className="">
      <Menu
        selectedKeys={currentId ? [currentId] : undefined}
        theme={config?.theme}
        mode="inline"
        defaultSelectedKeys={["4"]}
        onSelect={handleSelect}
        items={menuList}
      />
      <Space
        split={
          <div className="w-full border-t-2 border-dashed border-transparent border-t-white" />
        }
        direction="vertical"
        className="absolute bottom-12 left-0 p-4"
      >
        <Space direction="vertical">
          <Input
            value={config?.sk}
            onChange={(e) => {
              message.success("设置成功");
              updateConfig({ sk: e.target.value });
            }}
            placeholder="请输入key, sk-xxx"
          />
          <Input
            value={config?.proxy}
            onChange={(e) => {
              message.success("设置成功");
              updateConfig({ proxy: e.target.value });
            }}
            placeholder="请输入代理地址 https://xxx.com/v1"
          />
          <Select
            value={config?.model}
            className="w-full"
            onChange={(model) => {
              message.success("设置成功");
              updateConfig({ model });
            }}
            options={models}
          />
          <Button className="w-full" type="dashed" onClick={createMessage}>
            新建会话
          </Button>
        </Space>
        <Button className="w-full" type="primary" danger onClick={resetMessage}>
          清除会话
        </Button>
      </Space>
    </div>
  );
};
