import { useRef, memo, useEffect, useState } from 'react';
import { BiLeftArrow, BiRightArrow, BiPrinter } from 'react-icons/bi';
import { TfiReload } from 'react-icons/tfi';

const WebView = ({ data, show = false }: any) => {
  let webViewRef = useRef<any>(null);
  const [currentURL, setCurrentURL] = useState(data.url);
  const [loading, setLoading] = useState(true);

  const backBtn = () => {
    webViewRef.current.goBack();
  };

  const forwardBtn = () => {
    webViewRef.current.goForward();
  };

  const reloadWindow = () => {
    webViewRef.current.reloadIgnoringCache();
  };

  const printPage = () => {
    webViewRef.current.openDevTools();
  };

  useEffect(() => {
    const handleNavigation = (e: any) => {
      setCurrentURL(e.url);
    };

    const handleLoading = (loading: boolean) => {
      setLoading(loading);
    };

    webViewRef.current.addEventListener('did-stop-loading', () =>
      handleLoading(false)
    );
    webViewRef.current.addEventListener('did-start-loading', () =>
      handleLoading(true)
    );

    webViewRef.current.addEventListener('did-navigate', handleNavigation);

    webViewRef.current.addEventListener(
      'did-navigate-in-page',
      handleNavigation
    );

    return () => {
      webViewRef.current.removeEventListener(
        'did-navigate-in-page',
        handleNavigation
      );
      webViewRef.current.removeEventListener('did-navigate', handleNavigation);
      webViewRef.current.removeEventListener('did-stop-loading', () =>
        handleLoading(false)
      );
      webViewRef.current.removeEventListener('did-start-loading', () =>
        handleLoading(false)
      );
    };
  }, []);

  return (
    <div
      className="flex flex-1 flex-col relative"
      style={{ display: show ? 'flex' : 'none' }}
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
        <div className="w-2/5 border-2 flex items-center rounded-md">
          {loading ? (
            <div
              className="w-4 h-4 ml-1 rounded-full animate-spin absolute
                            border-2 border-solid border-blue-600 border-t-transparent"
            ></div>
          ) : (
            ''
          )}
          <input
            disabled
            className="w-full text-center text-sm"
            value={currentURL}
          />
          <TfiReload className="mx-2 cursor-pointer" onClick={reloadWindow} />
        </div>

        {/* right section  */}
        <div className="flex gap-2">
          <div
            className="border-2  p-1 cursor-pointer rounded-md"
            onClick={printPage}
          >
            <BiPrinter />
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
