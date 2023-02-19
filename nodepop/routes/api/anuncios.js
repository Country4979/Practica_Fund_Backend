// creamos una instancia de Agente en memoria
const agente = new Anuncio({ name: 'Boli Bic', venta: true, precio: 1, foto: "boliBic.png", tags: ['work']});

anuncios.save((err, anuncioCreado) => {
    if(err) throw err;
    console.log(`Anuncio ${anuncioCreado.name} creado.`)
});