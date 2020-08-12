const Fonte = require("../models/Fonte");
const ItensFonte = require("../models/ItensFonte");
const { carregarWorksheet, getFile } = require("../../commom/funcoes");
const fs = require("fs");
const { PATH_FONTE } = require("../../config/env.config");

module.exports = {
	async store(req,res){
		const hash = req.body.hash;

		//Verificar se existe um hash extraido
		let fonte;
		let quantidade_registros = 0;
		const andressOfFile = await getFile(PATH_FONTE,hash);
		if(andressOfFile){
			let fileName = andressOfFile.split("-");
			fileName = fileName[1];
			await carregarWorksheet(andressOfFile)
				.then(async (worksheet) => {
					quantidade_registros = worksheet.actualRowCount-1;
        
					fonte = await Fonte.create({
						nome: fileName, 
						hash: hash,
						quantidade_registros,
						usuario:"",
						carregado: false
					});
					let rows = [];
					let flag = false;
					worksheet.eachRow({ includeEmpty: false }, async function(row) {
						//Ignorando a primeira linha, cabe�alho
						if(flag){
							let data = row.getCell(1).value;
							data += " "+row.getCell(3).value;
							let dia_semana = row.getCell(2).value;
							let endereco = row.getCell(4).value;
							let bairro = row.getCell(5).value;
							let municipio = row.getCell(6).value;
							let cod_tipo = row.getCell(7).value;
							let descricao = row.getCell(8).value;
							let cod_sub_tipo = row.getCell(9).value;
							let desc_sub_tipo = row.getCell(10).value;
							let sit_encontrada = row.getCell(11).value;
							let descricao_finalizacao = row.getCell(12).value;
							let historico = row.getCell(13).value;

							data = new Date( data.substr(6,4), data.substr(3,2), data.substr(0,2), data.substr(11,2), data.substr(14,2), data.substr(17,2) );
							rows.push({data, dia_semana, endereco, bairro, municipio, cod_tipo, descricao, cod_sub_tipo, desc_sub_tipo, sit_encontrada, descricao_finalizacao, historico});
						}
						flag = true;
					});

					async function insertItensFonte(rows) {
						for(const row of rows){
							try {
								await ItensFonte.create(row);
							} catch (error) {
								console.log(error);
							} 
						}
					}
                    
					await insertItensFonte(rows);

				});

			return res.status(200).json(fonte);
		}else{
			return res.status(404).json({erro: "Arquivo inexistente!"});
		}



	},
	async listar(req,res){
		let listFiles = [];
		fs.readdir(PATH_FONTE, (err, files) => {
			files.forEach(name => {
				let metaFile = name.split("-");
				let metaType = name.split(".");
				let hash = metaFile[0];
				let type = metaType[1];
				listFiles.push({ hash, name, type });
			});
			return res.json(listFiles);
		});
	},
	async listarByHash(req,res){
		let listFiles = [];
		fs.readdir(PATH_FONTE, (err, files) => {
			files.forEach(name => {
				let metaFile = name.split("-");
				let metaType = name.split(".");
				let hash = metaFile[0];
				let type = metaType[1];
				if(req.params.hash == hash){
					listFiles.push({ hash, name, type });
				}
			});
			return res.json(listFiles);
		});
	}
};