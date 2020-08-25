"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("chamados", { 
			id: {
				type: Sequelize.INTEGER ,
				primaryKey: true,  
				autoIncrement: true,  
				allowNull: false
			},
			nome:{
				type: Sequelize.STRING,
				allowNull: false
			},
			email:{
				type: Sequelize.STRING,
				allowNull: false
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
			schema: "sa"
		});


	},

	down: (queryInterface) => {
		return queryInterface.dropTable("chamados");
	}
};
