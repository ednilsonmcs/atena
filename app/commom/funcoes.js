const Excel = require('exceljs');
const fs = require('fs');
const moment = require('moment');

exports.carregarWorkbook = (path) => {
    var workbook = new Excel.Workbook();
    return new Promise( function (resolve, reject ) {
        try {  
            if (fs.existsSync(path)) {
            console.log( "output exists" );
            // load the Excel workbook but do nothing
            workbook.xlsx.readFile( path ).then( function() {
                resolve( workbook );
            });
            } else {
            console.log( "output doesn't exist" );
            reject();
            }
        }
        catch( err ){
            reject();
        }
    });
}

exports.getValuesRow = (ws) => {
    ws.eachRow({ includeEmpty: true }, function(row, rowNumber) {
        console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
    });
}

exports.getValuesRowByIndex = (ws,index) => {
    const data = ws.getRow(index).values[1];
    const hora = ws.getRow(index).values[3];
    const datahora = data +" "+ hora;

    return {
        data: moment(datahora, "DD/MM/YYYY HH:mm:ss", "pt"),
        dia_semana: ws.getRow(index).values[2],
        endereco: ws.getRow(index).values[4],
        bairro: ws.getRow(index).values[5],
        municipio: ws.getRow(index).values[6],
        cod_tipo: ws.getRow(index).values[7],
        descricao: ws.getRow(index).values[8],
        cod_sub_tipo: ws.getRow(index).values[9],
        desc_sub_tipo: ws.getRow(index).values[10],
        situacao_encontrada: ws.getRow(index).values[11],
        descricao_finalizacao: ws.getRow(index).values[12],
        historico: ws.getRow(index).values[13],
    }
}