import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';
import SideBar from '../components/shared/SideBar';
import WorkspaceSwitcherModal from '../components/Modal/WorkspaceSwitcherModal';

const WebWorkspaceHome = () => {
  const navigate = useNavigate();
  const { currentWorkSpace, showWorkspaceModal } = useAppSelector(
    (state) => state.workspaceState
  );

  useEffect(() => {
    if (currentWorkSpace === '') {
      navigate('/');
    } else {
      navigate(`/webAppsHome/${currentWorkSpace}`);
    }
  }, []);

  return (
    <main className="flex justify-end h-screen w-full">
      <SideBar />
      <Outlet />
      {showWorkspaceModal && <WorkspaceSwitcherModal />}
    </main>
  );
};

export default WebWorkspaceHome;
