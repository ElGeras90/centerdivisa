const fs = require('fs');
const path = require('path');
const { create } = require('xmlbuilder2');
const validator = require('xsd-schema-validator');
const { postgresPool } = require('../util/condb');

// 🧾 Generar XML DE1
async function generarReporteDE1(params, formato = 'descargar') {
  const { pid_empresa, p_trimestre, p_clave_organo, p_clave_sujeto, p_fecha_inicio, p_fecha_fin } = params;
  const client = await postgresPool.connect();

  try {
    // Obtener datos base
    const query = `
      SELECT g.tipo AS moneda,
             COUNT(*) FILTER (WHERE m.tipo = 1) AS numero_operaciones_compra,
             COALESCE(SUM(m.mn) FILTER (WHERE m.tipo = 1), 0) AS monto_compra,
             COUNT(*) FILTER (WHERE m.tipo = 2) AS numero_operaciones_venta,
             COALESCE(SUM(m.mn) FILTER (WHERE m.tipo = 2), 0) AS monto_venta,
             cd.cp AS codigo_postal
      FROM mov_divisas m
      JOIN grupodivisa g ON g.idgrupo = m.grupoid
      JOIN sucursales s ON s.sucursalid = m.sucursalid
      JOIN cat_dom cd ON cd.id=s.idcp
      WHERE s.empresaid = $1 AND m.fecharegistro BETWEEN $2 AND $3
      GROUP BY g.tipo, cd.cp
      ORDER BY g.tipo;
    `;
    const result = await client.query(query, [pid_empresa, p_fecha_inicio, p_fecha_fin]);
    if (result.rows.length === 0)
      throw new Error('No se encontraron operaciones para el rango de fechas.');

    // Crear XML con xmlbuilder2
    const root = create({ version: '1.0', encoding: 'UTF-8' })
      .ele('reporte', {
        'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
        'xsi:schemaLocation': 'http://www.uif.shcp.gob.mx/recepcion/de1 de1.xsd',
        xmlns: 'http://www.uif.shcp.gob.mx/recepcion/de1'
      })
      .ele('trimestre_reportado').txt(p_trimestre).up()
      .ele('clave_organo_supervisor').txt(p_clave_organo).up()
      .ele('clave_sujeto').txt(p_clave_sujeto).up()
      .ele('codigo_postal').txt(result.rows[0].codigo_postal || '').up();

    for (const row of result.rows) {
      root.ele('operacion')
        .ele('moneda').txt(row.moneda).up()
        .ele('numero_operaciones_compra').txt(row.numero_operaciones_compra).up()
        .ele('monto_compra').txt(Number(row.monto_compra).toFixed(2)).up()
        .ele('numero_operaciones_venta').txt(row.numero_operaciones_venta).up()
        .ele('monto_venta').txt(Number(row.monto_venta).toFixed(2)).up()
        .up();
    }

    const xml = root.end({ prettyPrint: true });


    // Guardar archivo
    const outPath = path.join(__dirname, `../exports/reporte_de1_${pid_empresa}.xml`);
    fs.writeFileSync(outPath, xml, 'utf8');

    // Retorno según formato
    if (formato === 'base64') {
      return Buffer.from(xml).toString('base64');
    } else if (formato === 'texto') {
      return xml;
    } else {
      return xml;
    }
  } finally {
    client.release();
  }
}

module.exports = { generarReporteDE1 };
