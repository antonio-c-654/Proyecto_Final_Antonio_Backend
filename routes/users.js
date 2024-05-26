const express = require('express');
const router = express.Router();

const dotenv = require('dotenv')
dotenv.config() // cargar variables de entorno
const bcryptjs = require('bcryptjs')
const { UsuarioModel } = require('../models/user.js');


router.post('/login', async (req, res, next) => {

  try {
    const { email, password } = req.body;
    // console.log('datos--->', email, password)

    const encontrado = await UsuarioModel.findOne({ where: { email } });
    if (!encontrado) {
      return res.status(200).json({ mensaje: 'Usuario no encontrado', estado: 'failed' });
    }

    const comparar_pass = await bcryptjs.compare(password, encontrado.password) // comparar hash
    // console.log(encontrado.email, ':', comparar_pass)
    if (comparar_pass) {
      return res.status(200).json({ mensaje: 'Inicio de sesión correcto', user: encontrado, estado: 'success' });
    } else {
      return res.status(200).json({ mensaje: 'Contraseña no coincide', estado: 'failed' });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensaje: 'Error en inicio de sesión' });
  }
});

router.post('/register', async (req, res, next) => {
  
  try {
    const { email, password, nombre } = req.body;
    // console.log('datos--->', email, password)

    const encontrado = await UsuarioModel.findOne({ where: { email } });
    if (encontrado) {
      return res.status(200).json({ mensaje: 'Este email ya posee una cuenta', estado: 'failed' });
    }

    const password_hashed = await bcryptjs.hash(password, parseInt(process.env.NUM_SALTOS))

    await UsuarioModel.create({
      email: email,
      password: password_hashed,
      nombre: nombre,
      foto_perfil: '/profile_img/pfp_1_burger.jpg',
      medallas: 'medal_1',
      isAdmin: false
    });

    return res.status(200).json({ mensaje: 'Usuario creado', estado: 'success' });
    
  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensaje: 'Error en registro' });
  }
});

router.put('/perfil/settings', async (req, res, next) => {
  
  try {
    const { id, pfp_actual, password } = req.body;

    const encontrado = await UsuarioModel.findOne({ where: { id } });
    if (!encontrado) {
      return res.status(200).json({ mensaje: 'no se ha encontrado el usuario [settings]', estado: 'failed' });
    }

    // si hay nueva contraseña la cambia
    if (password != null) {
      await UsuarioModel.update({ password }, { where: { id } })
    }
    // actualizar la foto
    await UsuarioModel.update({ foto_perfil: pfp_actual }, { where: { id } });

    return res.status(200).json({ mensaje: 'Ajustes actualizados', estado: 'success' });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensaje: 'Error en ajustes' });
  }
});

module.exports = router;
