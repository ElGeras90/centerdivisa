'use strict';

const manage = require('./../model/encargadosmodel');

function manage_encargados(req, res) {


    manage.consultapermisos(req.body.user)
        .then(resultado => {
            res.status(200).send({ success: true, resultado: resultado.rows });
        })
        .catch(error => {
            res.status(501).send({ success: false, message: error });

        });

}
function manage_encargado(req, res) {

    manage.encargados_sp(req.body)
        .then(resultado => {
            res.status(200).send({ success: true, resultado: resultado.rows });
        })
        .catch(error => {
            res.status(501).send({ success: false, message: error });

        });

}

function consultadivisa(req, res) {

    manage.consultadivisa(req.body)
        .then(resultado => {
            res.status(200).send({ success: true, resultado: resultado.rows });
        })
        .catch(error => {
            res.status(501).send({ success: false, message: error });

        });

}

module.exports = {
    manage_encargados,
    manage_encargado,
    consultadivisa
};