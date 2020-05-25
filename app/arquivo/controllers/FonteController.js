const Fonte = require('../models/Fonte');
const ItensFonte = require('../models/ItensFonte');
const { carregarWorkbook } = require('../../commom/funcoes');
const fs = require('fs');
const { PATH_FONTE } = require('../../config/env.config');

module.exports = {
    async store(req,res){
        let quantidade_registros = 0;
        let ws = null;
        //Aqui terei uma função que os dados do arquivo
        await carregarWorkbook(path)
        .then( workbook => {
            ws = workbook.getWorksheet("Plan1");
            quantidade_registros = ws.rowCount;     
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
    },
    listar(req,res){
        let listFiles = [];
        fs.readdir(PATH_FONTE, (err, files) => {
            files.forEach(name => {
                let metaFile = name.split('-');
                let metaType = name.split('.');
                hash = metaFile[0];
                type = metaType[1];
                listFiles.push({ hash, name, type })
            });
            return res.json(listFiles);
        });
    }
}