'use strict';

const Anuncio = require('../models/Anuncios');
const connection = require('../lib/connectMongoose');
const anunciosIniciales = require('../routes/api/anuncios_json')

main().catch(err => console.log('Hubo un error: ', err));

async function main() {

  // inicializamos colección de anuncios
  await initAnuncios();

  connection.close();

}

async function initAnuncios() {
  // borrar todos los documentos de la colección de anuncios
  const deleted = await Anuncio.deleteMany();
  console.log(`Eliminados ${deleted.deletedCount} anuncios.`);

  // crear anuncios iniciales
  const inserted = await Anuncio.insertMany([anunciosIniciales]);
  
  console.log(`Creados ${inserted.length} anuncios`);
}
