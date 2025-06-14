const express = require('express');
const router = express.Router();

const Client = require('../models/Client');

//POST :  Crear Cliente
router.post('/', async (req, res) => {
    try{
        const {name, email, company, phone} = req.body;
        const newClient = new Client({name, email, company, phone});
        await newClient.save();
        re.status(201).json(newClient);
    } catch (err){
        res.status(500).json({message: 'Error al crear cliente'});
    }
});