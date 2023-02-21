var express = require('express');
var router = express.Router();

const Anuncio = require('../models/Anuncio')

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {


    //Tags list
    res.locals.tags = [
      { name: 'Work' },
      { name: 'Lifestyle' },
      { name: 'Motor' },
      { name: 'Mobile' },
    ];


    const anuncios = await Anuncio.find();
    res.locals.anuncios = anuncios;

    res.render('index');
    
  } catch (err) {
    next(err)
  }
});

module.exports = router;
