var express = require('express');
var router = express.Router();

const Anuncio = require('../models/Anuncio')


       /* if (req.originalUrl.startsWith('/api/')) {
        res.json({ resultado: anuncios });
    } else {
        res.locals.anuncios = anuncios;
        res.render('index');
    }*/

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {

    //Tags list
    res.locals.tags = [
      { name: ['Work','Lifestyle', 'Motor','Mobile']}
    ];

    const anuncios = await Anuncio.find();
    
    res.locals.anuncios = anuncios;
    res.render('index');

  } catch (err) {
    next(err)
  }
});

/* GET querys. */
router.get('/', async (req, res, next) => {
  try {
    // Filters
    const filterByName = req.query.name;
    const filterBySale = req.query.sale;
    const filterByTag = req.query.tag;
    const filterByPrice = req.query.price;

    // Pagination
    const skip = req.query.skip;
    const limit = req.query.limit;

    const sort = req.query.sort;

    
    const filter = {};
    
    if (filterByName) { 
      filter.name = { $regex: filterByName, $options:'i' }; //Obvia mayúsculas y minúsculas y permite búsqueda por palabras
    }
    
    if (filterByPrice) {
      filter.price = filterByPrice
      
    }
    
    if (filterBySale){
      filter.sale = filterBySale;    
    }

    if (filterByTag){
      filter.tag = { $regex: filterByTag, $options:'i' }
    }

    const anuncios = await Anuncio.lista(filter, skip, limit, sort);
    

    res.locals.anuncios = anuncios;
    res.render('index');

  } catch (error) {
    next(error);
  }   
});

//Range price
router.get('/range/:price', async (req, res, next) => {
  try {

    let price = req.params.price;
  
    const anuncios = await Anuncio.price(price);

    res.locals.anuncios = anuncios;
    res.render('index');
  
  } catch (error) {
    next(error)
  }
});


module.exports = router;
