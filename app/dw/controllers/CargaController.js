const connection  = require("../../database/index");
const Fonte = require("../../arquivo/models/Fonte");
const ItensFonte = require("../../arquivo/models/ItensFonte");
const Endereco = require("../../dw/models/Endereco");
const Tempo = require("../../dw/models/Tempo");
const JunkDescricao = require("../../dw/models/JunkDescricao");
const DescricaoFinalizacao = require("../../dw/models/DescricaoFinalizacao");
const Chamado = require("../../dw/models/Chamado");

module.exports = {
	async store(req,res){
		const federacao = 'BRA';
		
		async function cargaFatoTermo(itens) {
			for(const item of itens){
	
			}
			return new Promise(async (resolve, reject) => {
				if(itens != null){ resolve({message: "Carga realizada com sucesso!"});}else{reject();}
			});
		}
		
		async function cargaFatoChamado(itens) {
			let fato_chamado;
			for(const item of itens){
				let descricao_chamado = await JunkDescricao.retirarAcentos(await JunkDescricao.retirarPontuacao(await JunkDescricao.extrairRepeticao(await JunkDescricao.retirarStopWords(item.historico))));
				let junk_descricao = await JunkDescricao.findOne({where:{descricao_chamado}});
				let tempo = await Tempo.findOne({ where:{ data: item.data, hora: item.hora }});
				let endereco = await Endereco.findOne({ where:{ logradouro: item.endereco, bairro: item.bairro, municipio: item.municipio, estado: item.estado, federacao }});
				let descricao_finalizacao = await DescricaoFinalizacao.findOne({ where: {nome: item.descricao_finalizacao}});
			
				if(junk_descricao && tempo && endereco && descricao_finalizacao)
					fato_chamado = await Chamado.create({ descricao_id: junk_descricao.id, tempo_id: tempo.id, endereco_id: endereco.id, finalizacao_id: descricao_finalizacao.id })
			}
			return new Promise(async (resolve, reject) => {
				if(typeof(fato_chamado) != 'undefined'){ resolve({message: "Carga realizada com sucesso!"});}else{reject({message: "Fato sem dimensões."});}
			});
		}
		
		async function cargaDescricaoFinalizacao(itens) {
			for(const item of itens){
				if(await DescricaoFinalizacao.findOne({ where: {nome: item.descricao_finalizacao}}) === null){
					await DescricaoFinalizacao.create({nome: item.descricao_finalizacao})
				}
			} 
			return new Promise(async (resolve, reject) => {
				if(itens != null){ resolve({message: "Carga realizada com sucesso!"});}else{reject();}
			});
		}
		
		async function cargaDimTermo(itens) {
			for(const item of itens){
	
			}
			return new Promise(async (resolve, reject) => {
				if(itens != null){ resolve({message: "Carga realizada com sucesso!"});}else{reject();}
			});
		}

		async function cargaDimTipo(itens) {
			for(const item of itens){
	
			}
			return new Promise(async (resolve, reject) => {
				if(itens != null){ resolve({message: "Carga realizada com sucesso!"});}else{reject();}
			});
		}
		
		async function cargaEndereco(itens) {
			for(const item of itens){
				if(await Endereco.findOne({ where:{ logradouro: item.endereco, bairro: item.bairro, municipio: item.municipio, estado: item.estado, federacao }}) === null){
					let endereco = {
						logradouro: item.endereco,
						bairro: item.bairro,
						municipio: item.municipio,
						estado: item.estado,
						federacao
					};
					await Endereco.create(endereco);
				}
			}
			return new Promise(async (resolve, reject) => {
				if(itens != null){ resolve({message: "Carga realizada com sucesso!"});}else{reject();}
			});
		}

		async function cargaTempo(itens) {
			for(const item of itens){
				if(await Tempo.findOne({ where:{ data: item.data, hora: item.hora }}) === null){
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
					await Tempo.create(tempo);
				}
			}
			return new Promise(async (resolve, reject) => {
				if(itens != null){ resolve({message: "Carga realizada com sucesso!"});}else{reject();}
			});
		}

		async function cargaJunkDescricao(itens) {
			for(const item of itens){
				//Preprocessar
				let  descricao_chamado = item.historico;
				descricao_chamado = await JunkDescricao.retirarAcentos(await JunkDescricao.retirarPontuacao(await JunkDescricao.extrairRepeticao(await JunkDescricao.retirarStopWords(descricao_chamado))));

				if(await JunkDescricao.findOne({where:{descricao_chamado: descricao_chamado}}) == null){
					await JunkDescricao.create({ descricao_chamado: descricao_chamado });
				}
			}
			return new Promise(async (resolve, reject) => {
				if(itens != null){ resolve({message: "Carga realizada com sucesso!"});}else{reject();}
			});
		}

		async function carga() {
			const {fontesid, tabelas, userid} = await req.body;
			//const t = await connection.transaction();
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
											await cargaTempo(itens);
											break;
										case "dim_endereco":
											await cargaEndereco(itens);
											break;
										case "dim_descricao_finalizacao":
											await cargaDescricaoFinalizacao(itens);
											break;
										case "dim_termo":
											await cargaDimTermo(itens);
											break;
										case "dim_tipo":
											await cargaDimTipo(itens);
											break;
										case "junk_descricao":
											await cargaJunkDescricao(itens);
											break;											
									}
								} catch (error) {
									console.log(error)
								}
							}
							// Quando passada tabelas dimensões e fatos, só posso tentar realizar a carga das fatos depois das dimensões. Por isso as codições a seguir não estão no switch acima.
							if(tabelas.indexOf("") !== -1){
								await cargaFatoTermo(itens);
							}
							if(tabelas.indexOf("fato_chamado") !== -1){
								await cargaFatoChamado(itens);
							}
						}else{			
							//await t.rollback();	
							res.status(400).json({message: "Ao menos uma tabela do DW deve ser selecionada!"});
							return false;
						}				
					}
				}else{
					//await t.rollback();
					res.status(400).json({message: "Ao menos uma fonte de dados deve ser selecionada!"});
					return false;
				}			
			} catch (error) {
				//await t.rollback();
				res.status(400).json({message: error});
				return false;
			}
			//await t.commit();
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