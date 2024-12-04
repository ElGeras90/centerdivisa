const PdfPrinter = require('pdfmake');
const fs = require('fs');
const path = require('path');
const x = require('../model/documentomodel')
const ExcelJS = require('exceljs');
const encriptarjsong = require('./../util/encriptarjson');


/**async function cortecaja1(req, res) {
    try {
        const fecha = { fecha: '8/11/2023', sucursal: 1 };
        const d = await x.consultadivisa(fecha);
        const datos = d.rows[0].obtener_movimientos_por_fecha;
        console.log(datos)
        const fonts = {
            Roboto: {
                normal: path.join(__dirname, '/Roboto/Roboto-Regular.ttf'),
                bold: path.join(__dirname, '/Roboto/Roboto-Medium.ttf'),
                italics: path.join(__dirname, '/Roboto/Roboto-Italic.ttf'),
                bolditalics: path.join(__dirname, '/Roboto/Roboto-MediumItalic.ttf'),
            },
        };

        const printer = new PdfPrinter(fonts);

        const tableBody = [
            [
                { text: 'Divisa', style: 'tableHeader' },
                { text: 'Cantidad en Caja', style: 'tableHeader' },
                { text: 'Valor Unitario (Moneda Local)', style: 'tableHeader' },
                { text: 'Valor Total en Moneda Local', style: 'tableHeader' },
            ],
        ];

        datos.forEach((row) => {
            tableBody.push([
                { text: row.grupo || '', alignment: 'left' }, // Alineado a la izquierda
                { text: row.total_monto !== undefined ? row.total_monto.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '', alignment: 'right' },
                { text: row.tipocambio !== undefined ? row.tipocambio.toFixed(2) : '', alignment: 'right' },
                { text: row.total_convertido !== undefined ? row.total_convertido.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '', alignment: 'right' },
            ]);
        });

        const fechaParam = fecha.fecha || new Date().toISOString().split('T')[0]; // Si no pasa fecha, se usa la actual

        const today = new Date(fechaParam); // Convertir la fecha recibida
        const fechaActual = today.toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });

        const docDefinition = {
            content: [
                {
                    table: {
                        widths: ['50%', '50%'],
                        body: [
                            [
                                { text: '\nReporte Administrativo', style: 'header', alignment: 'left' },
                                { image: path.join(__dirname, 'cc.png'), fit: [300, 100], alignment: 'right' },
                            ],
                        ],
                    },
                    layout: 'noBorders',
                    margin: [0, 0, 0, 10],
                },
                { text: 'Inmtec Centro Cambiario S.A. de C.V.', style: 'subheader' },
                { text: `Fecha: ${fechaActual}\n\n`, style: 'date' },
                {
                    table: {
                        headerRows: 1,
                        widths: ['*', '*', '*', '*'],
                        body: tableBody,
                    },
                },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                },
                subheader: {
                    fontSize: 14,
                    bold: true,
                },
                date: {
                    fontSize: 12,
                },
                tableHeader: {
                    fontSize: 12,
                    bold: true,
                    color: 'white',
                    fillColor: '#002060',
                    alignment: 'center',
                },
            },
        };

        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        const outputPath = path.join(__dirname, 'BalanceDeCaja.pdf');

        const writeStream = fs.createWriteStream(outputPath);
        pdfDoc.pipe(writeStream);
        pdfDoc.end();

        writeStream.on('finish', () => {
            res.download(outputPath, 'BalanceDeCaja.pdf', (err) => {
                if (err) {
                    console.error('Error al descargar el archivo:', err);
                    res.status(500).send('Error al descargar el archivo PDF.');
                } else {
                    // Opcional: eliminar el archivo temporal después de la descarga
                    fs.unlink(outputPath, (unlinkErr) => {
                        if (unlinkErr) console.error('Error al eliminar el archivo:', unlinkErr);
                    });
                }
            });
        });
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).send('Error al generar el archivo PDF.');
    }
}**/



