-- CreateTable
CREATE TABLE "Album" (
    "id" SERIAL NOT NULL,
    "musica" TEXT NOT NULL,
    "id_spotify" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);
