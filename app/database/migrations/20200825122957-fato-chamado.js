"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("fato_chamado", { 
			id: {
				allowNull: false,
				autoIncremente: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			descricao_id: {
				allowNull: false,
				primaryKey: true,
				references: {
					model: {tableName: "junk_descricao", schema: "dw"},
					key: "id"
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
				type: Sequelize.INTEGER
			},
			tempo_id: {
				allowNull: false,
				references: {
					model: {tableName: "dim_tempo", schema: "dw"},
					key: "id"
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
				type: Sequelize.INTEGER
			},
			endereco_id: {
				allowNull: false,
				references: {
					model: {tableName: "dim_endereco", schema: "dw"},
					key: "id"
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
				type: Sequelize.INTEGER
			},
			finalizacao_id: {
				allowNull: false,
				references: {
					model: {tableName: "dim_descricao_finalizacao", schema: "dw"},
					key: "id"
				},
				onUpdate: "CASCADE",
				onDelete: "CASCADE",
				type: Sequelize.INTEGER
			}         
		},
		{
			schema: "dw"
		});
	},

	down: (queryInterface) => {
		return queryInterface.dropTable("fato_chamado");
	}
};
