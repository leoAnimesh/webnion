import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import WorkspaceRenderer from './pages/WorkspaceRenderer';
import WebWorkspaceHome from './pages/WebWorkspaceHome';
import AppManagerHome from './pages/HomePages/AppManagerHome';
import WebResponsiveHome from './pages/HomePages/WebResponsiveHome';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index path="app-manager" element={<AppManagerHome />} />
        <Route path="web-flex" element={<WebResponsiveHome />} />
      </Route>
      <Route path="/webAppsHome" element={<WebWorkspaceHome />}>
        <Route path="/webAppsHome/:id" element={<WorkspaceRenderer />} />
      </Route>
    </Routes>
  );
};

export default App;
