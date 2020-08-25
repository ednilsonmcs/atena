
const fs = require("fs");
const { PATH_FONTE } = require("../../config/env.config");

module.exports = {
	async listar(req,res){
		let listFiles = [];
		fs.readdir(PATH_FONTE, (err, files) => {
			files.forEach(name => {
				let metaFile = name.split("-");
				let metaType = name.split(".");
				let hash = metaFile[0];
				let type = metaType[1];
				listFiles.push({ hash, name, type });
			});
			return res.json(listFiles);
		});
	},
	async listarByHash(req,res){
		let listFiles = [];
		fs.readdir(PATH_FONTE, (err, files) => {
			files.forEach(name => {
				let metaFile = name.split("-");
				let metaType = name.split(".");
				let hash = metaFile[0];
				let type = metaType[1];
				if(req.params.hash == hash){
					listFiles.push({ hash, name, type });
				}
			});
			return res.json(listFiles);
		});
	}
};