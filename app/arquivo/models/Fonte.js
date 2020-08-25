const { Model, DataTypes } = require("sequelize");

class Fonte extends Model {
	static init(connection){
		super.init({
			nome: DataTypes.STRING,
			hash: DataTypes.STRING,
			quantidade_registros: DataTypes.INTEGER,
			usuario: DataTypes.STRING,
			carregado: DataTypes.BOOLEAN,
		},{
			freezeTableName: true,
			sequelize: connection,
			tableName: "fonte",
			schema: "sa"
		});
	}
}

module.exports = Fonte;