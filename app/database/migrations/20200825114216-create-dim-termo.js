"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("dim_termo", { 
			id:{
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			termo: {
				allowNull: false,
				type: Sequelize.STRING(40)
			},
			termo_stem: {
				allowNull: false,
				type: Sequelize.STRING(30)
			},
			tipo_id:{
				allowNull: false,
				type: Sequelize.INTEGER,
				references: {
					model: {tableName: "dim_tipo", schema: "dw"},
					key: "id"
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE"
			},
			created_at: {
				type: Sequelize.DATE,
				allowNull: false 
			},
			updated_at:{
				type: Sequelize.DATE,
				allowNull: false
			}    
		},
		{
			schema: "dw"
		});
	},

	down: (queryInterface) => {
		return queryInterface.dropTable("dim_termo");
	}
};
