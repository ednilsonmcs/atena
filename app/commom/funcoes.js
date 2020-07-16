const Excel = require("exceljs");
const fs = require("fs");
const moment = require("moment");
const util = require("util");
const readdir = util.promisify(fs.readdir);

exports.getFile = async (path,hash) => {
	let filePath = null;
	let arquivos = null;

	try {
		arquivos = await readdir(path);
		if(arquivos === undefined){
			return false;
		}else{
			arquivos.forEach(function (file) {
				let nameFile = file.split("-");
				if(nameFile[0] ==  hash){
					filePath = path+"/"+file;
				}
			});
		}
		return filePath;
	} catch (error) {        
		console.log(error);
		return false;
	}

};

exports.carregarWorksheet = async (path) => { 
	return new Promise(async (resolve, reject) => {
		let worksheet;
        
		if (fs.existsSync(path)) {
			const workbook = new Excel.Workbook();
			var sheet = "Plan1";
			await workbook.xlsx.readFile(path)
				.then(() => { worksheet = workbook.getWorksheet(sheet); });    
		} 

		if(true){
			resolve(worksheet);
		}else{
			reject();
		}
	});
};

exports.getValuesRow = (ws) => {
	ws.eachRow({ includeEmpty: true }, function(row, rowNumber) {
		console.log("Row " + rowNumber + " = " + JSON.stringify(row.values));
	});
};

exports.getValuesRowByIndex = (ws,index) => {
	const data = ws.getRow(index).values[1];
	const hora = ws.getRow(index).values[3];
	const datahora = data +" "+ hora;

	return {
		data: moment(datahora, "DD/MM/YYYY HH:mm:ss", "pt"),
		dia_semana: ws.getRow(index).values[2],
		endereco: ws.getRow(index).values[4],
		bairro: ws.getRow(index).values[5],
		municipio: ws.getRow(index).values[6],
		cod_tipo: ws.getRow(index).values[7],
		descricao: ws.getRow(index).values[8],
		cod_sub_tipo: ws.getRow(index).values[9],
		desc_sub_tipo: ws.getRow(index).values[10],
		situacao_encontrada: ws.getRow(index).values[11],
		descricao_finalizacao: ws.getRow(index).values[12],
		historico: ws.getRow(index).values[13],
	};
};