import { PrismaClient } from "@prisma/client";
import { PrismaError } from "../utils/PrismaErrorHandler";

const prisma = new PrismaClient();

const createWebApp = (
  _: any,
  args: { name: string; url: string; workspaceId: number }
): Promise<AppData> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await prisma.webapp.create({
        data: {
          name: args.name,
          url: args.url,
          workspaceId: args.workspaceId,
        },
      });

      await prisma.workspace.update({
        where: {
          id: args.workspaceId,
        },
        data: {
          totalApps: {
            increment: 1,
          },
        },
      });

      resolve(response);
    } catch (error) {
      reject(PrismaError(error));
    }
  });
};

const deleteWebApp = (_: any, args: { appId: number; workspaceId: number }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await prisma.webapp.delete({
        where: {
          appId: args.appId,
        },
      });

      await prisma.workspace.update({
        where: {
          id: args.workspaceId,
        },
        data: {
          totalApps: {
            decrement: 1,
          },
        },
      });

      resolve({ success: true });
    } catch (error) {
      reject(PrismaError(error));
    }
  });
};

const getWebApps = (_: any, args: { workspaceId: number }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await prisma.webapp.findMany({
        where: {
          workspaceId: args.workspaceId,
        },
      });

      resolve(response);
    } catch (error) {
      reject(PrismaError(error));
    }
  });
};

export default {
  createWebApp,
  getWebApps,
  deleteWebApp,
};
