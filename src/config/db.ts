import { PrismaClient } from "@prisma/client";

const prismaCLientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingletonType = ReturnType<typeof prismaCLientSingleton>;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingletonType | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaCLientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
