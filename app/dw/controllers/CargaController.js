const connection  = require("../../database/index");
const Fonte = require("../../arquivo/models/Fonte");
const ItensFonte = require("../../arquivo/models/ItensFonte");
const Endereco = require("../../dw/models/Endereco");
const Tempo = require("../../dw/models/Tempo");
const JunkDescricao = require("../../dw/models/JunkDescricao");

module.exports = {
	async store(req,res){

		async function carga () {
			const federacao = 'BRA';
			const {fontesid, tabelas, userid} = await req.body;
			const t = await connection.transaction();
			try {
				if(typeof(fontesid) !== 'undefined' && fontesid.length > 0){
					let fontes = await Fonte.findAll({
						where:{
							carregado: false,
						}
					});
					for(let fonte of fontes){
						let itens = await ItensFonte.findAll({
							where:{
								fonte_id: fonte.id
							}
						});
					
						if(tabelas.length > 0){
							for(const tabela of tabelas){
								try {
									switch(tabela){
										case "fato_termo":
											console.log("Realizando carga da tabela: "+tabela);
											for(const item of itens){
	
											}
											break;
										case "fato_chamado":
											console.log("Realizando carga da tabela: "+tabela);
											for(const item of itens){
	
											}
											break;
										case "dim_tempo":
											console.log("Realizando carga da tabela: "+tabela);
											for(const item of itens){
												if(await Tempo.findOne({ where:{ data: item.data, hora: item.hora } }) === null){
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
													await Tempo.create(tempo,{ transaction: t });
												}
											}
											break;
										case "dim_endereco":
											console.log("Realizando carga da tabela: "+tabela);
											for(const item of itens){
												if(await Endereco.findOne({ where:{ logradouro: item.endereco, bairro: item.bairro, municipio: item.municipio, estado: item.estado, federacao } }) === null){
													let endereco = {
														logradouro: item.endereco,
														bairro: item.bairro,
														municipio: item.municipio,
														estado: item.estado,
														federacao
													};
													await Endereco.create(endereco,{ transaction: t });
												}
											}
											break;
										case "dim_descricao_finalizacao":
											console.log("Realizando carga da tabela: "+tabela);
											for(const item of itens){
	
											}
											break;
										case "dim_termo":
											console.log("Realizando carga da tabela: "+tabela);
											for(const item of itens){
	
											}
											break;
										case "dim_tipo":
											console.log("Realizando carga da tabela: "+tabela);
											for(const item of itens){
	
											}
											break;
										case "junk_descricao":
											console.log("Realizando carga da tabela: "+tabela);
											for(const item of itens){
												//Preprocessar
												let  descricao_chamado = item.historico;
												descricao_chamado = await JunkDescricao.retirarAcentos(await JunkDescricao.retirarPontuacao(await JunkDescricao.extrairRepeticao(await JunkDescricao.retirarStopWords(descricao_chamado))));

												if(await JunkDescricao.findOne({where:{descricao_chamado: descricao_chamado}}) == null){
													await JunkDescricao.create({ descricao_chamado: descricao_chamado },{ transaction: t });
												}
											}
											break;
									}
								} catch (error) {
									console.log(error)
								}
							}
						}else{				
							res.status(400).json({message: "Ao menos uma tabela do DW deve ser selecionada!"});
						}				
					}
				}			
			} catch (error) {
				res.status(400).json({message: error});
				await t.rollback();
			}
	
			await t.commit();
			res.status(200).json({message: "Começo de história!"});
		}

		if((await Fonte.findAll()).length === 0){
			res.status(400).json({message: "Ainda nenhuma fonte foi extraída para Staging Area!"});
		}else if((await Fonte.findAll({ where:{ carregado: false, } })).length === 0){
			res.status(400).json({message: "Todas fontes selecionadas já foram carregadas anteriomente!"});
		}else{
			await carga();
		}
	}
};