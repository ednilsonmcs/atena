const ItensFonte = require("../../arquivo/models/ItensFonte");
const Fonte = require("../../arquivo/models/Fonte");
const Tempo = require("../../dw/models/Tempo");
const connection  = require("../../database/index");
var convert = require('xml-js');

const fs = require("fs");
const util = require("util");
const readdir = util.promisify(fs.readdir);

module.exports = {
	async store(req,res){
		//http://www.calendario.com.br/api/api_feriados.php?token=[ZWRpbWNzN0BnbWFpbC5jb20maGFzaD01MjY0Njk4OQ]&ano=2013&estado=SERGIPE&cidade="+municipio.toUpperCase()
		fs.readFile( './app/commom/feriados.xml', function(err, data) {
			var result1 = convert.xml2json(data, {compact: false, spaces: 4});
			JSON.parse(result1).elements.forEach(element => {
				element.elements.forEach(e => {
					if(typeof e.elements[0].elements !== "undefined"){
						let data = e.elements[0].elements[0].text;
						let feriado = e.elements[1].elements[0].text;
						console.log(data+" "+feriado);
					}
				});
			})
		 });
		let fontes = await Fonte.findAll({
			where:{
				carregado: false,
			}
		});
		
		async function transformacao(){
			let tempos = [];



			for(fonte of fontes){
				let itens = await ItensFonte.findAll({
					where:{
						fonte_id: fonte.id
					}
				});

				const t = await connection.transaction();
				try{
					for(item of itens){
						let itemExistente = await Tempo.findOne({
							where:{
								data: item.data,
								hora: item.hora
							}
						});

						if(itemExistente === null){
							const datetime = item.data+" "+item.hora;
							let tempo = {
								data: item.data,
								hora: item.hora,
								turno: await Tempo.getTurno(item.data,item.hora),
								mes: await Tempo.getMes(datetime),
								ano: await Tempo.getAno(datetime),
								dia_semana: await Tempo.getDiaSemana(datetime),
								dia: await Tempo.getDia(datetime),
								ano_bissexto: await Tempo.isAnoBissexto(datetime),
								dia_util: await Tempo.isDiaUtil(datetime),
								fim_semana: await Tempo.isFimSemana(datetime),
								feriado: await Tempo.isFeriado(datetime),
								pos_feriado: false,
								pre_feriado: false,
								nome_dia_semana: await Tempo.getNomeDiaSemana(datetime),
								nome_feriado: await Tempo.getNomeFeriado(datetime),
								quinzena: await Tempo.getQuinzena(datetime),
								nome_mes: await Tempo.getNomeMes(datetime),
								bimestre: await Tempo.getBimestre(datetime),
								trimestre: await Tempo.getTrimestre(datetime),
								semestre: await Tempo.getSemestre(datetime),
							}
							let temp = await Tempo.create(tempo,{ transaction: t });
							tempos.push(temp)
						}
					}				
					await t.commit();
				}catch(error){
					console.log(error)
					await t.rollback();
				}

				fonte.carregado = true;
				await fonte.save();
			}
			return res.status(200).json({tempo: tempos});
		}
		
		if((await Fonte.findAll()).length === 0){
			res.status(404).json({message: 'Ainda nenhuma fonte foi extraída para Staging Area!'});
		}else if((await Fonte.findAll({ where:{ carregado: false, } })).length === 0){
			res.status(404).json({message: 'Todas fontes selecionadas já foram carregadas anteriomente!'});
		}else{
			await transformacao();
		}
	}
};