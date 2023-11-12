import { Button } from "@/components/ui/button";
import { SheetClose } from "../ui/sheet";
import useReduxValues from "@/hooks/redux/useReduxValues";
import useReduxActions from "@/hooks/redux/useReduxActions";
import DeleteWorkspaceBtn from "./DeleteWorkspaceBtn";

const WorkSpaceList = ({
  data,
  workspaceIndex,
}: {
  data: WorkspaceType;
  workspaceIndex: number;
}) => {
  const { activeWorkspaceIndex } = useReduxValues();
  const { changeCurrentWorkspaceIndex } = useReduxActions();

  const onSwitchWorkspace = () => {
    if (activeWorkspaceIndex === workspaceIndex) return;
    changeCurrentWorkspaceIndex(workspaceIndex);
  };

  return (
    <div className="flex flex-col">
      <div
        className={` flex items-center space-x-4 rounded-md border ${
          activeWorkspaceIndex === workspaceIndex && "bg-secondary"
        }  w p-3`}
      >
        <SheetClose onClick={onSwitchWorkspace}>
          <Button
            variant={"outline"}
            className={`border border-black rounded-md`}
            size={"icon"}
          >
            <p className="text-2xl text-center">{data.icon}</p>
          </Button>
        </SheetClose>

        <div className="flex-1 flex flex-col gap-[0.5rem]">
          <p className="text-sm font-medium leading-none capitalize">
            {data.name} workspace
          </p>
          <p className="text-xs text-muted-foreground">
            Total {data.totalApps} Apps in this workspace
          </p>
        </div>
        <div>
          <DeleteWorkspaceBtn />
        </div>
      </div>
    </div>
  );
};
export default WorkSpaceList;
