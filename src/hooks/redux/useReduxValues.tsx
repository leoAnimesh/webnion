import { useAppSelector } from "@/redux/hooks";

const useReduxValues = () => {

    const { workspaces, activeWorkspaceIndex } = useAppSelector(state => state.workspace);
    const apps = useAppSelector(state => state.webApps);

    return {
        allWorkspaces: workspaces,
        allApps: apps,
        workspace: workspaces[activeWorkspaceIndex] || { name: '', emoji: '🌐', activeWebAppIndex: 0 },
        activeWebAppIndex: workspaces[activeWorkspaceIndex]?.activeWebAppIndex || 0,
        activeWorkspaceIndex,
        workspaceApps: apps[activeWorkspaceIndex] || [],
    }
}

export default useReduxValues;