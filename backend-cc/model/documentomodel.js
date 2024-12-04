const { postgresPool } = require('./../util/condb');


async function consultadivisa(id) {
    const client = await postgresPool.connect();

    try {
        const query = 'select * from obtener_movimientos_por_fecha($1)';
        const result = await client.query(query, [id]);
        return result;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

async function mov_divisas(id) {
    const client = await postgresPool.connect();

    try {
        const query = 'select * from obtener_movimientos_por_sucursal($1)';
        const result = await client.query(query, [id]);
        return result;
    } catch (error) {
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    consultadivisa, mov_divisas
};
