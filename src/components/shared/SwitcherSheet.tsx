import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import WorkSpaceList from "./WorkspacesList";
import AddWorkSpace from "./AddWorkspace";
import useReduxValues from "@/hooks/redux/useReduxValues";

const SwitcherSheet = () => {
  const { workspace, allWorkspaces } = useReduxValues();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"secondary"}
          className="w-full justify-center items-center "
          size={"default"}
        >
          <span className="text-sm">{workspace.icon}</span>
          <span className={`text-sm overflow-hidden`}>{workspace.name}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="flex flex-col gap-4">
        <SheetHeader>
          <SheetTitle>Webnion</SheetTitle>
          <SheetDescription>Explore All the Features here</SheetDescription>
        </SheetHeader>
        {allWorkspaces.map((item, index) => (
          <WorkSpaceList key={index} workspaceIndex={index} data={item} />
        ))}
        <SheetFooter>
          <SheetClose asChild>
            <AddWorkSpace />
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default SwitcherSheet;
