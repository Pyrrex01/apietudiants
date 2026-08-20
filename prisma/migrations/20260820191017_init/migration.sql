-- CreateTable
CREATE TABLE "Etudiant" (
    "id" SERIAL NOT NULL,
    "nomEtudiant" TEXT NOT NULL,
    "prenomEtudiant" TEXT NOT NULL,
    "ageEtudiant" INTEGER NOT NULL,
    "filiereEtudiant" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Etudiant_pkey" PRIMARY KEY ("id")
);
