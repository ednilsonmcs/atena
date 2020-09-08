const ItensFonte = require("../../arquivo/models/ItensFonte");
const Fonte = require("../../arquivo/models/Fonte");
const Endereco = require("../models/Endereco");
const connection  = require("../../database/index");

module.exports = {
	async store(req,res){

		let fontes = await Fonte.findAll({
			where:{
				carregado: false,
			}
		});

		async function transformacao(){
			let enderecos = [];
			const federacao = 'BRASIL';
			const t = await connection.transaction();
			for(let fonte of fontes){
				let itens = await ItensFonte.findAll({
					where:{
						fonte_id: fonte.id
					}
				});
				
				try{
					for(const item of itens){
						let itemExistente = await Endereco.findOne({
							where:{
								logradouro: item.endereco,
								bairro: item.bairro,
								municipio: item.municipio,
								estado: item.estado,
								federacao
							}
						});
						if(itemExistente === null){
							let endereco = {
								logradouro: item.endereco,
								bairro: item.bairro,
								municipio: item.municipio,
								estado: item.estado,
								federacao
							};
							let end = await Endereco.create(endereco,{ transaction: t });
							enderecos.push(end);
						}
					}				
				}catch(error){
					console.log(error);
					await t.rollback();
					return res.status(400).json({error: error});
				}
				
				//await fonte.save({ transaction: t });
			}			

			await t.commit();
			return (enderecos.length === 0)? res.status(400).json({message: "Todos endereços já haviam sido inseridos!"}): res.status(200).json({endereco: enderecos});
			
		}
		
		if((await Fonte.findAll()).length === 0){
			res.status(400).json({message: "Ainda nenhuma fonte foi extraída para Staging Area!"});
		}else if((await Fonte.findAll({ where:{ carregado: false, } })).length === 0){
			res.status(400).json({message: "Todas fontes selecionadas já foram carregadas anteriomente!"});
		}else{
			await transformacao();
		}
	}
};