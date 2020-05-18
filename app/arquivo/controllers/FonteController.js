const Fonte = require('../models/Fonte');
const ItensFonteController = require('../controllers/ItensFonteController');
const { carregarWorkbook, getValuesRowByIndex } = require('../../commom/funcoes');
const path = './data/ciosp.xlsx';

module.exports = {
    async store(req,res){
        let quantidade_registros = 0;
        let ws = null;
        //Aqui terei uma função que os dados do arquivo
        await carregarWorkbook(path)
        .then( workbook => {
            ws = workbook.getWorksheet("Plan1");
            quantidade_registros = ws.rowCount;
            // console.log(getValuesRowByIndex(ws,2))            
        }).catch( err => { 
          console.error( err );
        });

        ItensFonteController.store(getValuesRowByIndex(ws,2));  
        
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