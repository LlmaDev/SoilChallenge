import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.pivot.deleteMany();
  await prisma.farm.deleteMany();

  const farms = await Promise.all([
    prisma.farm.create({
      data: {
        name: 'Fazenda do Norte',
        pivots: {
          create: [
            {
              name: 'Pivot A1',
              status: 'ON',
              direction: 'forward',
              speed: 3,
              pressure: 2.5,
            },
            {
              name: 'Pivot A2',
              status: 'OFF',
            },
          ],
        },
      },
    }),
    prisma.farm.create({
      data: {
        name: 'Fazenda do Sul',
        pivots: {
          create: [
            {
              name: 'Pivot B1',
              status: 'ON',
              direction: 'reverse',
              speed: 2,
              pressure: 2.0,
            },
          ],
        },
      },
    }),
  ]);

  console.log('Seed finalizado com sucesso:', farms);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