async function cortecaja(req, res) {
    try {
        //const fecha = { fecha: "25-11-2024", sucursal: 1 };
        console.log(req.body)

        const fecha = req.body
        const d = await x.consultadivisa(fecha);
        const datos = d.rows[0].obtener_movimientos_por_fecha;

        const fechaParam = fecha.fecha; // Fecha fija
        const today = new Date(fechaParam); // Convertir la fecha
        const fechaActual = today.toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' }); // Formato

        // Crear una nueva instancia de un libro de trabajo
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Balance de Caja');

        // Cargar la imagen de fondo
        const imagePath = path.join(__dirname, 'fondo.png');
        const imageId = workbook.addImage({
            filename: imagePath,
            extension: 'png',
        });

        // Añadir la imagen de fondo en un rango de celdas
        worksheet.addImage(imageId, {
            tl: { col: 0, row: 0 }, // Top-left corner (A1)
            br: { col: 4, row: 4 }, // Bottom-right corner (E5)
            editAs: 'oneCell',
        });

        // Cargar la imagen que va encima (centrada)
        const overlayImagePath = path.join(__dirname, 'cc.png'); // Otra imagen que quieres poner encima
        const overlayImageId = workbook.addImage({
            filename: overlayImagePath,
            extension: 'png',
        });

        // Agregar la imagen centrada en el rango
        worksheet.addImage(overlayImageId, {
            tl: { col: 1, row: 1 }, // Top-left corner (B2)
            br: { col: 3, row: 3 }, // Bottom-right corner (D4)
            editAs: 'oneCell',
        });
        // Definir los encabezados
        worksheet.mergeCells('A6:B6');
        worksheet.getCell('A6').value = 'Reporte Administrativo';
        worksheet.getCell('A6').alignment = { horizontal: 'center' };
        worksheet.getCell('A6').font = { bold: true, }; // Poner en negrita

        worksheet.mergeCells('A7:B7');
        worksheet.getCell('A7').value = 'Inmtec Centro Cambiario S.A. de C.V.';
        worksheet.getCell('A7').alignment = { horizontal: 'center' };
        worksheet.getCell('A7').font = { bold: true }; // Poner en negrita

        worksheet.mergeCells('A8:B8');
        worksheet.getCell('A8').value = 'Fecha: ' + fechaActual;
        worksheet.getCell('A8').alignment = { horizontal: 'center' };
        worksheet.getCell('A8').font = { bold: true }; // Poner en negrita


        worksheet.addRow([]); // Fila vacía

        // Definir los encabezados de la tabla
        const header = ['Divisa', 'Cantidad en Caja', 'Valor Unitario (Moneda Local)', 'Valor Total en Moneda Local'];
        worksheet.addRow(header);

        const headerRow = worksheet.getRow(10); // Fila de encabezado (fila 10)

        // Aplicar estilos solo a las columnas seleccionadas (por ejemplo, las columnas 2 a 4)
        [1, 2, 3, 4].forEach((colIndex) => {
            const cell = headerRow.getCell(colIndex); // Obtener la celda específica
            cell.font = { bold: true, color: { argb: 'FFFFFF' }, size: 12 }; // Fuente personalizada
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '002060' } }; // Fondo azul
            cell.alignment = { horizontal: 'center', vertical: 'middle' }; // Centrado
        });
        // Agregar los datos de la tabla
        datos.forEach((row) => {
            const newRow = worksheet.addRow([
                row.grupo || '',
                row.total_monto !== undefined ? row.total_monto.toFixed(2) : '',
                row.tipocambio !== undefined ? row.tipocambio.toFixed(2) : '',
                row.total_convertido !== undefined ? row.total_convertido.toFixed(2) : '',
            ]);

            // Alinear las celdas a la derecha (columnas 2, 3 y 4)
            newRow.getCell(2).alignment = { horizontal: 'right' };
            newRow.getCell(3).alignment = { horizontal: 'right' };
            newRow.getCell(4).alignment = { horizontal: 'right' };
        });

        // Ajustar el ancho de las columnas
        worksheet.columns = [
            { width: 20 },
            { width: 20 },
            { width: 30 },
            { width: 30 }
        ];

        // Crear el archivo Excel
        const outputPath = path.join(__dirname, 'BalanceDeCajaConImagen.xlsx');
        // Guardar el archivo Excel
        workbook.xlsx.writeFile(outputPath).then(() => {
            console.log('Archivo Excel generado exitosamente.');

            // Enviar el archivo al cliente
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=BalanceDeCaja.xlsx');
            res.download(outputPath, () => {
                // Eliminar el archivo después de la descarga
                fs.unlink(outputPath, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo:', err);
                    } else {
                        console.log('Archivo eliminado exitosamente');
                    }
                });
            });
        }).catch((error) => {
            console.error('Error al generar el archivo:', error);
            res.status(500).send('Error al generar el archivo');
        })

    } catch (error) {
        console.log(error)
    }
}

