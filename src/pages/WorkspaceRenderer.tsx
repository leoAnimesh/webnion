import WorkspaceHome from '../components/shared/WorkspaceHome';
import { useAppSelector } from '../redux/hooks';
import MainWindowWrapper from '../components/shared/MainWindowWrapper';
import WebView from '../components/shared/WebView';
import { useMemo } from 'react';
interface WebView {
  id: string;
  name: string;
  url: string;
}

const WorkspaceRenderer = () => {
  const { workSpaces, currentWorkSpace } = useAppSelector(
    (state) => state.workspaceState
  );

  const renderWebViews = useMemo(() => {
    return workSpaces[currentWorkSpace].webViews.map(
      (item: WebView, index: number) => {
        return (
          <MainWindowWrapper id={item.id} key={index}>
            <WebView data={item} />
          </MainWindowWrapper>
        );
      }
    );
  }, [workSpaces[currentWorkSpace].webViews]);

  return (
    <>
      <MainWindowWrapper id={workSpaces[currentWorkSpace].WorkspaceMenu.id}>
        <WorkspaceHome />
      </MainWindowWrapper>
      {renderWebViews}
    </>
  );
};

export default WorkspaceRenderer;
