"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("itensfonte", {
			id: {
				type: Sequelize.INTEGER,
				primaryKey: true,  
				autoIncrement: true,  
				allowNull: false
			},
			data : {
				type:Sequelize.DATEONLY,
				allowNull: false
			},
			hora : {
				type:Sequelize.TIME,
				allowNull: false
			},
			dia_semana :{
				type:Sequelize.STRING,
				allowNull: true
			},
			endereco:{
				type:Sequelize.TEXT,
				allowNull: true
			},
			bairro:{
				type:Sequelize.STRING,
				allowNull: true
			},
			municipio:{
				type:Sequelize.STRING,
				allowNull: true
			},
			cod_tipo:{
				type:Sequelize.STRING,
				allowNull: true
			},
			descricao:{
				type:Sequelize.TEXT,
				allowNull: true
			},
			cod_sub_tipo:{
				type:Sequelize.STRING,
				allowNull: true
			},
			desc_sub_tipo:{
				type:Sequelize.STRING,
				allowNull: true
			},
			sit_encontrada:{
				type:Sequelize.STRING,
				allowNull: true
			},
			descricao_finalizacao:{
				type:Sequelize.TEXT,
				allowNull: true
			},
			historico:{
				type:Sequelize.TEXT,
				allowNull: true
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

	down: (queryInterface ) => {
		return queryInterface.dropTable("itensfonte");
	}
};

