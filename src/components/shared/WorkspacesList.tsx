import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { SheetClose } from "../ui/sheet"
import useReduxValues from "@/hooks/redux/useReduxValues"
import useReduxActions from "@/hooks/redux/useReduxActions"

const WorkSpaceList = ({ data, workspaceIndex }: { data: WorkSpaceData, workspaceIndex: number }) => {
    const { activeWorkspaceIndex, allApps } = useReduxValues();
    const { changeWorkSpace } = useReduxActions();

    const onSwitchWorkspace = () => {
        changeWorkSpace(workspaceIndex)
    };

    return (
        <div className="flex flex-col" >
            <div className=" flex items-center space-x-4 rounded-md border w p-3">
                <SheetClose onClick={onSwitchWorkspace}>
                    <Button variant={"outline"} size={"icon"}>
                        <p className="text-2xl text-center" >{data.emoji}</p>
                    </Button>
                </SheetClose>

                <div className="flex-1 flex flex-col gap-[0.5rem]">
                    <p className="text-sm font-medium leading-none">
                        {data.name} workspace
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Total {allApps[workspaceIndex].length} Apps in this workspace
                    </p>
                </div>
                <Checkbox className="rounded-lg" checked={workspaceIndex === activeWorkspaceIndex} />
            </div>
        </div>
    )
}
export default WorkSpaceList