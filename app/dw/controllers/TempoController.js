const ItensFonte = require("../../arquivo/models/ItensFonte");
const Fonte = require("../../arquivo/models/Fonte");
const ItensFontes = require("../../arquivo/models/ItensFonte");

module.exports = {
	async store(req,res){
		let fontes = await Fonte.findAll({
			where:{
				carregado: false,
			}
		});

		await fontes.map(async fonte => {
			console.log(fonte.hash);
			let itens = await ItensFontes.findAll({
				where:{
					fonte_id: fonte.id
				}
			});
			await itens.map(async item => {
				console.log(item.bairro);
			});
		});

		return res.json({message: 'Hello Word'});
	}
};