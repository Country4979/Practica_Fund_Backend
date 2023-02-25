'use strict';

const webApi = function (req, res) {
    if (req.originalUrl.startsWith('/api/')) {
        res.json({ resultado: anuncios });
    } else {
        res.locals.anuncios = anuncios;
        res.render('index');
    }
};