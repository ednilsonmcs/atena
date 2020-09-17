const { Model, DataTypes } = require("sequelize");

class Tipo extends Model {
	static init(connection){
		super.init({
			nome: DataTypes.STRING,
			marca: DataTypes.STRING,
			tipo: DataTypes.STRING,
			descricao: DataTypes.STRING
		},{
			freezeTableName: true,
			sequelize: connection,
			tableName: "dim_tipo",
			schema: "dw"
		});
	}

}

module.exports = Tipo;