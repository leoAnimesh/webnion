import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import React, { useEffect } from "react";
import { useToast } from "../ui/use-toast";
import moment from "moment";
import { ToastAction } from "../ui/toast";
import useReduxActions from "@/hooks/redux/useReduxActions";
import useReduxValues from "@/hooks/redux/useReduxValues";

interface AddWebAppBtnProps extends React.HTMLAttributes<HTMLButtonElement> {
  domain: string;
  protocol: string;
}

const getNameFromDomain = (domain: string) => {
  return domain.split(".")[1];
};

const AddWebAppBtn: React.FC<AddWebAppBtnProps> = ({
  domain,
  protocol,
  ...rest
}) => {
  const { toast, dismiss } = useToast();

  const { allApps, allWorkspaces, activeWorkSpaceId } = useReduxValues();
  const { addNewWebApp } = useReduxActions();

  const [UrlDetails, setUrlDetails] = React.useState({
    name: "",
    url: "",
  });

  useEffect(() => {
    if (domain === "" && protocol === "") return;
    setUrlDetails({
      name: getNameFromDomain(domain),
      url: `${protocol}//${domain}`,
    });
  }, [domain, protocol]);

  const onAddWebApp = () => {
    if (
      allApps.find((app) =>
        app.url.toLowerCase().includes(UrlDetails.url.toLowerCase())
      )
    ) {
      toast({
        title: "Web App Already Exists",
        description: moment(Date.now()).format("llll"),
        action: (
          <ToastAction altText={`Dismiss`} onClick={() => dismiss()}>
            Dismiss
          </ToastAction>
        ),
      });
      return;
    }
    addNewWebApp(UrlDetails.name, UrlDetails.url, activeWorkSpaceId);
    setUrlDetails({ url: "", name: "" });
  };

  if (allWorkspaces.length === 0) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button {...rest} size={"icon"} variant={"outline"}>
          <Plus className="w-3 h-3" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Add to Dock</h4>
            <p className="text-sm text-muted-foreground">
              Do you want to add this web app to your dock ?
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Name</Label>
              <Input
                value={UrlDetails.name}
                onChange={(e) =>
                  setUrlDetails({ ...UrlDetails, name: e.target.value })
                }
                id="width"
                placeholder="ex : Google"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="maxWidth">URL</Label>
              <Input
                id="maxWidth"
                value={UrlDetails.url}
                onChange={(e) =>
                  setUrlDetails({ ...UrlDetails, url: e.target.value })
                }
                placeholder="https://google.com"
                className="col-span-2 h-8"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <PopoverClose>
              <Button
                onClick={onAddWebApp}
                variant={"secondary"}
                className="w-full"
              >
                Add WebApp
              </Button>
            </PopoverClose>
            <PopoverClose>
              <Button variant={"outline"} className="w-full">
                Cancel
              </Button>
            </PopoverClose>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddWebAppBtn;
