import { useRef, useEffect, useState } from 'react';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { GoTools } from 'react-icons/go';
import { TfiReload } from 'react-icons/tfi';

const WebView = ({ data }: any) => {
  let webViewRef = useRef<any>(null);
  const [currentURL, setCurrentURL] = useState(data.url);
  const [loading, setLoading] = useState(true);
  const [webViewElement, setWebViewElement] = useState<any>(null);

  const backBtn = () => {
    webViewElement.goBack();
  };

  const forwardBtn = () => {
    webViewElement.goForward();
  };

  const reloadWindow = () => {
    webViewElement.reloadIgnoringCache();
  };

  const openDevTools = () => {
    webViewElement.openDevTools();
  };

  useEffect(() => {
    const myElement = document.createElement('webview');
    myElement.src = data.url;
    myElement.style.width = '100%';
    myElement.style.height = '94.5vh';
    myElement.allowpopups = true;
    myElement.partition = 'persist:webx';
    myElement.plugins = true;

    webViewRef.current.appendChild(myElement);
    setWebViewElement(myElement);

    const handleNavigation = (e: any) => {
      setCurrentURL(e.url);
    };

    const handleLoading = (loading: boolean) => {
      setLoading(loading);
    };

    myElement.addEventListener('did-stop-loading', () => {
      handleLoading(false);
    });
    myElement.addEventListener('did-start-loading', () => handleLoading(true));
    myElement.addEventListener('did-navigate', handleNavigation);
    myElement.addEventListener('did-navigate-in-page', handleNavigation);
    myElement.addEventListener('dom-ready', () => {
      if (data.url === 'https://web.whatsapp.com') {
        myElement.setUserAgent(
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
        );
      }
      console.log('web view is ready');
    });

    return () => {
      myElement.removeEventListener('did-navigate-in-page', handleNavigation);
      myElement.removeEventListener('did-navigate', handleNavigation);
      myElement.removeEventListener('did-stop-loading', () =>
        handleLoading(false)
      );
      myElement.removeEventListener('did-start-loading', () =>
        handleLoading(false)
      );
    };
  }, []);

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
      <div ref={webViewRef} />
      {/* <webview
        ref={webViewRef}
        src={data.url}
        allowpopups
        webpreferences="nativeWindowOpen=true"
        useragent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
        partition={`persist:webx}`}
        style={{
          width: '100%',
          height: '100%',
        }}
      /> */}
    </>
  );
};

export default WebView;
