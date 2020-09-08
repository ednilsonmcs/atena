const { Model, DataTypes } = require("sequelize");

class Endereco extends Model {
	static init(connection){
		super.init({
			logradouro: DataTypes.STRING,
			bairro: DataTypes.STRING,
			municipio: DataTypes.STRING,
			estado: DataTypes.STRING,
			federacao: DataTypes.STRING
		},{
			freezeTableName: true,
			sequelize: connection,
			tableName: "dim_endereco",
			schema: "dw"
		});
	}

}

module.exports = Endereco;