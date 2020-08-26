const { Model, DataTypes } = require("sequelize");

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

	static getMes(datetime){
		return (new Date(datetime)).getMonth();
	};

	static getAno(datetime){return (new Date(datetime)).getFullYear()};

	static getDiaSemana(datetime){return (new Date(datetime)).getDay()};

	static getDia(datetime){return (new Date(datetime)).getDate()};

	static isAnoBissexto(datetime){
		return(this.getAno(datetime) % 400 == 0) || (this.getAno(datetime) % 4 == 0 && this.getAno(datetime) % 100 != 0);
	};


	static isDiaUtil(datetime){ return ((new Date(datetime)).getDay() != 0 && (new Date(datetime)).getDay() != 6 && !this.isFeriado(datetime))};
	
	//Sexta, Sábado ou Domingo
	static isFimSemana(datetime){ return ((new Date(datetime)).getDay() == 0 || (new Date(datetime)).getDay() == 5 || (new Date(datetime)).getDay() == 6)};

	static isFeriado(datetime){return false;};

	static isPosFeriado(datetime){
		return 'Hello Word!';
	};

	static isPreFeriado(datetime){
		return 'Hello Word!';
	};

	static getNomeDiaSemana(datetime){
		let nomeDiaSemana = new Array ("DOMINGO", "SEGUNDA", "TERÇA", "QUARTA", "QUINTA", "SEXTA", "SÁBADO");
		return nomeDiaSemana[this.getDiaSemana(datetime)];
	};

	static getNomeFeriado(datetime){
		return 'Nataaaaaaaaaaaal!';
	};	
	
	static getNomeMes(datetime){
		let nomeMes = new Array ("JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "AGOSTO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO");
		return nomeMes[this.getMes(datetime)];
	};

	static getQuinzena(datetime){
		return ((new Date(datetime)).getDate() < 16)?1:2;
	};

	static getBimestre(datetime){
		switch ((new Date(datetime)).getMonth()) {
            case 0:
            case 1:
                return 1;
                break;
            case 2:
            case 3:
                return 2;
                break;
            case 4:
            case 5:
                return 3;
                break;
            case 6:
            case 7:
                return 4;
                break;
            case 8:
            case 9:
                return 5;
                break;
            case 10:
            case 11:
                return 6;
                break;
        }
	};

	static getTrimestre(datetime){
		switch ((new Date(datetime)).getMonth()) {
            case 0:
            case 1:
            case 2:
                return 1;
                break;
            case 3:
            case 4:
            case 5:
                return 2;
                break;
            case 6:
            case 7:
            case 8:
                return 3;
                break;
            case 9:
            case 10:
            case 11:
                return 4;
                break;
        }
	};

	static getSemestre(datetime){
		switch ((new Date(datetime)).getMonth()) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
                return 1;
                break;
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
                return 2;
                break;
        }
	};


	static getTurno(date,time){
		let a =new Date(date+" 00:00:00");// Inicio madrugada
        let b =new Date(date+" 06:00:00");// Inicio manhã
        let c =new Date(date+" 12:00:00");// Inicio tarde
        let d =new Date(date+" 18:00:00");// Inicio noite
        let e =new Date(date+" 23:59:59");// Fim noite
		
		let f=new Date(date+" "+time);

		if ((f >= a) && (f < b)) {
            return "MADRUGADA";
        } else if ((f >= b) && (f < c)) {
            return "MANHÃ";
        } else if ((f >= c) && (f < d)) {
            return "TARDE";
        } else if ((f >= d) && (f <= e)) {
            return "NOITE";
		}		
	};

}

module.exports = Tempo;