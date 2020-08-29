const ItensFonte = require("../../arquivo/models/ItensFonte");
const Fonte = require("../../arquivo/models/Fonte");
const Tempo = require("../../dw/models/Tempo");
const connection  = require("../../database/index");

module.exports = {
	async store(req,res){

		let tempos = [];
		async function transformacao(){
			let fontes = await Fonte.findAll({
				where:{
					carregado: false,
				}
			});
			
			for(fonte of fontes){
				let itens = await ItensFonte.findAll({
					where:{
						fonte_id: fonte.id
					}
				});

				const t = await connection.transaction();
				try{
					for(item of itens){
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
					await t.commit();
				}catch(error){
					console.log(error)
					await t.rollback();
				}
			}
		}

		await transformacao();

		return res.json({tempo: tempos});
	}
};