import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import useWebActions from "@/hooks/useWebActions";
import React, { ReactNode } from "react";

const ContextMenuWraaper: React.FC<{ children: ReactNode; triggerRef: any, webViewRef: any, bgColor: string }> = ({ children, triggerRef, webViewRef, bgColor }) => {
    const webActions = useWebActions({ webViewRef });

    return (
        <ContextMenu>
            <ContextMenuTrigger ref={triggerRef} className={`flex flex-1 ${bgColor}`} >
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent className="w-64">
                <ContextMenuItem inset disabled={!webActions.canGoBack()} onClick={webActions.goBack}>
                    Back
                    <ContextMenuShortcut>⌘[</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem inset onClick={webActions.reload} >
                    Reload
                    <ContextMenuShortcut>⌘R</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem inset onClick={webActions.reload} >
                    Add as webapp
                </ContextMenuItem>
                <ContextMenuSub>
                    <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-48">
                        <ContextMenuItem onClick={webActions.openDevTools} >Developer Tools</ContextMenuItem>
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem inset onClick={webActions.copy} >
                    Copy
                    <ContextMenuShortcut>⌘C</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem inset onClick={webActions.paste} >
                    Paste
                    <ContextMenuShortcut>⌘P</ContextMenuShortcut>
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu >
    )
}

export default ContextMenuWraaper;