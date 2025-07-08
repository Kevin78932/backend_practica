// src/controllers/cursoController.js
import { prisma } from '../prisma/client.js';

export const getCursos = async (req, res) => {
  try {
    const cursos = await prisma.curso.findMany();
    res.json(cursos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener cursos' });
  }
};

export const getCursoById = async (req, res) => {
  const { id } = req.params;
  try {
    const curso = await prisma.curso.findUnique({
      where: { id: parseInt(id) },
    });
    if (!curso) return res.status(404).json({ error: 'No encontrado' });
    res.json(curso);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar curso' });
  }
};

export const createCurso = async (req, res) => {
  const { titulo, descripcion } = req.body;
  try {
    const nuevo = await prisma.curso.create({ data: { titulo, descripcion } });
    res.json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear curso' });
  }
};

export const updateCurso = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion } = req.body;
  try {
    const actualizado = await prisma.curso.update({
      where: { id: parseInt(id) },
      data: { titulo, descripcion },
    });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar curso' });
  }
};

export const deleteCurso = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.curso.delete({ where: { id: parseInt(id) } });
    res.json({ mensaje: 'Curso eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar curso' });
  }
};
