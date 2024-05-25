const express = require('express');
const router = express.Router();

const { ProductoModel } = require('../models/product.js');


router.get('/allProducts', async (req, res, next) => {

    try {
      const allProducts = await ProductoModel.findAll();
      return res.status(200).json({ productos: allProducts, mensaje: 'success' });

    } catch (error) {
      console.log(error)
      return res.status(500).json({ mensaje: 'No se han podido encontrar productos' });
    }
});


module.exports = router;