import { Trash2 } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import React, { ReactNode } from "react";
import { Button } from "../ui/button";
import useReduxActions from "@/hooks/redux/useReduxActions";

const WebAppHoverMenu: React.FC<{
  children: ReactNode;
  AppDetails: AppData;
}> = ({ children, AppDetails }) => {
  const { deleteWebApp } = useReduxActions();

  return (
    <HoverCard>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent side="right" sideOffset={15} className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm text-left font-semibold">
              @{AppDetails.name}
            </h4>
            <p className="text-sm normal-case">URL : {AppDetails.url}</p>
            <div className="flex items-center pt-2 gap-3">
              <Button
                onClick={() => deleteWebApp(AppDetails.appId)}
                variant={"link"}
                size={"sm"}
                className="flex gap-2 items-center p-0"
              >
                <Trash2 className="h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  Delete App
                </span>
              </Button>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default WebAppHoverMenu;
