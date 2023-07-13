import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import WorkspaceRenderer from './pages/WorkspaceRenderer';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route path="/:id" element={<WorkspaceRenderer />} />
      </Route>
    </Routes>
  );
};

export default App;
