const { Model, DataTypes } = require("sequelize");
const convert = require('xml-js');
const fs = require("fs");
const util = require('util');

// Convert fs.readFile into Promise version of same    
const readFile = util.promisify(fs.readFile);

class Tempo extends Model {
	static init(connection){
		super.init({
			data: DataTypes.DATEONLY,
			hora: DataTypes.TIME,
			turno: DataTypes.STRING,
			mes: DataTypes.INTEGER,
			ano: DataTypes.INTEGER,
			dia_semana: DataTypes.INTEGER,
			dia: DataTypes.INTEGER,
			ano_bissexto: DataTypes.BOOLEAN,
			dia_util: DataTypes.BOOLEAN,
			fim_semana: DataTypes.BOOLEAN,
			feriado: DataTypes.BOOLEAN,
			pos_feriado: DataTypes.BOOLEAN,
			pre_feriado: DataTypes.BOOLEAN,
			nome_dia_semana: DataTypes.STRING,
			nome_feriado: DataTypes.STRING,
			quinzena: DataTypes.INTEGER,
			nome_mes: DataTypes.STRING,
			bimestre: DataTypes.INTEGER,
			trimestre: DataTypes.INTEGER,
			semestre: DataTypes.INTEGER			
		},{
			freezeTableName: true,
			sequelize: connection,
			tableName: "dim_tempo",
			schema: "dw"
		});
	}

	static async getMes(datetime){
		return new Promise(async (resolve, reject) => {
			if(datetime != null){ resolve((new Date(datetime)).getMonth()); }else{ reject(); }
		});
	};

	static async getAno(datetime){
		return new Promise(async (resolve, reject) => {
			if(datetime != null){ resolve((new Date(datetime)).getFullYear()); }else{ reject(); }
		});
	};

	static async getDiaSemana(datetime){
		return new Promise(async (resolve, reject) => {
			if(datetime != null){ resolve((new Date(datetime)).getDay()); }else{ reject(); }
		});
	};

	static async getDia(datetime){
		return new Promise(async (resolve, reject) => {
			if(datetime != null){ resolve((new Date(datetime)).getDate()); }else{ reject(); }
		});
	};

	static async isAnoBissexto(datetime){
		return new Promise(async (resolve, reject) => {
			if(datetime != null){ resolve((this.getAno(datetime) % 400 == 0) || (this.getAno(datetime) % 4 == 0 && this.getAno(datetime) % 100 != 0)); }else{ reject(); }
		});
	};


	static async isDiaUtil(datetime){
		return new Promise(async (resolve, reject) => {
			if(datetime != null){ resolve(((new Date(datetime)).getDay() != 0 && (new Date(datetime)).getDay() != 6 && !this.isFeriado(datetime))); }else{ reject(); }
		});
	};
	
	//Sexta, Sábado ou Domingo
	static async isFimSemana(datetime){
		return new Promise(async (resolve, reject) => {
			if(datetime != null){ resolve(((new Date(datetime)).getDay() == 0 || (new Date(datetime)).getDay() == 5 || (new Date(datetime)).getDay() == 6)); }else{ reject(); }
		});
	};

	static async getFeriado(dataOcorrencia){
		//http://www.calendario.com.br/api/api_feriados.php?token=[ZWRpbWNzN0BnbWFpbC5jb20maGFzaD01MjY0Njk4OQ]&ano=2013&estado=SERGIPE&cidade="+municipio.toUpperCase()
		let feriado = {nome: false, pre: false, pos: false};
		let file = await readFile('./app/commom/feriados.xml');
		let xml = convert.xml2json(file, {compact: false, spaces: 4});
		let events = JSON.parse(xml).elements[0].elements;
		events.forEach(e=>{
			if(typeof e.elements[0].elements !== "undefined"){
				let dataFeriado = e.elements[0].elements[0].text;
				dataFeriado = dataFeriado.substr(6,4)+"-"+dataFeriado.substr(3,2)+"-"+dataFeriado.substr(0,2);
				
				let d = new Date(dataOcorrencia);
				let pre = d.setDate(d.getDate() - 1);
				let pos = d.setDate(d.getDate() + 1);
				
				if(new Date(dataOcorrencia) == pre){
					feriado = {nome: false, pre: true, pos: false}
				}
				if(new Date(dataOcorrencia) == pos){
					feriado = {nome: false, pre: false, pos: true}
				}
				if(dataOcorrencia == dataFeriado){
					feriado = {nome: e.elements[1].elements[0].text, pre: false, pos: false}
				}
			}
		});
		return feriado;
	}

