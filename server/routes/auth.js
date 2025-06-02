const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 👉 Registro
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Verificar si el usuario ya existe
  const userExists = await User.findOne({ username });
  if (userExists) return res.status(400).json({ message: 'El usuario ya existe' });

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);

  // Crear nuevo usuario
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

// 👉 Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Verificar existencia del usuario
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'Credenciales inválidas' });

  // Comparar contraseñas
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Credenciales inválidas' });

  // Generar token JWT
  const token = jwt.sign({ id: user._id }, 'secreto', { expiresIn: '1h' });

  res.json({ token });
});

module.exports = router;
