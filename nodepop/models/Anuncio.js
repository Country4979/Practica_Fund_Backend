const { name } = require('ejs');
const mongoose = require('mongoose');

// definir el esquema de los anuncios
const anuncioSchema = mongoose.Schema({
    name: String,
    venta: Boolean,
    precio: { type: Number, min: 0.1, max: 10000 },
    foto: String,
    tags: [String]
    });

anuncioSchema.statics.lista = function(filtro, skip, limit) {
  const query = Anuncio.find(filtro);
  query.skip(skip);
  query.limit(limit);
  return query.exec();
}

// crear el modelo de anuncio
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// exportar el modelo
module.exports = Anuncio;