const mongoose = require('mongoose');

// definir el esquema de los anuncios
const anuncioSchema = mongoose.Schema({
    name: String,
    venta: Boolean,
    precio: Number,
    foto: String,
    tags: [String]
    });

/*anuncioSchema.statics.lista = function(filtro, skip, limit, sort, fields) {
  const query = Agente.find(filtro); // thenables
  query.skip(skip);
  query.limit(limit);
  query.sort(sort);
  query.select(fields);
  return query.exec();
}*/

// crear el modelo de anuncio
const Anuncio = mongoose.model('Anuncio', anuncioSchema);

// exportar el modelo
module.exports = Anuncio;