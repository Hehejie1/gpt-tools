import * as React from "react";
import { Layout } from "antd";
import { Routes, Route } from "react-router-dom";
import { flattenRoutes } from "./routes";

export const PageLayout: React.FC = () => {
  const routes = flattenRoutes;

  return (
    <Layout>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.key}
            path={route.path || route.key}
            element={route.component}
          />
        ))}
      </Routes>
    </Layout>
  );
};
