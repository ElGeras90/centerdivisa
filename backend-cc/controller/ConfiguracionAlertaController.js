'use strict';

const encriptarjsong = require('./../util/encriptarjson');
const configuracion = require('./../model/ConfiguracionAlertas')


function confi(req, res) {
  let resquest = encriptarjsong.decrypt(req.body.resultado)
  //let resquest = req.body;
  configuracion.configalertas(resquest)
    .then(info => {
      let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows[0].reporte_cpd }));
      //let data = { success: true, info: info.rows }
      //console.log(info)
      res.status(200).send({ resultado: data });
    })
    .catch(error => {
      res.status(501).send({ success: false, message: error });

    });
}
module.exports = {
  confi
};