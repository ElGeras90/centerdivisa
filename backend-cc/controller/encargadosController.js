'use strict';

const manage = require('./../model/encargadosmodel');
const encriptarjsong = require('./../util/encriptarjson');

function manage_encargados(req, res) {

    let resquest = encriptarjsong.decrypt(req.body.resultado,res)

    manage.consultapermisos(resquest.user)
        .then(resultado => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, resultado: resultado.rows }));

            res.status(200).send({resultado:data});
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);
        });

}
function manage_encargado(req, res) {
    let resquest = encriptarjsong.decrypt(req.body.resultado,res)


    manage.encargados_sp(resquest)
        .then(resultado => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, resultado: resultado.rows }));

            res.status(200).send({resultado:data});
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);
        });

}

function consultadivisa(req, res) {
    let resquest = encriptarjsong.decrypt(req.body.resultado,res)


    manage.consultadivisa(resquest)
        .then(resultado => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, resultado: resultado.rows }));

            res.status(200).send({resultado:data});
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);
        });

}

module.exports = {
    manage_encargados,
    manage_encargado,
    consultadivisa
};