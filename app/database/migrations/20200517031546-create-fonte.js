"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("fonte", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,  
				autoIncrement: true,  
				allowNull: false
			},
			nome:{
				type: Sequelize.STRING,
				allowNull: false
			},
			hash:{
				type: Sequelize.STRING,
				allowNull: false
			},
			quantidade_registros:{
				type: Sequelize.INTEGER,
				allowNull: false
			},
			usuario:{
				type: Sequelize.STRING,
				allowNull: false
			},
			carregado:{
				type: Sequelize.STRING,
				allowNull: false,
				defaultValue: false
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
		  schema: 'sa'
		});
	},

	down: (queryInterface) => {
		return queryInterface.dropTable("fonte");
	}
};
