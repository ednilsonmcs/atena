const Fonte = require("../models/Fonte");
const ItensFonte = require("../models/ItensFonte");
const { carregarWorksheet, getFile } = require("../../commom/funcoes");
const { PATH_FONTE } = require("../../config/env.config");

module.exports = {
	async store(req,res){
		
		const hash = req.body.hash;
		let quantidade_registros = 0;
		
		let fonte = await Fonte.findOne({where:{hash: hash}});

		if(fonte != null)
			return res.status(404).json({erro: "Arquivo já extraido anteriomente!"});
		
		const andressOfFile = await getFile(PATH_FONTE,hash);
		if(!andressOfFile)
			return res.status(404).json({erro: "Arquivo inexistente!"});

		let fileName = andressOfFile.split("-");
		fileName = fileName[1];
		await carregarWorksheet(andressOfFile)
			.then(async (worksheet) => {
				quantidade_registros = worksheet.actualRowCount-1;
				//Criar Begin; Commit;
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
						let dia_semana = row.getCell(2).value;
						let hora = " "+row.getCell(3).value;
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
						
						data = data.substr(6,4) +"-"+ data.substr(3,2) +"-"+ data.substr(0,2);

						rows.push({data, dia_semana, hora, endereco, bairro, municipio, cod_tipo, descricao, cod_sub_tipo, desc_sub_tipo, sit_encontrada, descricao_finalizacao, historico});
					}
					flag = true;
				});

				async function insertItensFonte(rows,fonte_id) {
					for(const row of rows){
						try {
							await ItensFonte.create({fonte_id, ...row});
						} catch (error) {
							console.log(error);
						} 
					}
				}
				
				await insertItensFonte(rows,fonte.id);

			}).finally(()=>{
				return res.status(200).json(fonte);
			});

	},async list(req,res){
		let fonte = await Fonte.findAll();
		if(fonte == []){
			return res.status(404).json({message: "Não há registros!"});
		}else{
			return res.status(200).json(fonte);
		}
	},async listarByHash(req,res){
		let hash = req.params.hash;
		let fonte = await Fonte.findOne({where:{hash}});
		if(fonte){
			return res.status(200).json(fonte);
		}else{
			return res.status(404).json({message: "Não há registros para estes arquivo!"});
		}
	},async deleteByHash(req,res){
		let hash = req.params.hash;
		if(await Fonte.destroy({where:{hash}})){
			return res.status(200).json({message: "Registros excluídos!"});
		}else{
			return res.status(404).json({message: "Não há registros para estes arquivo!"});
		}
	}
};