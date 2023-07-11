import { useMemo } from 'react';
import WebView from './components/shared/WebView';
import { useAppSelector } from './redux/hooks';
import SideBar from './components/shared/SideBar';
import ManageWorkspaceModal from './components/Modal/ManageWorkspaceModal';
import MainWindowWrapper from './components/shared/MainWindowWrapper';
import WorkspaceHome from './components/shared/WorkspaceHome';

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
        if (index === 0) {
          return (
            <MainWindowWrapper
              show={
                workSpaces[currentWorkSpace]?.currentWebViewId === item.id
                  ? true
                  : false
              }
            >
              <WorkspaceHome />
            </MainWindowWrapper>
          );
        }
        return (
          <MainWindowWrapper
            key={index}
            show={
              workSpaces[currentWorkSpace]?.currentWebViewId === item.id
                ? true
                : false
            }
          >
            <WebView data={item} />
          </MainWindowWrapper>
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
