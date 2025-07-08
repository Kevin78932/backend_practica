// src/controllers/matriculaController.js
import { prisma } from '../prisma/client.js';


export const getMatriculas = async (req, res) => {
  try {
    const matriculas = await prisma.matricula.findMany({
      include: {
        estudiante: true,
        curso: true,
      },
    });
    res.json(matriculas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener matrículas' });
  }
};

export const getMatriculaById = async (req, res) => {
  const { id } = req.params;
  try {
    const matricula = await prisma.matricula.findUnique({
      where: { id: parseInt(id) },
      include: {
        estudiante: true,
        curso: true,
      },
    });
    if (!matricula) return res.status(404).json({ error: 'No encontrada' });
    res.json(matricula);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar matrícula' });
  }
};

export const createMatricula = async (req, res) => {
  const { estudianteId, cursoId } = req.body;
  try {
    const nueva = await prisma.matricula.create({
      data: {
        estudianteId: parseInt(estudianteId),
        cursoId: parseInt(cursoId),
      },
      include: {
        estudiante: true,
        curso: true,
      },
    });
    res.json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear matrícula' });
  }
};

export const updateMatricula = async (req, res) => {
  const { id } = req.params;
  const { estudianteId, cursoId } = req.body;
  try {
    const actualizada = await prisma.matricula.update({
      where: { id: parseInt(id) },
      data: {
        estudianteId: parseInt(estudianteId),
        cursoId: parseInt(cursoId),
      },
      include: {
        estudiante: true,
        curso: true,
      },
    });
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar matrícula' });
  }
};

export const deleteMatricula = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.matricula.delete({ where: { id: parseInt(id) } });
    res.json({ mensaje: 'Matrícula eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar matrícula' });
  }
};
