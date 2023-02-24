const { name } = require('ejs');
const mongoose = require('mongoose');

// definir el esquema de los anuncios
const anuncioSchema = mongoose.Schema({
    name: String,
    sale: Boolean,
    price: { type: Number, min: 0.1, max: 10000 },
    photo: String,
    tag: [String]
    });

anuncioSchema.statics.lista = function(filtro, skip, limit, sort) {
  const query = Anuncio.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  return query.exec();
}

anuncioSchema.statics.priceRange = function(price) {
  const newPrice = price.split('-');
  const price1 = newPrice[0];
  const price2 = newPrice[1];
  const query = Anuncio.find({ price: { $gte: price1, $lte: price2 } });
  return query.exec();
}

anuncioSchema.statics.price = function(price) {
  const newPrice = price;
  const query = Anuncio.find({ price: price });
  return query.exec();
}

anuncioSchema.statics.priceGt = function(price) {
  const newPrice = price.slice(-1);
  const query = Anuncio.find({ price: {'$gte':  price } });
  return query.exec();
}

anuncioSchema.statics.priceLt = function(price) {
  const newPrice = price.slice(0);
  const query = Anuncio.find({ price: {'$lte':  price } });
  return query.exec();
}


// crear el modelo de anuncio
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// exportar el modelo
module.exports = Anuncio;