"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.addColumn({
			tableName: "itensfonte",
			schema: "sa"
		},"fonte_id",{
			type: Sequelize.INTEGER,
			allowNull: false,
			references: { 
				model: {
					tableName: "fonte",
					schema: "sa"
				}, 
				key: "id" 
			},
			onUpdate: "CASCADE",
			onDelete: "CASCADE"
		});
	},

	down: (queryInterface) => {
		return queryInterface.removeColumn({
			tableName: "itensfonte",
			schema: "sa"
		}, "fonte_id");
	}
};
