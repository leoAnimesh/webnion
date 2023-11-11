import { useAppSelector } from "@/redux/hooks";

const useReduxValues = () => {
    const { workspaces, activeWorkspaceIndex } = useAppSelector(state => state.workspace);
    const { apps, activeWebAppId } = useAppSelector(state => state.webApps);

    console.log(apps, activeWebAppId);


    return {
        allWorkspaces: workspaces,
        allApps: apps,
        workspace: workspaces[activeWorkspaceIndex] || { name: '', emoji: '🌐' },
        activeWebAppId: activeWebAppId,
        activeWorkspaceIndex,
        workspaceApps: apps[activeWorkspaceIndex] || [],
    }
}

export default useReduxValues;