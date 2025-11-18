const { mysqlConnection, postgresClient, sqlServerPool, postgresPool } = require('./../util/condb');

async function mt(dat) {
  const client = await postgresPool.connect();
  try {
    console.log(dat)
    const query = 'SELECT * FROM "public"."rep_reg_monto_totales"($1)';
    const values = [dat];
    const result = await client.query(query, values);
    return result;
  } catch (error) {
    console.log(error)
    throw error;
  } finally {
    client.release();
  }
}
async function reportemontos(dat) {
  const client = await postgresPool.connect();
  try {
    
    const query = 'SELECT * FROM "public"."reporte_montos_divisa_xml_empresa"($1)';
    const values = [dat];
    const result = await client.query(query, values);
    return result;
  } catch (error) {
    console.log(error)
    throw error;
  } finally {
    client.release();
  }
}

async function operacionesendolares(dat) {
  const client = await postgresPool.connect();
  try {
    
    const query = 'SELECT * FROM "public"."reporte_operaciones_dolares_xml_empresa"($1)';
    const values = [dat];
    const result = await client.query(query, values);
    return result;
  } catch (error) {
    console.log(error)
    throw error;
  } finally {
    client.release();
  }
}

async function reportes24horas(dat) {
  const client = await postgresPool.connect();
try {
    const { p_fecha_inicio, p_fecha_fin, p_empresa_id } = dat;

    // 1️⃣ Consultamos operaciones recientes
    const query = `
          SELECT 
        m.idmovimiento,
        m.fecharegistro,
        m.tipo,
        m.mn,
        m.me,
        m.tipocambio,
        m.clienteid,
        m.empresaid,
        s.nombre_sucursal,
        p.id_perfil,
        p.monto_promedio,
        p.cantidad_operaciones_mes,
        p.es_pep,
        c.nombre,
        c.paterno,
        c.materno,
        p.pais_procedencia_fondos,
        p.pais_destino_fondos
      FROM mov_divisas m
      LEFT JOIN perfil_transaccional p 
        ON p.id_cliente = m.clienteid OR p.id_empresa = m.empresaid
      LEFT JOIN sucursales s ON s.sucursalid = m.sucursalid
      LEFT JOIN cliente c ON c.idcliente = m.clienteid
      WHERE m.fecharegistro::date BETWEEN $1 AND $2
        AND (m.sucursalid in (select sucursalid from sucursales where empresaid = $3))
      ORDER BY m.fecharegistro DESC
    `;

    const { rows: operaciones } = await client.query(query, [
      p_fecha_inicio,
      p_fecha_fin,
      p_empresa_id,
    ]);

    const paisesRiesgo = ['RUS', 'IRN', 'PRK', 'SYR', 'CUB', 'AFG', 'VEN'];
    const sospechosas = [];

    // 2️⃣ Recorremos cada operación
    for (const op of operaciones) {
      const motivos = [];
      const montoMXN = op.mn || (op.me * (op.tipocambio || 1));

      // 🧩 Sin perfil
      if (!op.id_perfil) motivos.push('Cliente o empresa sin perfil transaccional');

      // 🧩 PEP interno (marcado en perfil)
      if (op.es_pep) motivos.push('Cliente marcado como PEP interno');

      // 🧩 Monto fuera de rango
      if (op.monto_promedio && montoMXN >= op.monto_promedio * 10)
        motivos.push(`Monto 10x superior al promedio (${montoMXN} vs ${op.monto_promedio})`);

      // 🧩 País de riesgo
      if (
        paisesRiesgo.includes(op.pais_procedencia_fondos) ||
        paisesRiesgo.includes(op.pais_destino_fondos)
      )
        motivos.push(
          `Fondos vinculados con país de alto riesgo (${op.pais_procedencia_fondos || op.pais_destino_fondos})`
        );

      // 🧩 Verificación externa PEP / listas negras
      if (op.nombre) {
        try {
          const body = {
            nombre: op.nombre,
            paterno: op.paterno || '',
            materno: op.materno || '',
          };

          const response = await axios.post(
            'https://demo.axen.devgeras.xyz:3002/api/buscar',
            body,
            { timeout: 7000 } // 7 segundos de espera
          );

          console.log(response)
          if (response.data && response.data.resultado && response.data.resultado.length > 0) {
            motivos.push(
              `Coincidencia detectada en listas PEP o sanciones: ${response.data.resultado[0].fuente || 'sin fuente'}.`
            );
          }
        } catch (apiErr) {
          console.warn('⚠️ No se pudo verificar PEP externo:', apiErr.message);
        }
      }

      // 🧩 Fraccionamiento — más de 3 operaciones en 48h
      if (op.clienteid) {
        const subQuery = `
          SELECT COUNT(*) 
          FROM mov_divisas 
          WHERE clienteid = $1 
            AND fecharegistro BETWEEN $2::timestamp - interval '48 hours' AND $2::timestamp
        `;
        const { rows } = await postgresPool.query(subQuery, [op.clienteid, op.fecharegistro]);
        if (parseInt(rows[0].count) > 3) {
          motivos.push(`Posible fraccionamiento (${rows[0].count} operaciones en 48h)`);
        }
      }

      // 🚨 Si hay motivos, la agregamos
      if (motivos.length > 0) {
        sospechosas.push({
          idmovimiento: op.idmovimiento,
          fecha: op.fecharegistro,
          clienteid: op.clienteid,
          empresaid: op.empresaid,
          montoMXN,
          sucursal: op.nombre_sucursal || 'Sin sucursal',
          motivos,
        });
      }
    }

    res.json({
      success: true,
      total: sospechosas.length,
      data: sospechosas,
    });
  } catch (err) {
    console.error('❌ Error detectando operaciones 24h:', err);
    res.status(500).json({ success: false, message: err.message });
  }
}


async function operacionesinusuales(fecha_inicio, fecha_fin,organo,sujeto,empresa) {
  const client = await postgresPool.connect();
  try {
   
    const query = 'SELECT * FROM "public"."reporte_operaciones_inusuales"($1::date,$2::Date,$3,$4,$5)';
    const values = [fecha_inicio, fecha_fin,organo,sujeto,empresa];
    const result = await client.query(query, values);
    return result;
  } catch (error) {
    console.log(error)
    throw error;
  } finally {
    client.release();
  }
}

async function operacionesrelevantes(fecha_inicio, fecha_fin,organo,sujeto,empresa) {
  const client = await postgresPool.connect();
  try {
    
    const query = 'SELECT * FROM "public"."reporte_operaciones_relevantes"($1::date,$2::Date,$3,$4,$5)';
    const values = [fecha_inicio, fecha_fin,organo,sujeto,empresa];
    const result = await client.query(query, values);
    return result;
  } catch (error) {
    console.log(error)
    throw error;
  } finally {
    client.release();
  }
}


module.exports = {
  mt,
  reportemontos,
  operacionesendolares,
  reportes24horas,
  operacionesinusuales,
  operacionesrelevantes
};






