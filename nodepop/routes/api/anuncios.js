const express = require('express');
const router = express.Router();
const Anuncio = require('../../models/Anuncio')

//Devuelve una lista de anuncios
router.get('/', async (req, res, next) => {
    try {
      
      //filters
      const filterByName = req.query.name;
      const filterByPrice = req.query.price;
      const filterByVenta = req.query.venta;
      
      //Pagination
      const skip = req.query.skip;
      const limit = req.query.limit;
      
      
      const filter = {};
      
      if (filterByName) {
        
        filter.name = filterByName;

      }
      
      if (filterByPrice) {
        filter.price = filterByPrice;
      }
      
      if (filterByVenta){
        filter.venta = filterByVenta;     
      }

      const anuncios = await Anuncio.lista(filter, skip, limit);
      
      res.json({ results: anuncios });
      

    } catch (error) {
      next(error);
    }
    
});


// Crear un anuncio

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