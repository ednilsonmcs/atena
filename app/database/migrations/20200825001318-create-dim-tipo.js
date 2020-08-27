"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("dim_tipo", { 
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			nome: {
				allowNull: false,
				type: Sequelize.STRING(30)
			},
			marca: {
				allowNull: true,
				type: Sequelize.STRING(30)
			},
			tipo: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			descricao: {
				allowNull: false,
				type: Sequelize.STRING(30)
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
		return queryInterface.dropTable("dim_tipo");
	}
};
