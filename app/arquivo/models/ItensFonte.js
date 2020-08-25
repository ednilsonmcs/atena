const { Model, DataTypes } = require("sequelize");

class ItensFontes extends Model {
	static init(connection){
		super.init({
			data: DataTypes.DATE,
			dia_semana: DataTypes.STRING,
			hora: DataTypes.TIME,
			endereco: DataTypes.TEXT,
			bairro: DataTypes.STRING,
			municipio: DataTypes.STRING,
			cod_tipo: DataTypes.STRING,
			descricao: DataTypes.TEXT,
			cod_sub_tipo: DataTypes.STRING,
			desc_sub_tipo: DataTypes.STRING,
			sit_encontrada: DataTypes.TEXT,
			descricao_finalizacao: DataTypes.TEXT,
			historico: DataTypes.TEXT
		},{
			freezeTableName: true,
			sequelize: connection,
			tableName: "itensfonte",
			schema: "sa"
		});
	}

	static associate(models){
		this.belongsTo(models.Fonte, {foreignKey: "fonte_id", as: "fonte"});
	}
}

module.exports = ItensFontes;