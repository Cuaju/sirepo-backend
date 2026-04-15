-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'EDITOR', 'MEMBER', 'TOKEN', 'INSTITUTIONAL');

-- CreateTable
CREATE TABLE "users" (
    "accountId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "usertype" "UserType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("accountId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
