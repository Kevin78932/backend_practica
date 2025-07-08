// prisma/seed.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 👉 Crear estudiantes
  const estudiante1 = await prisma.estudiante.create({
    data: {
      nombre: 'Kevin Soto',
      email: 'kevin@example.com',
    },
  });

  const estudiante2 = await prisma.estudiante.create({
    data: {
      nombre: 'Laura Rivera',
      email: 'laura@example.com',
    },
  });

  // 👉 Crear cursos
  const curso1 = await prisma.curso.create({
    data: {
      titulo: 'JavaScript Básico',
      descripcion: 'Aprende los fundamentos de JS',
    },
  });

  const curso2 = await prisma.curso.create({
    data: {
      titulo: 'Node.js Avanzado',
      descripcion: 'Curso para backend con Express y Prisma',
    },
  });

  // 👉 Crear matrículas
  await prisma.matricula.createMany({
    data: [
      {
        estudianteId: estudiante1.id,
        cursoId: curso1.id,
      },
      {
        estudianteId: estudiante1.id,
        cursoId: curso2.id,
      },
      {
        estudianteId: estudiante2.id,
        cursoId: curso1.id,
      },
    ],
  });

  console.log('✅ Datos insertados correctamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
