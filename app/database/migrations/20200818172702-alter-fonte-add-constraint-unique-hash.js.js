"use strict";

module.exports = {
	up: (queryInterface) => {
		return queryInterface.addConstraint(
			{
				tableName: "fonte",
				schema: "sa"
			},
			["hash"],
			{
				type: "unique",
				name: "hashUnico",
			});
	},

	down: (queryInterface) => {
		return queryInterface.removeConstraint({
			tableName: "fonte",
			schema: "sa"
		}, "hashUnico");
	}
};