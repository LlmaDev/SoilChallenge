-- CreateTable
CREATE TABLE "Farm" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pivot" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "direction" TEXT,
    "speed" DOUBLE PRECISION,
    "pressure" DOUBLE PRECISION,
    "farmId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pivot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PivotStatusHistory" (
    "id" SERIAL NOT NULL,
    "pivotId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "direction" TEXT,
    "speed" DOUBLE PRECISION,
    "pressure" DOUBLE PRECISION,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PivotStatusHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pivot" ADD CONSTRAINT "Pivot_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PivotStatusHistory" ADD CONSTRAINT "PivotStatusHistory_pivotId_fkey" FOREIGN KEY ("pivotId") REFERENCES "Pivot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
