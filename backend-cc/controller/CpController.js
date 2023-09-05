'use strict';
const jwt = require('jsonwebtoken');
const token = require('./../util/token');

const cp = require('./../model/cpmodel');

function codigopostal(req, res) {

    cp.consultacp(req.body.cp)
      .then(info => {
        res.status(200).send({ success: true, info:info.rows[0].search_by_cp });
      })
      .catch(error => {
        res.status(501).send({ success: false, message: error });
  
      });
  }
  function codigopostalid(req, res) {
   
  
        cp.consultacpid(req.body.cp)
          .then(info => {
            res.status(200).send({ success: true, info:info.rows[0].search_by_cp_id });
          })
          .catch(error => {
            res.status(501).send({ success: false, message: error });
      
          });
      }
  module.exports = {

    codigopostal,
    codigopostalid

  };