const Fonte = require('../models/Fonte');
const Excel = require('exceljs');
const testPath = './data/ciosp.xlsx';
const fs = require('fs');

const carregarWorkbook = (path) => {
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
  
  

module.exports = {
    async store(req,res){
        let quantidade_registros = 0;
        //Aqui terei uma função que os dados do arquivo
        await carregarWorkbook(testPath)
        .then( workbook => {
            let ws = workbook.getWorksheet("Plan1");
            quantidade_registros = ws.rowCount;

            // ws.eachRow({ includeEmpty: true }, function(row, rowNumber) {
            //     console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
            // });
        }).catch( err => { 
          console.error( err );
        });

        const fonte = await Fonte.create({
            nome:'nome', 
            hash:'hash',
            quantidade_registros,
            usuario:'',
            carregado: false
        });
    return res.json(fonte);
    }
}