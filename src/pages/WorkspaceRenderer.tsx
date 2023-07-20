import WorkspaceHome from '../components/shared/WorkspaceHome';
import { useAppSelector } from '../redux/hooks';
import MainWindowWrapper from '../components/shared/MainWindowWrapper';
import WebView from '../components/shared/WebView';
import { useMemo } from 'react';
import { WebViewData } from '../types/workspaceDataTypes';

const WorkspaceRenderer = () => {
  const { workSpaces, currentWorkSpace } = useAppSelector(
    (state) => state.workspaceState
  );

  const renderWebViews = useMemo(() => {
    return workSpaces[currentWorkSpace].webViews.map(
      (item: WebViewData, index: number) => {
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
      {location.pathname.split('/')[2] === currentWorkSpace && renderWebViews}
    </>
  );
};

export default WorkspaceRenderer;
