import { useAppSelector } from "@/redux/hooks";

const useReduxValues = () => {
  const { workspaces, activeWorkspaceIndex } = useAppSelector(
    (state) => state.workspace
  );
  const { apps, activeWebAppIndex } = useAppSelector((state) => state.webApps);

  return {
    // workspace values
    allWorkspaces: workspaces,
    workspace: workspaces[activeWorkspaceIndex] || { name: "", icon: "🌐" },
    activeWorkspaceIndex,
    activeWorkSpaceId: workspaces[activeWorkspaceIndex]?.id || 1,
    // web apps values
    allApps: apps,
    activeWebAppIndex: activeWebAppIndex,
    activeWebAppId: apps[activeWebAppIndex]?.appId || 1,
  };
};

export default useReduxValues;
