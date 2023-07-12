import { useRef, memo, useEffect, useState } from 'react';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { GoTools } from 'react-icons/go';
import { TfiReload } from 'react-icons/tfi';

const WebView = ({ data }: any) => {
  let webViewRef = useRef<any>(null);
  const [currentURL, setCurrentURL] = useState(data.url);
  const [loading, setLoading] = useState(true);
  const [interaction, setIneration] = useState(0);

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

    webViewRef?.current?.addEventListener('did-stop-loading', () => {
      handleLoading(false);
    });

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
    if (
      loading === false &&
      interaction === 0 &&
      data.url === 'https://web.whatsapp.com'
    ) {
      webViewRef?.current?.reloadIgnoringCache();
      setIneration(1);
    }
  }, [loading]);

  return (
    <>
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
        src={data?.url}
        useragent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
        partition={`persist:webx}`}
        style={{
          width: '100%',
          height: '100%',
        }}
      ></webview>
    </>
  );
};

export default memo(WebView);
