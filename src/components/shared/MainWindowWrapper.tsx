import { useEffect, useState } from 'react';
import { useAppSelector } from '../../redux/hooks';

const MainWindowWrapper = ({ children, show = false }: any) => {
  const { sideBarExpanded } = useAppSelector((state) => state.conditionsState);
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
  return (
    <div
      className="overflow-hidden flex flex-col relative md:pl-4 lg:pl-0"
      style={{
        display: show ? 'flex' : 'none',
        width: `${windowSize.width - 70}px`,
      }}
    >
      {children}
    </div>
  );
};

export default MainWindowWrapper;