	static async isFeriado(datetime){
		return new Promise(async (resolve, reject) => {
			if(datetime != null){ resolve(false); }else{ reject(); }
		});
	};

	static async isPosFeriado(datetime){
		return new Promise(async (resolve, reject) => {
			if(datetime != null){ resolve(false); }else{ reject(); }
		});
	};

	static async isPreFeriado(datetime){
		return new Promise(async (resolve, reject) => {
			if(datetime != null){ resolve(false); }else{ reject(); }
		});
	};

	static async getNomeDiaSemana(datetime){
		return new Promise(async (resolve, reject) => {
			let nomeDiaSemana = new Array ("DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO");
			if(datetime != null){ resolve(nomeDiaSemana[await this.getDiaSemana(datetime)]); }else{ reject(); }
		});
	};

	static async getNomeFeriado(datetime){
		return new Promise(async (resolve, reject) => {
			if(datetime != null){ resolve('Nataaaaaaaaaaaal!'); }else{ reject(); }
		});
	};	
	
	static async getNomeMes(datetime){
		return new Promise(async (resolve, reject) => {
			let nomeMes = new Array ("JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO");
			if(datetime != null){ resolve(nomeMes[await this.getMes(datetime)]); }else{ reject(); }
		});
	};

	static async getQuinzena(datetime){
		return new Promise(async (resolve, reject) => {
			if(datetime != null){ resolve(((new Date(datetime)).getDate() < 16)?1:2); }else{ reject(); }
		});
	};

	static async getBimestre(datetime){
		return new Promise(async (resolve, reject) => {
			let bimestre = null;
			switch ((new Date(datetime)).getMonth()) {
				case 0:
				case 1:
					bimestre = 1;
					break;
				case 2:
				case 3:
					bimestre = 2;
					break;
				case 4:
				case 5:
					bimestre = 3;
					break;
				case 6:
				case 7:
					bimestre = 4;
					break;
				case 8:
				case 9:
					bimestre = 5;
					break;
				case 10:
				case 11:
					bimestre = 6;
					break;
			}
			if(bimestre != null){ resolve(bimestre); }else{ reject(); }
		});
	};

	static async getTrimestre(datetime){
		return new Promise(async (resolve, reject) => {
			let trimestre = null;
			switch ((new Date(datetime)).getMonth()) {
				case 0:
				case 1:
				case 2:
					trimestre = 1;
					break;
				case 3:
				case 4:
				case 5:
					trimestre = 2;
					break;
				case 6:
				case 7:
				case 8:
					trimestre = 3;
					break;
				case 9:
				case 10:
				case 11:
					trimestre = 4;
					break;
			}
			if(trimestre != null){ resolve(trimestre); }else{ reject(); }
		});
	};

	static async getSemestre(datetime){
		return new Promise(async (resolve, reject) => {
			let semestre = null;
			switch ((new Date(datetime)).getMonth()) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
					semestre = 1;
					break;
				case 6:
				case 7:
				case 8:
				case 9:
				case 10:
				case 11:
					semestre = 2;
					break;
			}
			if(semestre != null){ resolve(semestre); }else{ reject(); }
		});
	};


	static async getTurno(date,time){
		return new Promise(async (resolve, reject) => {
			let turno = null;
			let a =new Date(date+" 00:00:00");// Inicio madrugada
			let b =new Date(date+" 06:00:00");// Inicio manhã
			let c =new Date(date+" 12:00:00");// Inicio tarde
			let d =new Date(date+" 18:00:00");// Inicio noite
			let e =new Date(date+" 23:59:59");// Fim noite
			
			let f=new Date(date+" "+time);
	
			if ((f >= a) && (f < b)) {
				turno = "MADRUGADA";
			} else if ((f >= b) && (f < c)) {
				turno = "MANHÃ";
			} else if ((f >= c) && (f < d)) {
				turno = "TARDE";
			} else if ((f >= d) && (f <= e)) {
				turno = "NOITE";
			}		
			if(turno != null){ resolve(turno); }else{ reject(); }
		});
	};

}

module.exports = Tempo;