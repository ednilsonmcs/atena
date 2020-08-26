const ItensFonte = require("../../arquivo/models/ItensFonte");
const Fonte = require("../../arquivo/models/Fonte");
const ItensFontes = require("../../arquivo/models/ItensFonte");
const Tempo = require("../../dw/models/Tempo");

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
				let itens = await ItensFontes.findAll({
					where:{
						fonte_id: fonte.id
					}
				});

				for(item of itens){
					const datetime = item.data+" "+item.hora;
					let tempo = {
						data: item.data,
						hora:item.hora,
						turno: Tempo.getTurno(item.data,item.hora),
						mes: Tempo.getMes(datetime),
						ano: Tempo.getAno(datetime),
						dia_semana: Tempo.getDiaSemana(datetime),
						dia: Tempo.getDia(datetime),
						ano_bissexto: Tempo.isAnoBissexto(datetime),
						dia_util: Tempo.isDiaUtil(datetime),
						fim_semana: Tempo.isFimSemana(datetime),
						feriado: Tempo.isFeriado(datetime),
						pos_feriado: false,
						pre_feriado: false,
						nome_dia_semana: Tempo.getNomeDiaSemana(datetime),
						nome_feriado: Tempo.getNomeFeriado(datetime),
						quinzena: Tempo.getQuinzena(datetime),
						nome_mes: Tempo.getNomeMes(datetime),
						bimestre: Tempo.getBimestre(datetime),
						trimestre: Tempo.getTrimestre(datetime),
						semestre: Tempo.getSemestre(datetime),
					}
					let t = await Tempo.create(tempo);
					tempos.push(t)
				}
			}
		}

		await transformacao();

		return res.json({tempo: tempos});
	}
};