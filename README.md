# 📝 ToDo App - Gestor de Tareas Full-Stack

Aplicación web full-stack para gestionar tareas con autenticación, persistencia en la nube y despliegue online.  
Creado como parte de mi portafolio para demostrar habilidades en desarrollo web moderno.

## 🌐 Demo en vivo

🔗 [https://todo-app-u1qa.onrender.com](https://todo-app-u1qa.onrender.com)

## ⚙️ Funcionalidades

- Registro e inicio de sesión con JWT
- CRUD de tareas (Crear, Leer, Eliminar)
- Autenticación protegida (solo usuarios logueados pueden ver tareas)
- Conexión a base de datos MongoDB Atlas (cloud)
- Interfaz web simple con HTML, CSS y JavaScript puro
- API RESTful conectada con MongoDB usando Mongoose
- Despliegue en Render (gratis)

## 🛠️ Tecnologías

| Frontend        | Backend               | Base de datos    | DevOps        |
|-----------------|------------------------|------------------|---------------|
| HTML, CSS, JS   | Node.js, Express       | MongoDB Atlas    | Git, Render   |

## 🔐 Seguridad

- Uso de `dotenv` para variables de entorno
- Contraseñas hasheadas con `bcryptjs`
- Tokens JWT almacenados en `localStorage` y enviados en headers

## 📂 Estructura del proyecto
todo-app/
├── client/ # Interfaz web (HTML/JS)
├── server/
│ ├── models/ # Modelos Mongoose
│ ├── routes/ # Rutas de auth y tareas
│ ├── middleware/ # Middleware de autenticación
│ ├── index.js # Servidor Express
│ └── .env # URI de MongoDB (no compartido)

## 📦 Instalación local

1. Clona el repositorio:

bash
git clone https://github.com/LM0nkey/todo-app.git
cd todo-app/server

2. Crea un archivo .env:

MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/todo-app?retryWrites=true&w=majority

3. Instala dependencias:

npm install

4. Inicia el servidor:

node index.js

5. Abre client/index.html en el navegador.

✨ Mejoras futuras    
  Interfaz en React con Tailwind
  
  Validaciones con Joi
  
  Testeo automático con Jest/Supertest
  
  Búsqueda y filtrado de tareas

## 🎯 Objetivo

Este proyecto es parte de mi portafolio como desarrollador. Estoy en búsqueda de mi primera experiencia profesional en el área de la informática. Puedes contactarme por [LinkedIn](https://www.linkedin.com/in/hmluiscarlos/) o revisar mis otros proyectos en [GitHub](https://github.com/LM0nkey).
