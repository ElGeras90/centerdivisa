// generarFD1.js
const fs = require('fs');
const path = require('path');
const { create } = require('xmlbuilder2');
const validator = require('xsd-schema-validator');
const { postgresPool } = require('../util/condb');

// Limpia texto: mayúsculas, sin acentos ni caracteres inválidos
function limpiarTexto(texto) {
  if (!texto) return '';
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // quita acentos
    .replace(/[^A-Za-z0-9ÁÉÍÓÚÑáéíóúñ .,/-]/g, '') // solo caracteres válidos
    .toUpperCase()
    .trim();
}

async function generarReporteFD1(params, formato = 'descargar') {
  const {
    pid_empresa,
    p_trimestre,
    p_clave_organo,
    p_clave_sujeto,
    p_fecha_inicio,
    p_fecha_fin
  } = params;

  const client = await postgresPool.connect();

  try {
    console.log(`🟡 Generando FD1 empresa=${pid_empresa} del ${p_fecha_inicio} al ${p_fecha_fin}`);

    const query = `
      SELECT 
          m.idmovimiento,
          m.fecharegistro,
          m.tipo,
          m.mn,
          m.me,
          m.tipocambio,
          c.nombre,
          c.paterno,
          c.materno,
          c.fechanacimiento,
          cp.iso2 AS pais_nacimiento,
          cp.iso2 AS pais_nacionalidad,
          co.claveof AS actividad_economica,
          CASE WHEN c.idcp = 0 THEN c.colonia ELSE cr.colonia END as colonia,
          c.calle,
          c.nient AS numero,
          CASE WHEN c.idcp = 0 THEN c.cp ELSE cr.cp END AS cp,
          CASE WHEN c.idcp = 0 THEN c.municipio ELSE cr.municipio END AS ciudad,
          CASE WHEN c.idcp = 0 THEN c.municipio ELSE cr.municipio END AS municipio,
          CASE WHEN c.idcp = 0 THEN 1 ELSE cr.idestado END AS entidad,
          cd.cp AS sucursal_cp
      FROM mov_divisas m
      JOIN cliente c ON c.idcliente = m.clienteid
      JOIN grupodivisa g ON g.idgrupo = m.grupoid
      JOIN sucursales s ON s.sucursalid = m.sucursalid
      JOIN cat_pais cp ON c.idpnaci = cp.idpais
      JOIN cat_nacionalidad cn ON cn.idnaci = c.nacionalidad
      JOIN cat_ocupaciones co ON co.idacividad = c.ocupacion
      JOIN cat_dom cd ON cd.id = s.idcp
      LEFT JOIN cat_dom cr ON cr.id = c.idcp
      WHERE g.tipo ILIKE '%USD%'
        AND s.empresaid = $1
        AND m.fecharegistro::date BETWEEN $2 AND $3
      ORDER BY m.fecharegistro;
    `;

    const result = await client.query(query, [pid_empresa, p_fecha_inicio, p_fecha_fin]);
    if (result.rows.length === 0) throw new Error('No se encontraron operaciones en USD.');

    // Crear raíz XML
    const root = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('reporte', {
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        'xsi:schemaLocation': 'http://www.uif.shcp.gob.mx/recepcion/fd1 fd1.xsd',
        xmlns: 'http://www.uif.shcp.gob.mx/recepcion/fd1'
      })
      .ele('trimestre_reportado').txt(p_trimestre).up()
      .ele('sujeto_obligado')
      .ele('clave_organo_regulador').txt(p_clave_organo).up()
      .ele('clave_sujeto_obligado').txt(p_clave_sujeto).up()
      .up()
      .ele('operaciones');

    // Generar cada operación
    for (const r of result.rows) {
      const op = root.ele('operacion');
      const folio = `${new Date().getFullYear()}-${String(r.idmovimiento).padStart(5, '0')}`;

      op.ele('folio_consecutivo').txt(folio).up();
      op.ele('fecha_hora').txt(r.fecharegistro.toISOString().replace(/[-T:.Z]/g, '').slice(0, 14)).up();

      const tipoOperacion = r.tipo === 1 ? '01' : '02';
      op.ele('tipo_operacion').txt(tipoOperacion).up();

      op.ele('cuenta_contrato').txt(r.idmovimiento).up();
      op.ele('monto_operacion').txt(Number(r.me).toFixed(2)).up();
      op.ele('moneda').txt('USD').up();
      op.ele('instrumento_monetario').txt('01').up();

      const liq = op.ele('liquidacion');
      liq.ele('cuenta_contrato_liquidacion').txt(r.idmovimiento).up();
      liq.ele('monto_operacion_liquidacion').txt(Number(r.mn).toFixed(2)).up();
      liq.ele('moneda_liquidacion').txt('MXN').up();
      liq.ele('instrumento_monetario_liquidacion').txt('01').up();
      liq.up();

      const suc = op.ele('sucursal_ubicacion');
      if (r.sucursal_cp) suc.ele('codigo_postal').txt(r.sucursal_cp).up();
      suc.up();

      const persona = op.ele('persona_reportada');
      const cliente = persona.ele('persona').ele('cliente').ele('tipo_persona').ele('persona_fisica');
      cliente.ele('nombre').txt(limpiarTexto(r.nombre)).up();
      cliente.ele('apellido_paterno').txt(limpiarTexto(r.paterno)).up();
      if (r.materno) cliente.ele('apellido_materno').txt(limpiarTexto(r.materno)).up();
      cliente.ele('fecha_nacimiento').txt(r.fechanacimiento.toISOString().slice(0, 10).replace(/-/g, '')).up();
      cliente.ele('pais_nacimiento').txt(limpiarTexto(r.pais_nacimiento)).up();
      cliente.ele('pais_nacionalidad').txt(limpiarTexto(r.pais_nacionalidad)).up();
      cliente.ele('actividad_economica').txt(limpiarTexto(r.actividad_economica)).up();
      cliente.up().up().up();

      const dom = persona.ele('domicilio').ele('nacional');

      if (r.entidad)
        dom.ele('entidad_federativa').txt(String(r.entidad).padStart(2, '0')).up();

      const cpValido = /^\d{5}$/.test(r.cp) ? r.cp : '00000';
      dom.ele('codigo_postal').txt(cpValido).up();

      if (r.ciudad)
        dom.ele('ciudad_poblacion').txt(limpiarTexto(r.ciudad, 40)).up();

      if (r.municipio)
        dom.ele('delegacion_municipio').txt(limpiarTexto(r.municipio, 40)).up();

      if (r.colonia)
        dom.ele('colonia').txt(limpiarTexto(r.colonia)).up();

      if (r.calle)
        dom.ele('calle').txt(limpiarTexto(r.calle)).up();

      if (r.numero)
        dom.ele('numero_exterior').txt(limpiarTexto(r.numero, 10)).up();

      dom.up().up().up();
    }
    const fechaActual = new Date();
    const anio = fechaActual.getFullYear();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaActual.getDate()).padStart(2, '0');
    const consecutivo = "01";
    const xml = root.end({ prettyPrint: true });
    const nombreArchivo = `FD1_${p_clave_sujeto}_${anio}${mes}${dia}_${consecutivo}.FD1`;

    const outPath = path.join(__dirname, `../exports/${nombreArchivo}`);
    fs.writeFileSync(outPath, xml, 'utf8');

    if (formato === 'base64') {
      return Buffer.from(xml).toString('base64');
    } else if (formato === 'texto') {
      return xml;
    } else {
      return outPath;
    }
  } catch (err) {
    console.error('❌ Error en FD1:', err);
    if (Array.isArray(err)) {
      console.error('Detalles:', err.join('\n'));
    }
    throw err;
  } finally {
    client.release();
  }
}


module.exports = { generarReporteFD1 };
