// src/controllers/estudianteController.js
import { prisma } from '../prisma/client.js';


export const getEstudiantes = async (req, res) => {
  try {
    const estudiantes = await prisma.estudiante.findMany();
    res.json(estudiantes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener estudiantes' });
  }
};

export const getEstudianteById = async (req, res) => {
  const { id } = req.params;
  try {
    const estudiante = await prisma.estudiante.findUnique({
      where: { id: parseInt(id) },
    });
    if (!estudiante) return res.status(404).json({ error: 'No encontrado' });
    res.json(estudiante);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar estudiante' });
  }
};

export const createEstudiante = async (req, res) => {
  const { nombre, email } = req.body;
  try {
    const nuevo = await prisma.estudiante.create({ data: { nombre, email } });
    res.json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear estudiante' });
  }
};

export const updateEstudiante = async (req, res) => {
  const { id } = req.params;
  const { nombre, email } = req.body;
  try {
    const actualizado = await prisma.estudiante.update({
      where: { id: parseInt(id) },
      data: { nombre, email },
    });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar estudiante' });
  }
};

export const deleteEstudiante = async (req, res) => {
  const { id } = req.params;
  const idNum = parseInt(id);

  if (isNaN(idNum)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    await prisma.estudiante.delete({ where: { id: idNum } });
    res.json({ mensaje: 'Estudiante eliminado' });
  } catch (error) {
    console.error('Error al eliminar estudiante:', error);

    if (error.code === 'P2025') {
      // Código Prisma para "registro no encontrado"
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    res.status(500).json({ error: 'Error al eliminar estudiante' });
  }
};

