import { useDispatch } from "react-redux";
import useReduxValues from "./useReduxValues";
import {
  addWorkspace,
  removeWorkspace,
  setActiveWorkspaceIndex,
  setWorkspace,
  updateTotalWorkspaceApps,
} from "@/redux/slices/WorkspaceSlice";
import {
  addWebApp,
  clearWebApps,
  removeWebApp,
  setActiveWebAppIndex,
  setWebApps,
} from "@/redux/slices/webappsSlice";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "../../components/ui/toast";
import moment from "moment";

const useReduxActions = () => {
  const dispatch = useDispatch();
  const { toast, dismiss } = useToast();
  const { activeWorkSpaceId } = useReduxValues();

  const FormatPrismaError = (error: any) => {
    return error.message.split(":").at(-1).trim();
  };

  const ShowToast = (error: any) => {
    toast({
      title: error,
      description: moment(Date.now()).format("llll"),
      action: (
        <ToastAction
          altText={`${name} name already exist`}
          onClick={() => dismiss()}
        >
          Dismiss
        </ToastAction>
      ),
    });
  };

  const changeCurrentWorkspaceIndex = (index: number) => {
    dispatch(setActiveWorkspaceIndex(index));
  };

  const addNewWorkSpace = async ({
    name,
    icon,
  }: {
    name: string;
    icon: string;
  }) => {
    try {
      const response = await window.electron.sendIpcRequest("createWorkSpace", {
        name: name.toLowerCase(),
        icon,
      });
      dispatch(addWorkspace(response));
    } catch (error: any) {
      ShowToast(FormatPrismaError(error));
    }
  };

  const setAllWorkSpaces = async () => {
    try {
      const response = await window.electron.sendIpcRequest("getWorkspaces");
      dispatch(setWorkspace({ workspaces: response }));
    } catch (error) {
      ShowToast(FormatPrismaError(error));
    }
  };

  const deleteWorkspace = async () => {
    try {
      await window.electron.sendIpcRequest("deleteWorkspace", {
        workspaceId: activeWorkSpaceId,
      });
      dispatch(removeWorkspace({ workspaceId: activeWorkSpaceId }));
      dispatch(clearWebApps());
    } catch (error) {
      ShowToast(FormatPrismaError(error));
    }
  };

  const setAllApps = async () => {
    console.log("all app setted");
    try {
      const response = await window.electron.sendIpcRequest("getWebApps", {
        workspaceId: activeWorkSpaceId,
      });
      dispatch(setWebApps({ apps: response }));
    } catch (error) {
      console.log(error);
      ShowToast(FormatPrismaError(error));
    }
  };

  const changeCurrentWebAppIndex = (index: number) => {
    dispatch(setActiveWebAppIndex(index));
  };

  const addNewWebApp = async (
    name: string,
    url: string,
    workspaceId: number
  ) => {
    try {
      const response = await window.electron.sendIpcRequest("createWebApp", {
        name,
        url,
        workspaceId,
      });
      dispatch(
        addWebApp({
          app: response,
        })
      );
      dispatch(
        updateTotalWorkspaceApps({
          workspaceId: activeWorkSpaceId,
          mode: "increment",
        })
      );
    } catch (error: any) {
      ShowToast(FormatPrismaError(error));
    }
  };

  const deleteWebApp = async (id: number) => {
    try {
      await window.electron.sendIpcRequest("deleteWebApp", {
        appId: id,
        workspaceId: activeWorkSpaceId,
      });
      dispatch(removeWebApp({ id }));
      dispatch(
        updateTotalWorkspaceApps({
          workspaceId: activeWorkSpaceId,
          mode: "decrement",
        })
      );
    } catch (error) {
      ShowToast(FormatPrismaError(error));
    }
  };

  return {
    changeCurrentWebAppIndex,
    changeCurrentWorkspaceIndex,
    addNewWorkSpace,
    addNewWebApp,
    deleteWebApp,
    deleteWorkspace,
    setAllWorkSpaces,
    setAllApps,
  };
};

export default useReduxActions;
