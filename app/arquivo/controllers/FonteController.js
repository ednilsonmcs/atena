const Fonte = require('../models/Fonte');
const { carregarWorksheet, getFile } = require('../../commom/funcoes');
const fs = require('fs');
const { PATH_FONTE } = require('../../config/env.config');

module.exports = {
    async store(req,res){
        const hash = req.body.hash;
        let fonte;
        let quantidade_registros = 0;
        const andressOfFile = await getFile(PATH_FONTE,hash);

        if(andressOfFile){
            await carregarWorksheet(andressOfFile)
                .then(async (worksheet) => {
                    quantidade_registros = worksheet.rowCount;
        
                    fonte = await Fonte.create({
                        nome:'nome', 
                        hash:'hash',
                        quantidade_registros,
                        usuario:'',
                        carregado: false
                    });
                    worksheet.eachRow({ includeEmpty: true }, function(row, rowNumber) {
        
                    data = row.getCell(1).value;
                    data += " "+row.getCell(3).value;
                    dia_semana = row.getCell(2).value;
                    endereco = row.getCell(4).value;
                    bairro = row.getCell(5).value;
                    municipio = row.getCell(6).value;
                    cod_tipo = row.getCell(7).value;
                    descricao = row.getCell(8).value;
                    cod_sub_tipo = row.getCell(9).value;
                    desc_sub_tipo = row.getCell(10).value;
                    sit_encontrada = row.getCell(11).value;
                    descricao_finalizacao = row.getCell(12).value;
                    historico = row.getCell(13).value;
        
                    const itenfonte = {
                        data,
                        dia_semana,
                        endereco,
                        bairro,
                        municipio,
                        cod_tipo,
                        descricao,
                        cod_sub_tipo,
                        desc_sub_tipo,
                        sit_encontrada,
                        descricao_finalizacao,
                        historico
                    }
                
                    });
                    
                    fonte = await Fonte.create({
                        nome:'nome', 
                        hash:'hash',
                        quantidade_registros,
                        usuario:'',
                        carregado: false
                    });
                })

            return res.status(200).json(fonte);
        }else{
            return res.status(404).json({erro: 'Arquivo inexistente!'});
        }



    },
    async listar(req,res){
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
    },
    async listarByHash(req,res){
        let listFiles = [];
        fs.readdir(PATH_FONTE, (err, files) => {
            files.forEach(name => {
                let metaFile = name.split('-');
                let metaType = name.split('.');
                hash = metaFile[0];
                type = metaType[1];
                if(req.params.hash == hash){
                    listFiles.push({ hash, name, type })
                }
            });
            return res.json(listFiles);
        });
    }
}