import React, { useRef, useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Lock,
  MousePointerSquare,
  RefreshCcw,
} from "lucide-react";
import { Input } from "../ui/input";
import CircularLoader from "./CircularLoader";
import WebViewContextMenu from "../ContextMenus/WebViewContextMenu";
import useWebActions from "@/hooks/useWebActions";
import AddWebAppBtn from "./AddWebAppBtn";
import useReduxValues from "@/hooks/redux/useReduxValues";

interface AppData {
  name: string;
  url: string;
  currentURL?: string;
}

const WebView: React.FC<{
  data: AppData;
  show: boolean;
}> = ({ data, show }) => {
  const { activeWebAppIndex } = useReduxValues();
  const ispopupsAllowed = "true" as any;
  const allowPlugins = "true" as any;
  const [mainURL, setMainUrl] = useState(data?.url);
  const [currentURL, setCurrentURL] = useState(data?.url);
  const [bgColor, setBgColor] = useState("");
  const [loading, setLoading] = useState(true);

  const webViewRef = useRef<any>(null);
  const triggerRef = React.useRef<any>(null);

  const webActions = useWebActions({ webViewRef });
  const { domain, protocol } = webActions.urlDetails;

  const handleNavigation = (e: any) => {
    setCurrentURL(e.url);
  };

  const handleContextMenu = (e: any) => {
    const Xpos = e.params.x;
    const Ypos = e.params.y;

    if (triggerRef.current) {
      const event = new MouseEvent("contextmenu", {
        bubbles: true,
        cancelable: true,
        clientX: Xpos,
        clientY: Ypos,
      });
      triggerRef.current.dispatchEvent(event);
    }
  };

  const handleLoading = (loading: boolean) => {
    setLoading(loading);
  };

  const handleBgColor = () => {
    setBgColor("bg-white");
  };

  useEffect(() => {
    webViewRef.current?.addEventListener("context-menu", handleContextMenu);
    webViewRef.current?.addEventListener("load-commit", handleBgColor);
    webViewRef.current?.addEventListener("did-stop-loading", () =>
      handleLoading(false)
    );
    webViewRef.current?.addEventListener("did-start-loading", () =>
      handleLoading(true)
    );
    webViewRef.current?.addEventListener(
      "did-navigate-in-page",
      handleNavigation
    );

    return () => {
      webViewRef.current?.removeEventListener(
        "context-menu",
        handleContextMenu
      );
      webViewRef.current?.removeEventListener("load-commit", handleBgColor);
      webViewRef.current?.removeEventListener("did-stop-loading", () =>
        handleLoading(false)
      );
      webViewRef.current?.removeEventListener("did-start-loading", () =>
        handleLoading(true)
      );
      webViewRef.current?.removeEventListener(
        "did-navigate-in-page",
        handleNavigation
      );
    };
  }, []);

  return (
    <div
      className={`transition-all duration-200 ${
        show ? "flex flex-col flex-1" : "hidden"
      }`}
    >
      {/* header section  */}
      <section
        className={`flex items-center sticky top-0 justify-between gap-3 p-2 border-b`}
      >
        {/* left section  */}
        <div className="flex gap-2 ">
          <Button
            disabled={!webActions.canGoBack()}
            className="w-6 h-6"
            onClick={webActions.goBack}
            size={"icon"}
            variant={"outline"}
          >
            <ChevronLeft className="w-3 h-3" />
          </Button>
          <Button
            className="w-6 h-6"
            onClick={webActions.goForward}
            size={"icon"}
            variant={"outline"}
          >
            <ChevronRight className="w-3 h-3" />
          </Button>
          <Button
            className="w-6 h-6"
            onClick={webActions.goToHome}
            size={"icon"}
            variant={"outline"}
          >
            <Home className="w-3 h-3" />
          </Button>
        </div>

        {/* middle section  */}
        <div className="border flex flex-1 justify-between items-center rounded-md">
          {loading ? (
            <Button size={"icon"} variant={"outline"} className="w-6 h-6">
              <CircularLoader />
            </Button>
          ) : (
            <Button className="w-6 h-6" variant={"outline"} size={"icon"}>
              <Lock className="w-3 h-3" />
            </Button>
          )}
          <form
            className="flex-1"
            onSubmit={(e) => {
              e.preventDefault();
              setMainUrl(currentURL);
            }}
          >
            <Input
              disabled={activeWebAppIndex !== 0}
              className="p-0 px-2 m-0 h-6 border-0 text-sm w-full "
              value={currentURL}
              onChange={(e) => {
                e.preventDefault();
                setCurrentURL(e.target.value);
              }}
            />
          </form>
          <AddWebAppBtn
            className="w-6 h-6"
            domain={domain}
            protocol={protocol}
          />
          <Button
            className="w-6 h-6"
            onClick={webActions.reload}
            size={"icon"}
            variant={"outline"}
          >
            <RefreshCcw className="w-3 h-3" />
          </Button>
        </div>

        {/* right section  */}
        <div className="flex gap-2">
          <Button
            className="w-6 h-6"
            onClick={webActions.openDevTools}
            size={"icon"}
            variant={"outline"}
          >
            <MousePointerSquare className="w-3 h-3 bg-transparent relative" />
          </Button>
        </div>
      </section>

      <WebViewContextMenu
        bgColor={bgColor}
        webViewRef={webViewRef}
        triggerRef={triggerRef}
      >
        <webview
          ref={webViewRef as any}
          src={mainURL}
          plugins={allowPlugins}
          allowpopups={ispopupsAllowed}
          useragent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
          partition={`persist:webx`}
          className={`w-full h-full`}
        />
      </WebViewContextMenu>
    </div>
  );
};

export default WebView;
