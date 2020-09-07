const ItensFonte = require("../../arquivo/models/ItensFonte");
const Fonte = require("../../arquivo/models/Fonte");
const Tempo = require("../../dw/models/Tempo");
const connection  = require("../../database/index");

module.exports = {
	async store(req,res){

		let fontes = await Fonte.findAll({
			where:{
				carregado: false,
			}
		});
		
		async function transformacao(){
			let tempos = [];
			const t = await connection.transaction();
			for(let fonte of fontes){
				let itens = await ItensFonte.findAll({
					where:{
						fonte_id: fonte.id
					}
				});


				try{
 					for(const item of itens){
						let itemExistente = await Tempo.findOne({
							where:{
								data: item.data,
								hora: item.hora
							}
						});

						if(itemExistente === null){
							const datetime = item.data+" "+item.hora;
							const feriado = await Tempo.getFeriado(item.data);
							let tempo = {
								data: item.data,
								hora: item.hora,
								turno: await Tempo.getTurno(item.data,item.hora),
								mes: await Tempo.getMes(datetime),
								ano: await Tempo.getAno(datetime),
								dia_semana: await Tempo.getDiaSemana(datetime),
								dia: await Tempo.getDia(datetime),
								ano_bissexto: await Tempo.isAnoBissexto(datetime),
								dia_util: await Tempo.isDiaUtil(datetime,feriado),
								fim_semana: await Tempo.isFimSemana(datetime),
								feriado: await Tempo.isFeriado(feriado),
								pos_feriado: feriado.pos,
								pre_feriado: feriado.pre,
								nome_dia_semana: await Tempo.getNomeDiaSemana(datetime),
								nome_feriado: (feriado.nome)?feriado.nome:null,
								quinzena: await Tempo.getQuinzena(datetime),
								nome_mes: await Tempo.getNomeMes(datetime),
								bimestre: await Tempo.getBimestre(datetime),
								trimestre: await Tempo.getTrimestre(datetime),
								semestre: await Tempo.getSemestre(datetime),
							};
							let temp = await Tempo.create(tempo,{ transaction: t });
							tempos.push(temp);
						}
					}				
				}catch(error){
					console.log(error);
					await t.rollback();
					return res.status(400).json({error: error});
				}

				await fonte.save({ transaction: t });

			}
			await t.commit();
			return res.status(200).json({tempo: tempos});
		}
		
		if((await Fonte.findAll()).length === 0){
			res.status(404).json({message: "Ainda nenhuma fonte foi extraída para Staging Area!"});
		}else if((await Fonte.findAll({ where:{ carregado: false, } })).length === 0){
			res.status(404).json({message: "Todas fontes selecionadas já foram carregadas anteriomente!"});
		}else{
			await transformacao();
		}
	}
};