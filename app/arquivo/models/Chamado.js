const { Model, DataTypes } = require("sequelize");

class Chamado extends Model{
	static init(connection){
		super.init({
			nome: DataTypes.STRING,
			email: DataTypes.STRING,
		},{
			sequelize: connection
		});
	}
}

module.exports = Chamado;