const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio')

//Returns a list of ads
router.get('/', async (req, res, next) => {
    try {
      //Tags list
      res.locals.tags = [
        { name: ['Work','Lifestyle', 'Motor','Mobile']}
      ];

      //filters
      const filterByName = req.query.name;
      const filterByPrice = req.query.price;
      const filterBySale = req.query.sale;
      const filterByTag = req.query.tag;
      
      //Pagination
      const skip = req.query.skip;
      const limit = req.query.limit;

      const sort = req.query.sort;
      const fields = req.query.fields;
      
      const filter = {};
      
      if (filterByName) {
        
        filter.name = { $regex: filterByName, $options:'i' }; //Obvia mayúsculas y minúsculas y permite búsqueda por palabras
        //res.render('index', { filterByPrice });
      }
      
      if (filterByPrice) {
        filter.price = filterByPrice
        
        //$lt lower than
        //$gt greater than
        
      }
      
      if (filterBySale){
        filter.sale = filterBySale;
        //res.render('index', { filterBySale });     
      }

      if (filterByTag){
        filter.tag = { $regex: filterByTag, $options:'i' }
        //res.render('index', { filterBysale });
      }

      const anuncios = await Anuncio.lista(filter, skip, limit, sort, fields);
      
      res.locals.anuncios = anuncios; //({ results: anuncios });
      res.render('index');

    } catch (error) {
      next(error);
    }
    
});


// Create an advertisement
router.post('/', async(req, res, next) => {
  try {
    
    const anuncioData = req.body;

    //Creamos una instancia de Anuncio

    const anuncio = new Anuncio(anuncioData);

    //Persistimos en la BD lainstancia creada

    const anuncioPersistido = await anuncio.save();

    res.json ({ result: anuncioPersistido });

  } catch (err) {
    next(err)
  }
})

module.exports = router;