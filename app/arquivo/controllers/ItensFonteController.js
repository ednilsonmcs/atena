const ItensFonte = require('../models/ItensFonte');
const { carregarWorkbook, getValuesRowByIndex } = require('../../commom/funcoes');
const path = './data/ciosp.xlsx';

module.exports = {
    async store(req,res){
        let ws = null;
        let quantidade_registros;
        let aux;
        let fonte;

        await carregarWorkbook(path)
        .then( workbook => {
            ws = workbook.getWorksheet("Plan1");
            quantidade_registros = ws.rowCount;     
        }).catch( err => { 
          console.error( err );
        });

        //Para testes
<<<<<<< HEAD
        // quantidade_registros = 10;
=======
        quantidade_registros = 10;
>>>>>>> 67a08585954d1b798eadb44053b7c9839760b44b
        for (let index = 2; index <= quantidade_registros; index++) {
            aux = getValuesRowByIndex(ws,index);
            fonte = await ItensFonte.create(aux);
            
        }

        return res.json(fonte);
    }
}