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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import EmojiPickerPopOver from "./EmojiPicker";
import useReduxActions from "@/hooks/redux/useReduxActions";

const AddWorkSpace = () => {
  const { addNewWorkSpace } = useReduxActions();
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");

  const validateData = () => {
    if (name.length < 3) {
      return false;
    }
    if (emoji === "") {
      return false;
    }
    return true;
  };

  const onAddWorkspace = async () => {
    addNewWorkSpace({ name, icon: emoji });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant={"outline"} className="w-full">
          Add New Workspace{" "}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="gap-2">
          <DialogTitle>New Workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace, for better management of your works.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-1">
          <div className="grid grid-cols-4 gap-2 items-center">
            <Input
              id="name"
              placeholder="Workspace Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
            <EmojiPickerPopOver emoji={emoji} setEmoji={setEmoji} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose disabled={!validateData()} asChild>
            <Button variant={"secondary"} onClick={onAddWorkspace}>
              Add It 🎉
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

export default AddWorkSpace;
