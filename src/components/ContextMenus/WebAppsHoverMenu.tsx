import { CalendarDays, Pin, Trash2 } from "lucide-react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import React, { ReactNode } from "react"
import { Button } from "../ui/button";
import useReduxValues from "@/hooks/redux/useReduxValues";

interface AppData {
  name: string;
  baseURL: string;
  currentURL: string;
}

const WebAppHoverMenu: React.FC<{ children: ReactNode, AppDetails: AppData }> = ({ children, AppDetails }) => {
  return (
    <HoverCard  >
      <HoverCardTrigger asChild>
        {children}
      </HoverCardTrigger>
      <HoverCardContent side="right" sideOffset={15} className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm text-left font-semibold">@{AppDetails.name}</h4>
            <p className="text-sm">
              URL : {AppDetails.baseURL}
            </p>
            <div className="flex items-center pt-2 gap-3">
              <Button variant={"link"} size={"sm"} className="flex gap-2 items-center p-0" >
                <Trash2 className="h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  Delete App
                </span>
              </Button>
              <Button variant={"link"} size={"sm"} className="flex gap-2 items-center p-0" >
                <Pin className="h-4 w-4 opacity-70" />{" "}
                <span className="text-xs text-muted-foreground">
                  Pin App
                </span>
              </Button>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default WebAppHoverMenu;
