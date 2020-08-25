"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("fato_termo", { 
			termo_id: {
				primaryKey: true,
				references: {
					model: { tableName: "dim_termo", schema: "dw"},
					key: "id"           
				}, 
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
				type: Sequelize.INTEGER 
			},
			fato_id: {
				primaryKey: true,
				references: {
					model: { tableName: "fato_chamado", schema: "dw"},
					key: "id"           
				}, 
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
				type: Sequelize.INTEGER 
			},
			descricao_id: {
				primaryKey: true,
				references: {
					model: { tableName: "fato_chamado", schema: "dw"},
					key: "id"           
				}, 
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
				type: Sequelize.INTEGER 
			},
		},
		{
			schema: "dw"
		});
	},

	down: (queryInterface) => {
		return queryInterface.dropTable("fato_termo");
	}
};
