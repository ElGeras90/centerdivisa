'use strict';

const { request } = require('express');
const rg = require('./../model/RegulatorioModel');
const encriptarjsong = require('./../util/encriptarjson');
const { js2xml } = require('xml-js');
const path = require('path'); // Importa el módulo 'path'
const fs = require('fs');


function mt(req, res) {
    let resquest = req.body//encriptarjsong.decrypt(req.body.resultado)

    console.log(req.body)

    rg.mt(resquest)
        .then(async info => {
            console.log( info.rows[0].rep_reg_monto_totales)
            try {
                const operacion = await transformData(info.rows[0].rep_reg_monto_totales.reporte.operacion)
                const json ={
                    reporte: {
                        trimestre_reportado: info.rows[0].rep_reg_monto_totales.reporte.trimestre_reportado,
                        clave_organo_supervisor: info.rows[0].rep_reg_monto_totales.reporte.clave_organo_supervisor,
                        clave_sujeto: info.rows[0].rep_reg_monto_totales.reporte.clave_sujeto,
                        codigo_postal:info.rows[0].rep_reg_monto_totales.reporte.codigo_postal,
                        operacion: operacion
            }
                }
                console.log(json)
                const xml = js2xml(json, { compact: true, ignoreComment: true, spaces: 4 });
                const filePath = path.join(__dirname, 'report.xml');

                // Escribir el XML en un archivo temporal
                fs.writeFileSync(filePath, xml);

                // Enviar el archivo como una descarga
                res.download(filePath, 'report.xml', (err) => {
                    if (err) {
                        console.error('Error sending file:', err);
                        res.status(500).send('Error sending file');
                    } else {
                        // Eliminar el archivo temporal después de enviarlo
                        fs.unlinkSync(filePath);
                    }
                });
            } catch (error) {
                res.status(500).send(error.toString());
            }

        })
        .catch(error => {
            res.status(501).send({ success: false, message: error });

        });
}
function transformData(data) {
    return data.map(entry => ({
        "moneda": entry.moneda,
        "numero_operaciones_compra": entry.numero_operaciones_compra.toString(),
        "monto_compra": entry.monto_compra.toFixed(2),
        "numero_operaciones_venta": entry.numero_operaciones_venta.toString(),
        "monto_venta": entry.monto_venta.toString()
    }));
}


module.exports = {
    mt

};