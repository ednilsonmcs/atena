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

	static getMes(){return 'Hello Word!';};
	static getAno(){return 'Hello Word!';};
	static getDiaSemana(){return 'Hello Word!';};
	static getDia(){return 'Hello Word!';};
	static isAnoBissexto(){return 'Hello Word!';};
	static isDiaUtil(){return 'Hello Word!';};
	static isFimSemana(){return 'Hello Word!';};
	static isFeriado(){return 'Hello Word!';};
	static isPosFeriado(){return 'Hello Word!';};
	static isPreFeriado(){return 'Hello Word!';};
	static getNomeDiaSemana(){return 'Hello Word!';};
	static getNomeFeriado(){return 'Hello Word!';};
	static getNomeMes(){return 'Hello Word!';};
	static getQuinzena(){return 'Hello Word!';};
	static getBimestre(){return 'Hello Word!';};
	static getTrimestre(){return 'Hello Word!';};
	static getSemestre(){return 'Hello Word!';};

}

module.exports = Tempo;