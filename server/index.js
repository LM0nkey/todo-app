const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
const path = require('path');

// Middleware base
app.use(cors());
app.use(express.json());


require('dotenv').config();
console.log("MONGO_URI:", process.env.MONGO_URI);


// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error al conectar:", err));


// Importar rutas
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const authMiddleware = require('./middleware/authMiddleware');
const clientRoutes = require('./routes/clients');

// Rutas públicas
app.use('/api/auth', authRoutes);


// Rutas protegidas (requieren login)
app.use('/api/tasks', authMiddleware, taskRoutes);

// Servir archivos estáticos desde /client
app.use(express.static(path.join(__dirname, '../client')));
// Redireccionar cualquier ruta desconocida al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

