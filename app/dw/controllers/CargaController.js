const connection  = require("../../database/index");
const Fonte = require("../../arquivo/models/Fonte");
const ItensFonte = require("../../arquivo/models/ItensFonte");
const Endereco = require("../../dw/models/Endereco");
const Tempo = require("../../dw/models/Tempo");
const JunkDescricao = require("../../dw/models/JunkDescricao");

module.exports = {
	async store(req,res){

		async function cargaFatoTermo(itens,transaction) {
			for(const item of itens){
	
			}
			return new Promise(async (resolve, reject) => {
				if(itens != null){ resolve({message: "Carga realizada com sucesso!"});}else{reject();}
			});
		}
		
		async function cargaFatoChamado(itens,transaction) {
			for(const item of itens){
	
			}
			return new Promise(async (resolve, reject) => {
				if(itens != null){ resolve({message: "Carga realizada com sucesso!"});}else{reject();}
			});
		}
		
		async function cargaDescricaoFinalizacao(itens,transaction) {
			for(const item of itens){
	
			}
			return new Promise(async (resolve, reject) => {
				if(itens != null){ resolve({message: "Carga realizada com sucesso!"});}else{reject();}
			});
		}
		
		async function cargaDimTermo(itens,transaction) {
			for(const item of itens){
	
			}
			return new Promise(async (resolve, reject) => {
				if(itens != null){ resolve({message: "Carga realizada com sucesso!"});}else{reject();}
			});
		}

		async function cargaDimTipo(itens,transaction) {
			for(const item of itens){
	
			}
			return new Promise(async (resolve, reject) => {
				if(itens != null){ resolve({message: "Carga realizada com sucesso!"});}else{reject();}
			});
		}
		
		async function cargaEndereco(itens,transaction) {
			const federacao = 'BRA';
			for(const item of itens){
				if(await Endereco.findOne({ where:{ logradouro: item.endereco, bairro: item.bairro, municipio: item.municipio, estado: item.estado, federacao } }) === null){
					let endereco = {
						logradouro: item.endereco,
						bairro: item.bairro,
						municipio: item.municipio,
						estado: item.estado,
						federacao
					};
					await Endereco.create(endereco,{ transaction });
				}
			}
			return new Promise(async (resolve, reject) => {
				if(itens != null){ resolve({message: "Carga realizada com sucesso!"});}else{reject();}
			});
		}

		async function cargaTempo(itens,transaction) {
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
					await Tempo.create(tempo,{ transaction });
				}
			}
			return new Promise(async (resolve, reject) => {
				if(itens != null){ resolve({message: "Carga realizada com sucesso!"});}else{reject();}
			});
		}

		async function cargaJunkDescricao(itens,transaction) {
			for(const item of itens){
				//Preprocessar
				let  descricao_chamado = item.historico;
				descricao_chamado = await JunkDescricao.retirarAcentos(await JunkDescricao.retirarPontuacao(await JunkDescricao.extrairRepeticao(await JunkDescricao.retirarStopWords(descricao_chamado))));

				if(await JunkDescricao.findOne({where:{descricao_chamado: descricao_chamado}}) == null){
					await JunkDescricao.create({ descricao_chamado: descricao_chamado },{ transaction });
				}
			}
			return new Promise(async (resolve, reject) => {
				if(itens != null){ resolve({message: "Carga realizada com sucesso!"});}else{reject();}
			});
		}

		async function carga() {
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
										case "dim_tempo":
											await cargaTempo(itens,t);
											break;
										case "dim_endereco":
											await cargaEndereco(itens,t);
											break;
										case "dim_descricao_finalizacao":
											await cargaDescricaoFinalizacao(itens,t);
											break;
										case "dim_termo":
											await cargaDimTermo(itens,t);
											break;
										case "dim_tipo":
											await cargaDimTipo(itens,t);
											break;
										case "junk_descricao":
											await cargaJunkDescricao(itens,t);
											break;
										case "fato_termo":
											await cargaFatoTermo(itens,t);
											break;
										case "fato_chamado":
											await cargaFatoChamado(itens,t);
											break;											
									}
								} catch (error) {
									console.log(error)
								}
							}
						}else{			
							await t.rollback();	
							res.status(400).json({message: "Ao menos uma tabela do DW deve ser selecionada!"});
						}				
					}
				}else{
					await t.rollback();
					res.status(400).json({message: "Ao menos uma fonte de dados deve ser selecionada!"});
				}			
			} catch (error) {
				await t.rollback();
				res.status(400).json({message: error});
			}
	
			await t.commit();
			res.status(200).json({message: "Cargas realizadas com sucesso!"});
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