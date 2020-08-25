"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("dim_descricao_finalizacao", { 
			id: {
				autoIncrement: true,
				primaryKey: true,
				allowNull: false,
				type: Sequelize.INTEGER 
			},
			nome: {
				allowNull: false,
				type: Sequelize.STRING(34)
			}
		},
		{
			schema: "dw"
		});
	},

	down: (queryInterface) => {
		return queryInterface.dropTable("dim_descricao_finalizacao");
	}
};
