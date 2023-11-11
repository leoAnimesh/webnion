export const PrismaError = (error: any) => {
  if (error.code === "P2002") {
    return `Duplicate '${error?.meta?.target[0]}' entry`;
  }
};
