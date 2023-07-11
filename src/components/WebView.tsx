import { useRef, memo, useEffect, useState } from 'react';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { GoTools } from 'react-icons/go';
import { TfiReload } from 'react-icons/tfi';
import { useAppSelector } from '../redux/hooks';

const WebView = ({ data, show = false }: any) => {
  let webViewRef = useRef<any>(null);
  const { sideBarExpanded } = useAppSelector((state) => state.workspaceState);
  const [currentURL, setCurrentURL] = useState(data.url);
  const [loading, setLoading] = useState(true);
  const [windowSize, setWindowSize] = useState<any>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const backBtn = () => {
    webViewRef.current.goBack();
  };

  const forwardBtn = () => {
    webViewRef.current.goForward();
  };

  const reloadWindow = () => {
    webViewRef.current.reloadIgnoringCache();
  };

  const openDevTools = () => {
    webViewRef.current.openDevTools();
  };

  useEffect(() => {
    const handleNavigation = (e: any) => {
      setCurrentURL(e.url);
    };

    const handleLoading = (loading: boolean) => {
      setLoading(loading);
    };

    webViewRef?.current?.addEventListener('did-stop-loading', () =>
      handleLoading(false)
    );
    webViewRef?.current?.addEventListener('did-start-loading', () =>
      handleLoading(true)
    );
    webViewRef?.current?.addEventListener('did-navigate', handleNavigation);

    webViewRef?.current?.addEventListener(
      'did-navigate-in-page',
      handleNavigation
    );

    return () => {
      webViewRef?.current?.removeEventListener(
        'did-navigate-in-page',
        handleNavigation
      );
      webViewRef?.current?.removeEventListener(
        'did-navigate',
        handleNavigation
      );
      webViewRef?.current?.removeEventListener('did-stop-loading', () =>
        handleLoading(false)
      );
      webViewRef?.current?.removeEventListener('did-start-loading', () =>
        handleLoading(false)
      );
    };
  }, []);

  useEffect(() => {
    if (sideBarExpanded) {
      setWindowSize((prev: any) => {
        return {
          ...prev,
          width: prev.width + 70 - 260,
        };
      });
    }

    if (windowSize.width === window.innerWidth + 70 - 260) {
      setWindowSize((prev: any) => {
        return {
          ...prev,
          width: prev.width + 190,
        };
      });
    }

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
      <section className="flex justify-between p-3 border-b-2">
        {/* left section  */}
        <div className="flex gap-2">
          <div
            className="border-2 p-1 cursor-pointer rounded-md"
            onClick={backBtn}
          >
            <BiLeftArrow />
          </div>
          <div
            className="border-2 p-1 cursor-pointer rounded-md"
            onClick={forwardBtn}
          >
            <BiRightArrow />
          </div>
        </div>

        {/* middle section  */}
        <div className="w-2/5 border-2 flex justify-between items-center rounded-md">
          <div className="mx-3 flex justify-center items-center">
            {loading && (
              <div
                className="w-4 h-4 mx-2 rounded-full animate-spin absolute
                            border-2 border-solid border-blue-600 border-t-transparent"
              ></div>
            )}
          </div>
          <input disabled className="text-center text-sm " value={currentURL} />
          <TfiReload className="mx-2 cursor-pointer" onClick={reloadWindow} />
        </div>

        {/* right section  */}
        <div className="flex gap-2">
          <div
            className="border-2  p-1 cursor-pointer rounded-md"
            onClick={openDevTools}
          >
            <GoTools />
          </div>
        </div>
      </section>
      <webview
        ref={webViewRef}
        src={data?.url}
        partition={`persist:webx}`}
        style={{
          width: '100%',
          height: '100%',
        }}
      ></webview>
    </div>
  );
};

export default memo(WebView);
