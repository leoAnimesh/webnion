import { useRef, useEffect, useState } from 'react';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { GoTools } from 'react-icons/go';
import { TfiReload } from 'react-icons/tfi';
import { WebViewData } from '../../types/workspaceDataTypes';

const WebView: React.FC<{ data: WebViewData }> = ({ data }) => {
  const ispopupsAllowed = 'true' as any;
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

  const openDevTools = () => {
    webViewRef.current.print();
  };

  useEffect(() => {
    const handleNavigation = (e: any) => {
      setCurrentURL(e.url);
    };

    const handleLoading = (loading: boolean) => {
      setLoading(loading);
    };

    webViewRef.current?.addEventListener('did-stop-loading', () => {
      handleLoading(false);
    });
    webViewRef.current?.addEventListener('did-start-loading', () =>
      handleLoading(true)
    );
    webViewRef.current?.addEventListener('did-navigate', handleNavigation);
    webViewRef.current?.addEventListener(
      'did-navigate-in-page',
      handleNavigation
    );
    webViewRef.current?.addEventListener('dom-ready', () => {
      if (data.url === 'https://web.whatsapp.com') {
        webViewRef.current?.setUserAgent(
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
        );
      }
      console.log('web view is ready');
    });

    return () => {
      webViewRef.current?.removeEventListener(
        'did-navigate-in-page',
        handleNavigation
      );
      webViewRef.current?.removeEventListener('did-navigate', handleNavigation);
      webViewRef.current?.removeEventListener('did-stop-loading', () =>
        handleLoading(false)
      );
      webViewRef.current?.removeEventListener('did-start-loading', () =>
        handleLoading(false)
      );
    };
  }, []);

  return (
    <>
      <section className="flex sticky top-0 justify-between p-3 border-b-2">
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
          <input
            disabled
            className="text-center text-sm w-full"
            value={currentURL}
          />
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
        src={data.url}
        allowpopups={ispopupsAllowed}
        webpreferences="nativeWindowOpen=true"
        useragent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
        partition={`persist:webx}`}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </>
  );
};

export default WebView;
