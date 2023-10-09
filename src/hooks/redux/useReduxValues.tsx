import { useAppSelector } from "@/redux/hooks";

const useReduxValues = () => {

    const { allApps, allWorkspaces, activeWorkspaceIndex } = useAppSelector(state => state.appstore);
    const { activeApps } = useAppSelector(state => state.webApps);


    return {
        activeWorkspaceIndex,
        allApps,
        apps: allApps[activeWorkspaceIndex],
        allWorkspaces,
        workspace: allWorkspaces[activeWorkspaceIndex],
        activeApps,
        activeAppIndex: allWorkspaces[activeWorkspaceIndex].activeAppIndex,
    }
}

export default useReduxValues;