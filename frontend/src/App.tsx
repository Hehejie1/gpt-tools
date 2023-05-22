import * as React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { PageLayout } from "./layout";
import { PAGE_PATH } from "./layout/routes";
import { useMessageStore } from "./store/useMessage";
import { useConfigStore } from "./store/useConfig";

// const defaultRoute = '/home'
const defaultRoute = PAGE_PATH.home;

const App: React.FC = () => {
  const { init: initMessage } = useMessageStore((state) => state);
  const { init: initConfig } = useConfigStore((state) => state);

  React.useEffect(() => {
    initMessage();
    initConfig();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={defaultRoute} replace />} />
        <Route path="/*" element={<PageLayout />} />
      </Routes>
    </Router>
  );
};

export default App;
