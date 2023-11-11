import { useDispatch } from "react-redux";
import useReduxValues from "./useReduxValues";
import { addWorkspace, setActiveWorkspaceIndex } from "@/redux/slices/WorkspaceSlice";
import { addWebApp, removeWebApp, setActiveWebAppId } from "@/redux/slices/webappsSlice";
import { v4 as uuid } from 'uuid'

const useReduxActions = () => {
    const dispatch = useDispatch();
    const { activeWorkspaceIndex } = useReduxValues();

    const changeCurrentWebAppIndex = (id: string) => {
        dispatch(setActiveWebAppId(id))
    }

    const changeCurrentWorkspaceIndex = (index: number) => {
        dispatch(setActiveWorkspaceIndex(index))
    }

    const addNewWorkSpace = (name: string, emoji: string) => {
        dispatch(addWorkspace({ name, emoji }))
    }

    const addNewWebApp = (name: string, url: string) => {
        dispatch(addWebApp({ workspaceIndex: activeWorkspaceIndex, app: { name, baseURL: url, currentURL: url, id: uuid() } }))
    }

    const deleteWebApp = (id: string) => {
        dispatch(removeWebApp({ workspaceIndex: activeWorkspaceIndex, id }))
    }


    return {
        changeCurrentWebAppIndex,
        changeCurrentWorkspaceIndex,
        addNewWorkSpace,
        addNewWebApp,
        deleteWebApp,
    }
}

export default useReduxActions;