async function cortecajavista(req, res) {
    let fecha = encriptarjsong.decrypt(req.body.resultado)
    //const fecha = { fecha: "8-11-2023", sucursal: 1 };
    x.consultadivisa(fecha)
        .then(info => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows[0].obtener_movimientos_por_fecha }));

            res.status(200).send({ resultado: data });
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);

        });
}

async function cortemov(req, res) {
    try {
        //const fecha = { fecha: "25-11-2024", sucursal: 1 };
        console.log(req.body)
        const fecha = req.body
        const d = await x.mov_divisas(fecha);
        const datos = d.rows[0].obtener_movimientos_por_sucursal;
        console.log(datos)
        const fechaParam = fecha.fecha; // Fecha fija
        const today = new Date(fechaParam); // Convertir la fecha
        const fechaActual = today.toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' }); // Formato

        // Crear una nueva instancia de un libro de trabajo
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Balance de Caja');

        // Cargar la imagen de fondo
        const imagePath = path.join(__dirname, 'fondo.png');
        const imageId = workbook.addImage({
            filename: imagePath,
            extension: 'png',
        });

        // Añadir la imagen de fondo en un rango de celdas
        worksheet.addImage(imageId, {
            tl: { col: 0, row: 0 }, // Top-left corner (A1)
            br: { col: 4, row: 4 }, // Bottom-right corner (E5)
            editAs: 'oneCell',
        });

        // Cargar la imagen que va encima (centrada)
        const overlayImagePath = path.join(__dirname, 'cc.png'); // Otra imagen que quieres poner encima
        const overlayImageId = workbook.addImage({
            filename: overlayImagePath,
            extension: 'png',
        });

        // Agregar la imagen centrada en el rango
        worksheet.addImage(overlayImageId, {
            tl: { col: 1, row: 1 }, // Top-left corner (B2)
            br: { col: 3, row: 3 }, // Bottom-right corner (D4)
            editAs: 'oneCell',
        });
        // Definir los encabezados
        worksheet.mergeCells('A6:B6');
        worksheet.getCell('A6').value = 'Reporte Administrativo';
        worksheet.getCell('A6').alignment = { horizontal: 'center' };
        worksheet.getCell('A6').font = { bold: true, }; // Poner en negrita

        worksheet.mergeCells('A7:B7');
        worksheet.getCell('A7').value = 'Inmtec Centro Cambiario S.A. de C.V.';
        worksheet.getCell('A7').alignment = { horizontal: 'center' };
        worksheet.getCell('A7').font = { bold: true }; // Poner en negrita

        worksheet.mergeCells('A8:B8');
        worksheet.getCell('A8').value = 'Fecha: ' + fechaActual;
        worksheet.getCell('A8').alignment = { horizontal: 'center' };
        worksheet.getCell('A8').font = { bold: true }; // Poner en negrita

        //compras
        const rows = worksheet.addRow(['Tipo Transferencia: ' + datos[0].descripcion]);
        rows.getCell(1).font = { bold: true };
        worksheet.addRow([]);
        // Definir los encabezados de la tabla
        const header = ['Fecha', 'Moneda', 'Monto Transaccion', 'Tasa de Cambio', 'Valor (Moneda Local)'];
        worksheet.addRow(header);

        const headerRow = worksheet.getRow(11); // Fila de encabezado (fila 10)

        // Aplicar estilos solo a las columnas seleccionadas (por ejemplo, las columnas 2 a 4)
        [1, 2, 3, 4, 5].forEach((colIndex) => {
            const cell = headerRow.getCell(colIndex); // Obtener la celda específica
            cell.font = { bold: true, color: { argb: 'FFFFFF' }, size: 12 }; // Fuente personalizada
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '002060' } }; // Fondo azul
            cell.alignment = { horizontal: 'center', vertical: 'middle' }; // Centrado
        });
        // Agregar los datos de la tabla
        datos[0].detalles.forEach((row) => {
            const newRow = worksheet.addRow([
                row.fecharegistro || '',
                row.grupo + ' ' + row.tipo || '',
                row.me !== undefined ? row.me.toFixed(2) : '',
                row.tipocambio !== undefined ? row.tipocambio.toFixed(2) : '',
                row.mn !== undefined ? row.mn.toFixed(2) : '',
            ]);

            // Alinear las celdas a la derecha (columnas 2, 3 y 4)
            newRow.getCell(2).alignment = { horizontal: 'right' };
            newRow.getCell(3).alignment = { horizontal: 'right' };
            newRow.getCell(4).alignment = { horizontal: 'right' };
            newRow.getCell(5).alignment = { horizontal: 'right' };
            newRow.getCell(6).alignment = { horizontal: 'right' };
        });

        // Ajustar el ancho de las columnas
        worksheet.columns = [
            { width: 20 },
            { width: 20 },
            { width: 30 },
            { width: 30 },
            { width: 30 },
            { width: 30 }
        ];
        //ventas 
        worksheet.addRow([]);
        const row = worksheet.addRow(['Tipo Transferencia: ' + datos[1].descripcion]);
        row.getCell(1).font = { bold: true };
        worksheet.addRow([]);
        // Definir los encabezados de la tabla
        worksheet.addRow(header);
        const cantidad = datos[0].detalles
        const valor = cantidad.length + 15
        const headerRows = worksheet.getRow(valor); // Fila de encabezado (fila 10)

        // Aplicar estilos solo a las columnas seleccionadas (por ejemplo, las columnas 2 a 4)
        [1, 2, 3, 4, 5].forEach((colIndex) => {
            const cell = headerRows.getCell(colIndex); // Obtener la celda específica
            cell.font = { bold: true, color: { argb: 'FFFFFF' }, size: 12 }; // Fuente personalizada
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '002060' } }; // Fondo azul
            cell.alignment = { horizontal: 'center', vertical: 'middle' }; // Centrado
        });
        // Agregar los datos de la tabla
        datos[1].detalles.forEach((row) => {
            const newRow = worksheet.addRow([
                row.fecharegistro || '',
                row.grupo + ' ' + row.tipo || '',
                row.me !== undefined ? row.me.toFixed(2) : '',
                row.tipocambio !== undefined ? row.tipocambio.toFixed(2) : '',
                row.mn !== undefined ? row.mn.toFixed(2) : '',
            ]);

            // Alinear las celdas a la derecha (columnas 2, 3 y 4)
            newRow.getCell(2).alignment = { horizontal: 'right' };
            newRow.getCell(3).alignment = { horizontal: 'right' };
            newRow.getCell(4).alignment = { horizontal: 'right' };
            newRow.getCell(5).alignment = { horizontal: 'right' };
            newRow.getCell(6).alignment = { horizontal: 'right' };
        });

        // Ajustar el ancho de las columnas
        worksheet.columns = [
            { width: 20 },
            { width: 20 },
            { width: 30 },
            { width: 30 },
            { width: 30 },
            { width: 30 }
        ];
        // Crear el archivo Excel
        const outputPath = path.join(__dirname, 'BalanceDeCajaConImagen.xlsx');
        // Guardar el archivo Excel
        workbook.xlsx.writeFile(outputPath).then(() => {
            console.log('Archivo Excel generado exitosamente.');

            // Enviar el archivo al cliente
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', 'attachment; filename=BalanceDeCaja.xlsx');
            res.download(outputPath, () => {
                // Eliminar el archivo después de la descarga
                fs.unlink(outputPath, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo:', err);
                    } else {
                        console.log('Archivo eliminado exitosamente');
                    }
                });
            });
        }).catch((error) => {
            console.error('Error al generar el archivo:', error);
            res.status(500).send('Error al generar el archivo');
        })

    } catch (error) {
        res.status(500).send('Error al generar el archivo');
    }
}

async function cortemovimiento(req, res) {
    let fecha = encriptarjsong.decrypt(req.body.resultado)
    //const fecha = { fecha: "25-11-2024", sucursal: 1 };
    x.mov_divisas(fecha)
        .then(info => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: true, info: info.rows[0].obtener_movimientos_por_sucursal }));
            res.status(200).send({ resultado: data });
        })
        .catch(error => {
            let data = encriptarjsong.encrypt(JSON.stringify({ success: false, message: error }));
            res.status(501).send(data);

        });
}
module.exports = { cortecaja, cortecajavista, cortemovimiento, cortemov };
