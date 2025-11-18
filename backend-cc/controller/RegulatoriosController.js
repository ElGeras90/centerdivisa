'use strict';
const fs = require('fs');
const path = require('path');
const { js2xml } = require('xml-js');
const encriptarjsong = require('./../util/encriptarjson');
const {
  reportes24horas,
  operacionesinusuales,
  operacionesrelevantes,
  reportemontos,
  operacionesendolares
} = require('./../model/RegulatorioModel');
const { generarReporteDE1 } = require('../services/generarReporteDE1');
const { generarReporteFD1 } = require('../services/generarReporteFD1');

// ===============================================================
// 📌 Helper general para crear carpeta y guardar XML temporal
// ===============================================================
async function guardarXML(nombreArchivo, contenidoXML) {
  const dir = path.join(__dirname, '../exports');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, nombreArchivo);
  fs.writeFileSync(filePath, contenidoXML, 'utf8');
  return filePath;
}

// ===============================================================
// 1️⃣ Reporte DE1 – Montos (XML descargable)
// ===============================================================
async function generarMontos(req, res) {
  try {
    console.log('📦 Body recibido:', req.body);

    // Generar contenido XML
    const xml = await generarReporteDE1(req.body);
    console.log('📄 XML generado correctamente');

    // Guardar temporalmente
    const filePath = await guardarXML('reporte_DE1.xml', xml);
    console.log('🗂 Archivo guardado en:', filePath);

    // Enviar el archivo para descarga
    res.download(filePath, 'reporte_DE1.xml', (err) => {
      if (err) {
        console.error('❌ Error al descargar:', err);
      } else {
        console.log('✅ Descarga completada, eliminando archivo temporal');
        fs.unlinkSync(filePath);
      }
    });
  } catch (err) {
    console.error('🔥 Error en generarMontos:', err);
    res.status(500).json({ success: false, message: err.message });
  }
}

// ===============================================================
// 2️⃣ Reporte FD1 – Operaciones en dólares (XML descargable)
// ===============================================================
async function generarDolares(req, res) {
  try {
   // let resquest = encriptarjsong.decrypt(req.body.resultado, res);
    console.log(req.body)
    const xml = await generarReporteFD1(req.body);

    // Guardar y descargar
    const filePath = await guardarXML('reporte_FD1.xml', xml);
    res.download(filePath, 'reporte_FD1.xml', (err) => {
      if (!err) fs.unlinkSync(filePath);
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
}

// ===============================================================
// 3️⃣ Reporte de operaciones 24h (JSON cifrado para PLD/FT)
// ===============================================================
async function generarReporte24h(req, res) {
  try {
    const resquest = encriptarjsong.decrypt(req.body.resultado, res);
    const { pid_empresa, pid_sucursal } = resquest;

    const result = await reportes24horas(req.body);
    const data = result.rows[0].reporte_operaciones_24h;

    const response = {
      success: true,
      tipo_reporte: '24h',
      generado: new Date(),
      total_operaciones: data?.operaciones?.length || 0,
      resultado: data
    };

    // Encriptar antes de enviar
    let enc = encriptarjsong.encrypt(JSON.stringify(response));
    res.status(200).send({ resultado: enc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// ===============================================================
// 4️⃣ Reporte de operaciones inusuales (JSON para PLD/FT)
// ===============================================================
async function generarReporteInusuales(req, res) {
  try {
    let resquest = encriptarjsong.decrypt(req.body.resultado)
    const { fecha_inicio, fecha_fin,organo,sujeto,empresa } = resquest;
    const result = await operacionesinusuales(fecha_inicio, fecha_fin,organo,sujeto,empresa);
    const data = result.rows[0].reporte_operaciones_inusuales;

    const payload = {
      tipo_reporte: 'inusuales',
      periodo: { fecha_inicio, fecha_fin },
      total_registros: data?.operaciones?.length || 0,
      datos: data
    };

    let enc = encriptarjsong.encrypt(JSON.stringify(payload));
    res.status(200).json({ resultado: enc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// ===============================================================
// 5️⃣ Reporte de operaciones relevantes (JSON para PLD/FT)
// ===============================================================
async function generarReporteRelevantes(req, res) {
  try {
    let resquest = encriptarjsong.decrypt(req.body.resultado)
    const { fecha_inicio, fecha_fin,organo,sujeto,empresa } = resquest;
    const result = await operacionesrelevantes(fecha_inicio, fecha_fin,organo,sujeto,empresa)
    console.log(result.rows);
    const data = result;

    const payload = {
      tipo_reporte: 'relevantes',
      periodo: { fecha_inicio, fecha_fin },
      total_registros: data?.operaciones?.length || 0,
      datos: data
    };

    let enc = encriptarjsong.encrypt(JSON.stringify(payload));
    res.status(200).json({ resultado: enc });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
  generarMontos,
  generarDolares,
  generarReporte24h,
  generarReporteInusuales,
  generarReporteRelevantes
};
