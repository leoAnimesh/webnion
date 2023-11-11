import { PrismaClient } from "@prisma/client";
import { PrismaError } from "../utils/PrismaErrorHandler";
const prisma = new PrismaClient();

const createWorkspace = (
  _: any,
  args: { name: string; icon: string }
): Promise<WorkspaceType> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await prisma.workspace.create({
        data: {
          name: args.name,
          icon: args.icon,
        },
      });
      resolve(response);
    } catch (error) {
      reject(PrismaError(error));
    }
  });
};

const getWorkspaces = (): Promise<WorkspaceType[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await prisma.workspace.findMany();
      resolve(response);
    } catch (error) {
      reject(PrismaError(error));
    }
  });
};

const deleteWorkspace = (_: any, args: { workspaceId: number }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await prisma.webapp.deleteMany({
        where: {
          workspaceId: args.workspaceId,
        },
      });
      const response = await prisma.workspace.delete({
        where: {
          id: args.workspaceId,
        },
      });
      resolve(response);
    } catch (error) {
      reject(PrismaError(error));
    }
  });
};

export default {
  createWorkspace,
  getWorkspaces,
  deleteWorkspace,
};
