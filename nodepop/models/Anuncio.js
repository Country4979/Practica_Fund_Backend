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

anuncioSchema.statics.lista = function(filtro, skip, limit, sort, fields) {
  const query = Anuncio.find(filtro);
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec();
}

// crear el modelo de anuncio
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// exportar el modelo
module.exports = Anuncio;