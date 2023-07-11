import { useMemo } from 'react';
import WebView from './components/WebView';
import { useAppSelector } from './redux/hooks';
import SideBar from './components/SideBar';
import ManageWorkspaceModal from './components/Modal/ManageWorkspaceModal';

interface WebView {
  id: string;
  name: string;
  url: string;
}

function App() {
  const { workSpaces, currentWorkSpace, showWorkspaceModal } = useAppSelector(
    (state) => state.workspaceState
  );

  const renderWebViews = useMemo(() => {
    return workSpaces[currentWorkSpace]?.webViews
      .filter((item) => item.active === true)
      .map((item: WebView, index: number) => {
        return (
          <WebView
            show={
              workSpaces[currentWorkSpace]?.currentWebViewId === item.id
                ? true
                : false
            }
            data={item}
            key={index}
          />
        );
      });
  }, [
    workSpaces[currentWorkSpace].currentWebViewId,
    workSpaces[currentWorkSpace]?.webViews,
  ]);

  return (
    <main className="flex flex-1 justify-end h-screen w-full ">
      <SideBar />
      {renderWebViews}
      {showWorkspaceModal && <ManageWorkspaceModal />}
    </main>
  );
}

export default App;
