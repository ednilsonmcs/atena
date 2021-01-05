const { Model, DataTypes } = require("sequelize");

class Termo extends Model {
	static init(connection){
		super.init({
			termo: DataTypes.STRING,
			termo_stem: DataTypes.STRING
		},{
			freezeTableName: true,
			sequelize: connection,
			tableName: "dim_termo",
			schema: "dw"
		});
    }
    
	static associate(models){
		this.belongsTo(models.Tipo, {foreignKey: "tipo_id", as: "dim_tipo"});
	}
}

module.exports = Termo;