'use strict';
const jwt = require('jsonwebtoken');

const manage = require('./../model/manageaccesorolmodel');
const encriptarjsong = require('./../util/encriptarjson');

function manage_acceso_rol(req, res) {

    let resquest = encriptarjsong.decrypt(req.body.resultado)
    manage.manage_acceso_rol(resquest)
        .then(resultado => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, resultado: resultado.rows }));

            res.status(200).send({resultado:data});
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });

}

function manage_cliente(req, res) {
    let resquest = encriptarjsong.decrypt(req.body.resultado)

    manage.manage_cliente(resquest)
        .then(resultado => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, resultado: resultado.rows }));

            res.status(200).send({resultado:data});
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });

}

function manage_divisa(req, res) {

    let resquest = encriptarjsong.decrypt(req.body.resultado)

    manage.manage_divisa(resquest)
        .then(resultado => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, resultado: resultado.rows }));

            res.status(200).send({resultado:data});
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });

}

function manage_empresa(req, res) {

    let resquest = encriptarjsong.decrypt(req.body.resultado)

    manage.manage_empresa(resquest)
        .then(resultado => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, resultado: resultado.rows }));

            res.status(200).send({resultado:data});
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });

}

function manage_grupo_divisa(req, res) {

    let resquest = encriptarjsong.decrypt(req.body.resultado)

    manage.manage_grupo_divisa(resquest)
        .then(resultado => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, resultado: resultado.rows }));

            res.status(200).send({resultado:data});
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });

}

function manage_identificacion(req, res) {

    let resquest = encriptarjsong.decrypt(req.body.resultado)

    manage.manage_identificacion(resquest)
        .then(resultado => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, resultado: resultado.rows }));

            res.status(200).send({resultado:data});
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });

}

function manage_menu(req, res) {

    let resquest = encriptarjsong.decrypt(req.body.resultado)

    manage.manage_menu(resquest)
        .then(resultado => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, resultado: resultado.rows }));

            res.status(200).send({resultado:data});
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });

}
function manage_nacionalidad(req, res) {

    let resquest = encriptarjsong.decrypt(req.body.resultado)


    manage.manage_nacionalidad(resquest)
        .then(resultado => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, resultado: resultado.rows }));

            res.status(200).send({resultado:data});
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });

}
function manage_ocupacion(req, res) {

    let resquest = encriptarjsong.decrypt(req.body.resultado)


    manage.manage_ocupacion(resquest)
        .then(resultado => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, resultado: resultado.rows }));

            res.status(200).send({resultado:data});
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });

}

function manage_rol(req, res) {

    let resquest = encriptarjsong.decrypt(req.body.resultado)


    manage.manage_rol(resquest)
        .then(resultado => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, resultado: resultado.rows }));

            res.status(200).send({resultado:data});
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });

}

function manage_sucursal(req, res) {

    let resquest = encriptarjsong.decrypt(req.body.resultado)


    manage.manage_sucursal(resquest)
        .then(resultado => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, resultado: resultado.rows }));

            res.status(200).send({resultado:data});
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });

}
function manage_user(req, res) {

    let resquest = encriptarjsong.decrypt(req.body.resultado)

    manage.manage_user(resquest)
        .then(resultado => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, resultado: resultado.rows }));

            res.status(200).send({resultado:data});
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });

}
function manage_cat_reg(req, res) {
    let resquest = encriptarjsong.decrypt(req.body.resultado)

    manage.manage_cat_reg(resquest)
        .then(resultado => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, resultado: resultado.rows }));

            res.status(200).send({resultado:data});        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);
        })
}

function manage_cliente_empresa(req, res) {
    let resquest = encriptarjsong.decrypt(req.body.resultado)

    manage.manage_cliente_empresa(resquest)
        .then(resultado => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, resultado:  resultado.rows[0].manage_cliente_empresa }));

            res.status(200).send({resultado:data});
         })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);
        })
}

function dll(req, res) {
    let resquest = encriptarjsong.decrypt(req.body.resultado)

    manage.dll(resquest)
        .then(resultado => {
            res.status(200).send({ success: true, resultado:  resultado.rows[0].valida_saldo_dia })
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, resultado:  resultado.rows[0].valida_saldo_dia }));

            res.status(200).send({resultado:data});
         })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);
        })
}

module.exports = {
    manage_acceso_rol,
    manage_cliente,
    manage_divisa,
    manage_empresa,
    manage_grupo_divisa,
    manage_identificacion,
    manage_menu,
    manage_nacionalidad,
    manage_ocupacion,
    manage_rol,
    manage_sucursal,
    manage_user,
    manage_cat_reg,
    manage_cliente_empresa,
    dll

};