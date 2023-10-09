import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { ModeToggle } from "../theme/mode-toggle";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import SwitcherSheet from "./SwitcherSheet";
import useReduxActions from "@/hooks/redux/useReduxActions";
import useReduxValues from "@/hooks/redux/useReduxValues";

const SideBar = () => {
  const { changeActiveWebAppIndex } = useReduxActions();
  const { apps, activeAppIndex } = useReduxValues();
  const [expanded, setExpanded] = React.useState(false);


  return (
    <div className={`justify-between bg-background z-10 absolute top-0 left-0 right-0 bottom-0  ${expanded ? 'w-[250px]' : 'w-[65px]'
      } flex h-full transition-all duration-500 flex-col gap-3 px-[0.5rem] py-3`}>
      <div className="flex flex-1 h-full flex-col gap-3 relative  items-center">
        <SwitcherSheet />
        <span className="text-xs" >APPS</span>
        <Tabs value={activeAppIndex.toString()} className="flex flex-col w-full">
          <TabsList className="flex flex-1 flex-col gap-1 " >
            {apps.map((item, index) => (
              <TabsTrigger key={index} className={`text-md w-full justify-start gap-3 capitalize`}
                value={index.toString()}
                onClick={() => changeActiveWebAppIndex(index)}
              >
                <img src={`http://www.google.com/s2/favicons?domain=${item.currentURL}`} className="py-1" alt="webapp-icon" />
                <p className={`text-sm font-normal overflow-hidden `}>{item.name}</p>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <div className={`flex flex-col items-center gap-3`}  >
        <Button onClick={() => setExpanded(!expanded)} variant={"outline"} className="w-full" size={"default"}  >
          {expanded ? <ChevronRight className="w-5 h-5 transform rotate-180" /> : <ChevronRight className="w-5 h-5" />}
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default SideBar;
