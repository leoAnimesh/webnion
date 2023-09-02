import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const Home = React.lazy(() => import('./pages/Home'));
const WorkspaceRenderer = React.lazy(() => import('./pages/WorkspaceRenderer'));
const WebWorkspaceHome = React.lazy(() => import('./pages/WebWorkspaceHome'));
const AppManagerHome = React.lazy(
  () => import('./pages/HomePages/AppManagerHome')
);

const App = () => {
  return (
    <Suspense
      fallback={
        <div className="transition-all  flex items-center justify-center absolute top-0 left-0 right-0 bottom-0 dark:bg-darker "></div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index path="app-manager" element={<AppManagerHome />} />
        </Route>
        <Route path="/webAppsHome" element={<WebWorkspaceHome />}>
          <Route path="/webAppsHome/:id" element={<WorkspaceRenderer />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
