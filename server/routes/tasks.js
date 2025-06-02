const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Obtener tareas del usuario logueado
router.get('/', async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

// Crear tarea nueva
router.post('/', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    userId: req.user.id
  });
  await task.save();
  res.status(201).json(task);
});

// Eliminar tarea
router.delete('/:id', async (req, res) => {
  await Task.deleteOne({ _id: req.params.id, userId: req.user.id });
  res.status(204).send();
});

module.exports = router;
