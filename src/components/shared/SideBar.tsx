import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { ModeToggle } from "../theme/mode-toggle";
import SwitcherSheet from "./SwitcherSheet";
import AddWebAppBtn from "./AddWebAppBtn";
import useReduxValues from "@/hooks/redux/useReduxValues";
import WebAppHoverMenu from "../ContextMenus/WebAppsHoverMenu";
import useReduxActions from "@/hooks/redux/useReduxActions";

const SideBar = () => {
  const { allApps, activeWebAppId } = useReduxValues();
  const { changeCurrentWebAppIndex } = useReduxActions();

  return (
    <div className="justify-between w-[60px] bg-background flex h-full border-r flex-col gap-3 px-[0.5rem] py-3">
      <div className="flex flex-1 h-full flex-col gap-3 relative  items-center">
        <SwitcherSheet />
        <span className="text-xs">APPS</span>
        {allApps.length > 0 && (
          <Tabs
            value={activeWebAppId.toString()}
            className="flex flex-col w-full transition-all duration-500"
          >
            <TabsList className="flex flex-1 flex-col gap-1  ">
              {allApps.map((item: AppData, index) => (
                <TabsTrigger
                  key={item.appId}
                  className={`text-md w-full px-0 capitalize`}
                  value={item.appId.toString()}
                  onClick={() => changeCurrentWebAppIndex(index)}
                >
                  <WebAppHoverMenu AppDetails={item}>
                    <div className="w-full flex flex-1 justify-center items-center align-middle ">
                      <img
                        src={`http://www.google.com/s2/favicons?domain=${item.url}`}
                        className="py-1"
                        alt="webapp-icon"
                      />
                    </div>
                  </WebAppHoverMenu>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        )}
        <AddWebAppBtn className="w-full" domain="" protocol="" />
      </div>
      <ModeToggle />
    </div>
  );
};

export default SideBar;
