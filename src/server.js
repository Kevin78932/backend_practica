// src/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import estudianteRoutes from './routes/estudiante.js';
import cursoRoutes from './routes/curso.js';
import matriculaRoutes from './routes/matricula.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/cursos', cursoRoutes);
app.use('/api/matriculas', matriculaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
