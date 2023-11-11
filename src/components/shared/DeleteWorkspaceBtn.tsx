import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useReduxActions from "@/hooks/redux/useReduxActions";
import { Trash } from "lucide-react";

const DeleteWorkspaceBtn = () => {
  const { deleteWorkspace } = useReduxActions();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} size="icon" className="w-6 h-6">
          <Trash size={10} className="hover:text-red-600" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="gap-2">
          <DialogTitle>Are you sure 🤔 ?</DialogTitle>
          <DialogDescription>
            you want to delete this workspace, this action cannot be undone. and
            all the apps in this workspace will be deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={"secondary"}
              className="inline-flex gap-2 bg-red-500 hover:bg-red-600"
              onClick={deleteWorkspace}
            >
              Delete <Trash size={15} />
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" variant={"outline"}>
              Cancel
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteWorkspaceBtn;
