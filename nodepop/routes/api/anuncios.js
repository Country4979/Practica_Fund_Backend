const express = require('express');
const { schema } = require('../../models/Anuncio');
const router = express.Router();
const Anuncio = require('../../models/Anuncio')

// Returns a list of ads
router.get('/', async (req, res, next) => {
    try {
      //Tags list
      res.locals.tags = [
        { name: ['Work','Lifestyle', 'Motor','Mobile']}
      ];

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
      console.log(anuncios.length);
      res.render('index');

    } catch (error) {
      next(error);
    }   
});

//TODO Search by price

//Exact price
router.get('/:price', async (req, res, next) => {
  try {

    let price = req.params.price;
  
    const anuncios = await Anuncio.price(price);

    res.locals.anuncios = anuncios;
    res.json({results: anuncios});
  
  } catch (error) {
    next(error)
  }
});

//Range price
router.get('/range/:price', async (req, res, next) => {
  try {

    let price = req.params.price;
  
    const anuncios = await Anuncio.priceRange(price);

    res.locals.anuncios = anuncios;
    res.json({results: anuncios});
  
  } catch (error) {
    next(error)
  }
});

// Create an advertisement
router.post('/', async(req, res, next) => {
  try {
    
    const anuncioData = req.body;

    // Create an Ad instance

    const anuncio = new Anuncio(anuncioData);

    // Persist in the DB the created instance

    const anuncioPersistido = await anuncio.save();

    res.json ({ result: anuncioPersistido });
    console.log(`
    Ad created successfully`)

  } catch (err) {
    next(err)
  }
})

module.exports = router;