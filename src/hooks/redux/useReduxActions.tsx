import { addDefaultAddAppToWorkspace, addWebAppToWorkspace, addWorkspace, switchWorkspace, changeActiveAppIndex } from "@/redux/slices/AppStoreSlice";
import { addToActiveApps, loadActiveWebApp } from "@/redux/slices/webAppsSlice";
import { useDispatch } from "react-redux";
import useReduxValues from "./useReduxValues";

const useReduxActions = () => {
    const dispatch = useDispatch();
    const { apps, activeAppIndex, allWorkspaces } = useReduxValues();

    const MountToActiveApps = () => {
        dispatch(addToActiveApps({ index: activeAppIndex, webApp: apps[activeAppIndex] }));
    }

    const loadCurrentActiveeWebApp = () => {
        dispatch(loadActiveWebApp({ app: apps[activeAppIndex], activeIndex: activeAppIndex }))
    }

    const AddWebAppToWorkspace = (name: string, url: string) => {
        dispatch(addWebAppToWorkspace({ name, url }))
    }

    const changeActiveWebAppIndex = (index: number) => {
        dispatch(changeActiveAppIndex({ currentIndex: index }));
    }

    const changeWorkSpace = (index: number) => {
        dispatch(switchWorkspace(index))
    }

    const AddNewWorkspace = (name: string, emoji: string) => {
        dispatch(addDefaultAddAppToWorkspace({ workspaceIndex: allWorkspaces.length }))
        dispatch(addWorkspace({ name, emoji }))
    }

    return {
        changeActiveWebAppIndex,
        AddWebAppToWorkspace,
        loadCurrentActiveeWebApp,
        MountToActiveApps,
        changeWorkSpace,
        AddNewWorkspace
    }
}

export default useReduxActions;