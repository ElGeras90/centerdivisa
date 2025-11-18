const { mysqlConnection, postgresClient, sqlServerPool, postgresPool } = require('./../util/condb');
const encriptarjsong = require('../util/encriptarjson');

exports.consultarPorTipo = async (req, res) => {
    const client = await postgresPool.connect();

    try {
        // 🔓 Desencriptar el contenido recibido
        const request = encriptarjsong.decrypt(req.body.resultado);
        const { tipo_alerta } = request;
        console.log("---------------------------------")
        console.log(request)

        const query = `SELECT * FROM manage_alertas_montos($1::jsonb)`;


        const result = await client.query(query, [JSON.stringify(request)]);
        const response = result.rows[0].manage_alertas_montos;

        // 🔒 Encriptar respuesta
        const encrypted = encriptarjsong.encrypt(JSON.stringify({
            success: true,
            info: response
        }));

        res.status(200).send({ resultado: encrypted });
    } catch (error) {
        console.error('Error en consultarPorTipo:', error);
        const encrypted = encriptarjsong.encrypt(JSON.stringify({
            success: false,
            message: error.message
        }));
        res.status(500).send({ resultado: encrypted });
    } finally {
        client.release();
    }
};


exports.actualizar = async (req, res) => {
        const client = await postgresPool.connect();

    try {
        // 🔓 Desencriptar el cuerpo recibido
        const request = encriptarjsong.decrypt(req.body.resultado);
        console.log("---------------------------------")
        console.log(request)
        const query = `SELECT * FROM manage_alertas_montos($1::jsonb)`;
        const data = {
            option: 2,
            id_alerta: request.id_alerta,
            descripcion: request.descripcion,
            riesgo_asociado: request.riesgo_asociado,
            estatus: request.estatus,
            observaciones: request.observaciones,
            total_fraccionado: request.total_fraccionado,
            reporte_uif: request.reporte_uif,
            fecha_reporte: request.fecha_reporte,
            tipo_reporte: request.tipo_reporte
        };

        const result = await client.query(query, [JSON.stringify(data)]);
        const response = result.rows[0].manage_alertas_montos;

        // 🔒 Encriptar respuesta
        const encrypted = encriptarjsong.encrypt(JSON.stringify({
            success: true,
            info: response
        }));

        res.status(200).send({ resultado: encrypted });
    } catch (error) {
        console.error('Error en actualizar:', error);
        const encrypted = encriptarjsong.encrypt(JSON.stringify({
            success: false,
            message: error.message
        }));
        res.status(500).send({ resultado: encrypted });
    }finally{
              client.release();  
    }
};
