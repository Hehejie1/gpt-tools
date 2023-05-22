import * as React from "react";
import { HomeOutlined, TeamOutlined } from "@ant-design/icons";

// 公共页面
import Home from "@/pages/index/home";
import Error from "@/pages/index/404";

export type RouteItem = {
  title: string;
  key: string;
  path?: string; // 页面路径，没有使用key
  hide?: boolean; // 导航隐藏
  icon?: React.ReactNode;
  component?: React.ReactElement;
  children?: RouteItem[];
  permissionKey?: string;
  disabled?: boolean;
};

export enum PAGE_PATH {
  home = "/home",
}

export const routes: RouteItem[] = [
  {
    title: "首页",
    key: "home",
    path: PAGE_PATH.home,
    icon: <HomeOutlined />,
    component: <Home />,
  },
  {
    title: "其他",
    key: "other",
    path: "*",
    icon: <TeamOutlined />,
    component: <Error />,
  },
];

export const flattenRoutes = routes
  .flatMap((item) => (item.children ? [item, ...item.children] : item))
  .filter((item) => item.component);
