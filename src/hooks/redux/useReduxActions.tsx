import { useDispatch } from "react-redux";
import useReduxValues from "./useReduxValues";
import { addWorkspace, setActiveWebAppIndex, setActiveWorkspaceIndex } from "@/redux/slices/WorkspaceSlice";
import { addWebApp } from "@/redux/slices/webappSlice";
import { v4 as uuid } from 'uuid'

const useReduxActions = () => {
    const dispatch = useDispatch();
    const { activeWorkspaceIndex } = useReduxValues();

    const changeCurrentWebAppIndex = (index: number) => {
        dispatch(setActiveWebAppIndex({ index }))
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


    return {
        changeCurrentWebAppIndex,
        changeCurrentWorkspaceIndex,
        addNewWorkSpace,
        addNewWebApp
    }
}

export default useReduxActions;