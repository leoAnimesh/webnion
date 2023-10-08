import React, { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { ModeToggle } from "../theme/mode-toggle";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

const SideBar = () => {
  const { index = 0 } = useParams();
  const [mount, setMount] = React.useState(false);
  const navigate = useNavigate();
  const { apps } = useAppSelector(state => state.webApps);

  console.log(apps);


  useEffect(() => {
    setMount(true);
  }, [])

  useEffect(() => {
    if (mount) {
      navigate(`/webapp/${index}`);
    }
  }, [index]);

  return (
    <aside className="justify-between sticky left-0 flex flex-col gap-3 px-[0.5rem] py-3">
      <div className="flex flex-col gap-3  items-center">
        <Button variant={"secondary"} size={"default"}>
          <span className="text-sm" >💼</span>
        </Button>
        <span className="text-xs" >APPS</span>
        <Tabs value={index.toString()} className="flex flex-col">
          <TabsList className="inline-flex flex-col gap-1 h-full" >
            {apps.map((item, index) => (
              <TabsTrigger key={index} className="text-md w-full"
                value={index.toString()}
                onClick={() => navigate(`webapp/${index}`)}
              >
                <img src={`http://www.google.com/s2/favicons?domain=${item.currentURL}`} className="py-1" alt="webapp-icon" />
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col items-center gap-3"  >
        <ModeToggle />
      </div>
    </aside >
  );
};

export default SideBar;
