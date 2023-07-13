import { Outlet, useNavigate } from 'react-router-dom';
import ManageWorkspaceModal from '../components/Modal/ManageWorkspaceModal';
import SideBar from '../components/shared/SideBar';
import { useAppSelector } from '../redux/hooks';
import { useEffect } from 'react';

const Home = () => {
  const navigation = useNavigate();
  const { currentWorkSpace, showWorkspaceModal } = useAppSelector(
    (state) => state.workspaceState
  );

  useEffect(() => {
    navigation(`/${currentWorkSpace}`);
  }, []);

  return (
    <main className="flex justify-end h-screen w-full">
      <SideBar />
      <Outlet />
      {showWorkspaceModal && <ManageWorkspaceModal />}
    </main>
  );
};

export default Home;
