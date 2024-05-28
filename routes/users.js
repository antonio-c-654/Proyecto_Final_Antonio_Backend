const express = require('express');
const router = express.Router();

const dotenv = require('dotenv')
dotenv.config() // cargar variables de entorno
const bcryptjs = require('bcryptjs')
const { UsuarioModel } = require('../models/user.js');
const enviarMail = require('../services/mailService');
const { crearToken, comprobarToken } = require('../services/tokenService')


router.post('/login', async (req, res, next) => {

  try {
    const { email, password } = req.body;

    const encontrado = await UsuarioModel.findOne({ where: { email } });
    if (!encontrado) {
      return res.status(200).json({ mensaje: 'Usuario no encontrado', estado: 'failed' });
    }

    const comparar_pass = await bcryptjs.compare(password, encontrado.password) // comparar hash

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

    const encontrado = await UsuarioModel.findOne({ where: { email } });
    if (encontrado) {
      return res.status(200).json({ mensaje: 'Este email ya posee una cuenta', estado: 'failed' });
    }

    const password_hashed = await bcryptjs.hash(password, parseInt(process.env.NUM_SALTOS))
    const new_token = crearToken(email)

    await UsuarioModel.create({
      email: email,
      password: password_hashed,
      nombre: nombre,
      foto_perfil: '/profile_img/pfp_1_burger.jpg',
      medallas: 'medal_1',
      isAdmin: false,
      forgotToken: new_token
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
      return res.status(200).json({ mensaje: 'no se ha encontrado el usuario', estado: 'failed' });
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


router.post('/forgotPass', async (req, res, next) => {
  
  try {
    const { destinatario } = req.body;
    
    const encontrado = await UsuarioModel.findOne({ where: { email: destinatario } });
    if (!encontrado) {
      return res.status(200).json({ mensaje: 'Prueba con otro correo', estado: 'failed' });
    }

    console.log('---> Enviando token...')
    let asunto = 'Recuperación contraseña'
    let mensaje = 'Aqui tienes tu token de recuperación:  ' + encontrado.forgotToken
    await enviarMail(destinatario, asunto, mensaje)

    return res.status(200).json({ mensaje: 'Correo enviado!', estado: 'success' });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensaje: 'Error al enviar mail' });
  }
});


router.post('/verifyToken', async (req, res, next) => {
  
  try {
    const { token } = req.body;

    let info_token = comprobarToken(token)
    if(!info_token){
      return res.status(200).json({ mensaje: 'Formato del token no válido', estado: 'failed' });
    }

    const encontrado = await UsuarioModel.findOne({ where: { email: info_token.email } });
    if (!encontrado) {
      return res.status(200).json({ mensaje: 'Token no válido', estado: 'failed' });
    }

    return res.status(200).json({ mensaje: 'Puedes cambiar contraseña!', estado: 'success' });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensaje: 'Error verifyToken' });
  }
});


router.post('/resetPass', async (req, res, next) => {
  
  try {
    const { new_passw, user_mail } = req.body;

    const new_password_hashed = await bcryptjs.hash(new_passw, parseInt(process.env.NUM_SALTOS))

    // cambiar password al usuario
    await UsuarioModel.update(
      { password: new_password_hashed },
      { where: { email: user_mail } }
    )

    return res.status(200).json({ mensaje: 'Contraseña cambiada!', estado: 'success' });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensaje: 'Error resetPass' });
  }
});


module.exports = router;
