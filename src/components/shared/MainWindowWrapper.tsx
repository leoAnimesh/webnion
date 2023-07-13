import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';

const MainWindowWrapper = ({ children, id }: any) => {
  const { sideBarExpanded } = useAppSelector((state) => state.conditionsState);
  const { workSpaces, currentWorkSpace } = useAppSelector(
    (state) => state.workspaceState
  );
  const [windowSize, setWindowSize] = useState<any>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = (e: any) => {
      setWindowSize({
        width: e.target.innerWidth,
        height: e.target.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sideBarExpanded]);

  console.log();

  return (
    <div
      className="overflow-hidden flex flex-col relative md:pl-4 lg:pl-0"
      style={{
        display:
          workSpaces[currentWorkSpace].currentWebViewId === id
            ? 'flex'
            : 'none',
        width: `${windowSize.width - 70}px`,
        height: '100%',
      }}
    >
      {children}
    </div>
  );
};

export default MainWindowWrapper;
