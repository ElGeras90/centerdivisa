'use strict';
const jwt = require('jsonwebtoken');

const manage = require('./../model/manageaccesorolmodel');
const token = require('./../util/token');


function manage_acceso_rol(req, res) {

    //const authResult = token.middlewareDeAutenticacion(req, res);

    // Si el middleware devuelve una respuesta, detén el proceso
    //if (authResult) {
    //return;
    //}

     
    manage.manage_acceso_rol(req.body)
        .then(resultado => {
            res.status(200).send({ success: true, resultado: resultado.rows });
        })
        .catch(error => {
            res.status(501).send({ success: false, message: error });

        });

}

function manage_cliente(req, res) {

    //const authResult = token.middlewareDeAutenticacion(req, res);

    // Si el middleware devuelve una respuesta, detén el proceso
    //if (authResult) {
    //return;
    //}

     
    manage.manage_cliente(req.body)
        .then(resultado => {
            res.status(200).send({ success: true, resultado: resultado.rows });
        })
        .catch(error => {
            res.status(501).send({ success: false, message: error });

        });

}

function manage_divisa(req, res) {

    //const authResult = token.middlewareDeAutenticacion(req, res);

    // Si el middleware devuelve una respuesta, detén el proceso
    //if (authResult) {
    //return;
    //}

     
    manage.manage_divisa(req.body)
        .then(resultado => {
            res.status(200).send({ success: true, resultado: resultado.rows });
        })
        .catch(error => {
            res.status(501).send({ success: false, message: error });

        });

}

function manage_empresa(req, res) {

    //const authResult = token.middlewareDeAutenticacion(req, res);

    // Si el middleware devuelve una respuesta, detén el proceso
    //if (authResult) {
    //return;
    //}

     
    manage.manage_empresa(req.body)
        .then(resultado => {
            res.status(200).send({ success: true, resultado: resultado.rows });
        })
        .catch(error => {
            res.status(501).send({ success: false, message: error });

        });

}

function manage_grupo_divisa(req, res) {

    //const authResult = token.middlewareDeAutenticacion(req, res);

    // Si el middleware devuelve una respuesta, detén el proceso
    //if (authResult) {
    //return;
    //}

     
    manage.manage_grupo_divisa(req.body)
        .then(resultado => {
            res.status(200).send({ success: true, resultado: resultado.rows });
        })
        .catch(error => {
            res.status(501).send({ success: false, message: error });

        });

}

function manage_identificacion(req, res) {

    //const authResult = token.middlewareDeAutenticacion(req, res);

    // Si el middleware devuelve una respuesta, detén el proceso
    //if (authResult) {
    //return;
    //}

     
    manage.manage_identificacion(req.body)
        .then(resultado => {
            res.status(200).send({ success: true, resultado: resultado.rows });
        })
        .catch(error => {
            res.status(501).send({ success: false, message: error });

        });

}

function manage_menu(req, res) {

    //const authResult = token.middlewareDeAutenticacion(req, res);

    // Si el middleware devuelve una respuesta, detén el proceso
    //if (authResult) {
    //return;
    //}

     
    manage.manage_menu(req.body)
        .then(resultado => {
            res.status(200).send({ success: true, resultado: resultado.rows });
        })
        .catch(error => {
            res.status(501).send({ success: false, message: error });

        });

}
function manage_nacionalidad(req, res) {

    //const authResult = token.middlewareDeAutenticacion(req, res);

    // Si el middleware devuelve una respuesta, detén el proceso
    //if (authResult) {
    //return;
    //}

    manage.manage_nacionalidad(req.body)
        .then(resultado => {
            res.status(200).send({ success: true, resultado: resultado.rows });
        })
        .catch(error => {
            res.status(501).send({ success: false, message: error });

        });

}
function manage_ocupacion(req, res) {

    //const authResult = token.middlewareDeAutenticacion(req, res);

    // Si el middleware devuelve una respuesta, detén el proceso
    //if (authResult) {
    //return;
    //}

     
    manage.manage_ocupacion(req.body)
        .then(resultado => {
            res.status(200).send({ success: true, resultado: resultado.rows });
        })
        .catch(error => {
            res.status(501).send({ success: false, message: error });

        });

}

function manage_rol(req, res) {

    //const authResult = token.middlewareDeAutenticacion(req, res);

    // Si el middleware devuelve una respuesta, detén el proceso
    //if (authResult) {
    //return;
    //}

     
    manage.manage_rol(req.body)
        .then(resultado => {
            res.status(200).send({ success: true, resultado: resultado.rows });
        })
        .catch(error => {
            res.status(501).send({ success: false, message: error });

        });

}

function manage_sucursal(req, res) {

    //const authResult = token.middlewareDeAutenticacion(req, res);

    // Si el middleware devuelve una respuesta, detén el proceso
    //if (authResult) {
    //return;
    //}

     
    manage.manage_sucursal(req.body)
        .then(resultado => {
            res.status(200).send({ success: true, resultado: resultado.rows });
        })
        .catch(error => {
            res.status(501).send({ success: false, message: error });

        });

}
function manage_user(req, res) {

    //const authResult = token.middlewareDeAutenticacion(req, res);

    // Si el middleware devuelve una respuesta, detén el proceso
    //if (authResult) {
    //return;
    //}

     
    manage.manage_user(req.body)
        .then(resultado => {
            res.status(200).send({ success: true, resultado: resultado.rows });
        })
        .catch(error => {
            res.status(501).send({ success: false, message: error });

        });

}
function manage_cat_reg(req,res){

    manage.manage_cat_reg(req.body)
        .then(resultado =>{
            res.status(200).send({success:true,resultado:resultado.rows})
        })
        .catch(error => {
            res.status(501).send({ success: false, message: error})
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
    manage_cat_reg

};