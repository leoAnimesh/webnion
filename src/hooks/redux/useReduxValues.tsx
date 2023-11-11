import { useAppSelector } from "@/redux/hooks";

const useReduxValues = () => {
  const { workspaces, activeWorkspaceIndex } = useAppSelector(
    (state) => state.workspace
  );
  const { apps, activeWebAppIndex } = useAppSelector((state) => state.webApps);

  return {
    allWorkspaces: workspaces,
    allApps: apps,
    workspace: workspaces[activeWorkspaceIndex] || { name: "", emoji: "🌐" },
    activeWebAppIndex: activeWebAppIndex,
    activeWebAppId: apps[activeWebAppIndex]?.appId || 1,
    activeWorkspaceIndex,
    activeWorkSpaceId: workspaces[activeWorkspaceIndex]?.id || 1,
  };
};

export default useReduxValues;
