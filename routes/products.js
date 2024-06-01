const express = require('express');
const router = express.Router();

const { ProductoModel } = require('../models/product.js');
const enviarMail = require('../services/mailService');


// Obtener todos los productos
router.get('/allProducts', async (req, res, next) => {

    try {
      const allProducts = await ProductoModel.findAll();
      return res.status(200).json({ productos: allProducts, mensaje: 'success' });

    } catch (error) {
      console.log(error)
      return res.status(500).json({ mensaje: 'No se han podido encontrar productos' });
    }
});


// Enviar factura al correo
router.post('/cart/sendBill', async (req, res, next) => {

  try {
    const { destinatario, direccion, pago_total } = req.body;
    let asunto = 'Resumen de compra'
    let mensaje = 'Gracias por comprar en Arleburger, la factura asciende a ' + pago_total + '€. Se lo enviaremos a la siguiente dirección: ' + direccion

    await enviarMail(destinatario, asunto, mensaje)

    return res.status(200).json({ mensaje: 'success' });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ mensaje: 'Error al enviar la factura' });
  }
});


module.exports = router;