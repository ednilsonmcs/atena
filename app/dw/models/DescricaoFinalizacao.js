const { Model, DataTypes } = require("sequelize");

class DescricaoFinalizacao extends Model {
	static init(connection){
		super.init({
			nome: DataTypes.STRING
		},{
			freezeTableName: true,
			sequelize: connection,
			tableName: "dim_descricao_finalizacao",
			schema: "dw"
		});
	}

}

module.exports = DescricaoFinalizacao;