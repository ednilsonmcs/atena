const axios = require('axios').default;

const api = axios.create({
	//baseURL: "https://apistemmer.herokuapp.com",
	baseURL: "http://localhost:5000",
});

const connection  = require("../../database/index");
const Fonte = require("../../arquivo/models/Fonte");
const ItensFonte = require("../../arquivo/models/ItensFonte");
const Endereco = require("../../dw/models/Endereco");
const Tempo = require("../../dw/models/Tempo");
const JunkDescricao = require("../../dw/models/JunkDescricao");
const DescricaoFinalizacao = require("../../dw/models/DescricaoFinalizacao");
const Chamado = require("../../dw/models/Chamado");
const Tipo = require("../../dw/models/Tipo");
const Termo = require("../models/Termo");

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
				let descricao_chamado = await JunkDescricao.clean(item.historico);
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
				let termos = (await JunkDescricao.clean(item.historico)).split(" ");
				for(const termo of termos){				
					if(await Termo.findOne({attributes: ['id'], where: {termo}}) === null){
						//Se o tipo não existir cria, caso contrario pega o id
						let tipo = await Tipo.findOne({ attributes: ['id','tipo'], where: {nome: termo}});
						if(tipo === null){
							let isnum = /^\d+$/.test(termo)
							tipo = isnum?await Tipo.create({nome: termo, marca: null, tipo: 2, descricao: 'Termo Númerico'}):await Tipo.create({nome: termo, marca: null, tipo: 1, descricao: 'Termo Geral'});
						}else{
							//Só radicalizar se tipo for diferente de 2
							if(tipo.tipo == 2){							
								await Termo.create({termo, termo_stem: termo, tipo_id: tipo.id});				
							}else{
								//Radicalizo o termo
								let steam = null;
								await api.get('/steam?word='+encodeURI(termo))
								.then(function (response) {
									steam = (response.data.steam).toUpperCase();
									Termo.create({termo, termo_stem: steam, tipo_id: tipo.id});
								})
								.catch(function (error) {
									res.status(400).json({message: error});
								});	
							}
						}
					}
				}
			}
			return new Promise(async (resolve, reject) => {
				if(itens != null){ resolve({message: "Carga realizada com sucesso!"});}else{reject();}
			});
		}

		async function cargaDimTipo(itens) {
			/*
			(1) Termo Geral
			(2) Termo Númerico
			(3) Moto
			(4) Carro
			(5) Caminhão
			*/
			let count = await Tipo.findAll({attributes: ['id']});
			if(count.length == 0){
				//Ler "Dicionário de Tipos"
			}
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
				try{
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
				} catch (error) {
					res.status(400).json({message: error});
					return false;
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
				descricao_chamado = await JunkDescricao.clean(descricao_chamado);
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
							id: fontesid
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
											//Ver como fazer, pois aqui é os dicionários; Deve passar como parâmetro ou passar antes? Ou pegar via diretorio?
											await cargaDimTipo(itens);
											break;
										case "junk_descricao":
											await cargaJunkDescricao(itens);
											break;											
									}
								} catch (error) {
									console.log(error);
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
				console.log(error)
				res.status(400).json({message: error});
				return false;
			}
			//await t.commit();
			res.status(200).json({message: "Cargas realizadas com sucesso!"});
		}

		if((await Fonte.findAll({attributes: ['id']})).length === 0){
			res.status(400).json({message: "Ainda nenhuma fonte foi extraída para Staging Area!"});
		}else if((await Fonte.findAll({ attributes: ['id'], where:{ carregado: false } })).length === 0){
			res.status(400).json({message: "Todas fontes selecionadas já foram carregadas anteriomente!"});
		}else{
			await carga();
		}
	}
};