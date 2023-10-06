import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { ModeToggle } from "../theme/mode-toggle";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

const SideBar = () => {
  return (
    <aside className="border-r h-screen justify-between flex flex-col gap-3 px-[0.4rem] py-3">
      <div className="flex flex-col gap-3  items-center">
        <Button variant={"secondary"} size={"sm"}>
          💼
        </Button>
        <span className="text-xs" >APPS</span>
        <Tabs defaultValue="home" className="flex flex-col">
          <TabsList className="inline-flex flex-col gap-1 h-full" >
            <TabsTrigger className="text-xs" value="home">📦</TabsTrigger>
            <TabsTrigger className="text-xs" value="google">📦</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="flex flex-col items-center gap-3"  >
        <Button variant={"outline"} size={"sm"}>
          <ChevronRight className="w-4 h-4" />
        </Button>
        <ModeToggle />
      </div>
    </aside>
  );
};

export default SideBar;
