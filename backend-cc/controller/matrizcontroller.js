'use strict';
const jwt = require('jsonwebtoken');
const crypto = require('crypto-js'); // Importa la biblioteca CryptoJS

const matriz = require('./../model/matrizmodel');
const encriptarjsong = require('./../util/encriptarjson');

function estados(req, res) {
    let resquest = encriptarjsong.decrypt(req.body.resultado,res)


    matriz.estados(resquest)
        .then(info => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));

            res.status(200).send({ resultado: data });
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });
}

function frecuenciames(req, res) {
    let resquest = encriptarjsong.decrypt(req.body.resultado,res)


    matriz.frecuenciames(resquest)
        .then(info => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));

            res.status(200).send({ resultado: data });
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });
}

function instrumento(req, res) {
    let resquest = encriptarjsong.decrypt(req.body.resultado,res)


    matriz.instrumento(resquest)
        .then(info => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));

            res.status(200).send({ resultado: data });
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });
}

function montomes(req, res) {
    let resquest = encriptarjsong.decrypt(req.body.resultado,res)


    matriz.montomes(resquest)
        .then(info => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));

            res.status(200).send({ resultado: data });
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });
}

function ocupacion(req, res) {
    let resquest = encriptarjsong.decrypt(req.body.resultado,res)


    matriz.ocupacion(resquest)
        .then(info => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));

            res.status(200).send({ resultado: data });
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });
}

function paises(req, res) {
    let resquest = encriptarjsong.decrypt(req.body.resultado,res)


    matriz.paises(resquest)
        .then(info => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));

            res.status(200).send({ resultado: data });
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });
}

function paisorigen(req, res) {
    let resquest = encriptarjsong.decrypt(req.body.resultado,res)


    matriz.paisorigen(resquest)
        .then(info => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));

            res.status(200).send({ resultado: data });
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });
}

function productos(req, res) {
    let resquest = encriptarjsong.decrypt(req.body.resultado,res)


    matriz.productos(resquest)
        .then(info => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));

            res.status(200).send({ resultado: data });
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });
}
function tipousuario(req, res) {
    let resquest = encriptarjsong.decrypt(req.body.resultado,res)


    matriz.tipousuario(resquest)
        .then(info => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));

            res.status(200).send({ resultado: data });
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });
}
function alertas(req, res) {
    let resquest = encriptarjsong.decrypt(req.body.resultado,res)


    matriz.alertas(resquest)
        .then(info => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));

            res.status(200).send({ resultado: data });
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });
}
function anonimus(req, res) {
    let resquest = encriptarjsong.decrypt(req.body.resultado,res)


    matriz.anonimus(resquest)
        .then(info => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));

            res.status(200).send({ resultado: data });
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });
}

function cantidad(req, res) {
    let resquest = encriptarjsong.decrypt(req.body.resultado,res)

    console.log('entre')
    matriz.cantidad()
        .then(info => {
            console.log(info.rows)
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows }));

            res.status(200).send({ resultado: data });
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);;

        });
}
module.exports = {
    paisorigen, ocupacion,
    montomes, instrumento,
    frecuenciames, paises,
    tipousuario, estados,
    productos, alertas,
    anonimus, cantidad

};