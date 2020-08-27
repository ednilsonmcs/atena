"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("junk_descricao", { 
			id: {
				primaryKey:true,
				autoIncrement: true,
				allowNull: false,
				type: Sequelize.INTEGER
			},
			descricao_chamado: {
				allowNull: false,
				type: Sequelize.TEXT("long")
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
		return queryInterface.dropTable("junk_descricao");
	}
};
