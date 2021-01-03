const { Model, DataTypes } = require("sequelize");
const fs = require("fs");
const util = require('util');
const readFile = util.promisify(fs.readFile);

class JunkDescricao extends Model {
	static init(connection){
		super.init({
			descricao_chamado: DataTypes.STRING
		},{
			freezeTableName: true,
			sequelize: connection,
			tableName: "junk_descricao",
			schema: "dw"
		});
	}

	static async extrairRepeticao(descricao) {
		let t = descricao.split(" ");
        let rept = 0, cont = 1;
        //Percorre cada palavras
        for (let i = 0; i < t.length; i++) {
            //Percorre cada caracter
            for (let y = 0; y < t[i].length - 1; y++) {
                if ((y < t[i].length) && (t[i].charAt(y) == t[i].charAt(y + 1))) {
					rept++;
                    if (rept == 3) {
                        t[i] = "";
                    }
                }
            }
			rept = 0;		
		}

        let resultado = "";

        for (let i = 0; i < t.length; i++) {
            if (t[i].length != 0) {
                if (resultado.length != 0) {
                    resultado = resultado + " " + t[i];
                } else {
                    resultado = resultado + t[i];
                }
            }
        }

		return new Promise(async (resolve, reject) => {
			if(descricao != null){ resolve(resultado); }else{ reject(); }
		});
	}
		
	static async retirarAcentos(descricao) {
		const vogaisAcento = ["à", "á", "â", "ã", "è", "é", "ê", "î", "ì", "í", "ú", "ù", "û", "ò", "õ", "ô", "ó", "ç"];
		const vogaisSemAcento = ["a", "a", "a", "a", "e", "e", "e", "i", "i", "i", "u", "u", "u", "o", "o", "o", "o", "c"];
		let index = 0;
		for (const vogalAcento of vogaisAcento) {
			descricao = descricao.replace(vogalAcento, vogaisSemAcento[index++]);
		}
		return new Promise(async (resolve, reject) => {
			if(descricao != null){ resolve(descricao); }else{ reject(); }
		});
	}

	static async retirarPontuacao(descricao) {
		
		descricao = descricao.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()'"<>@|]/g," ");
		return new Promise(async (resolve, reject) => {
			if(descricao != null){ resolve(descricao); }else{ reject(); }
		});
	}
	
	static async retirarStopWords(descricao) {
		//Para remover as stopwords da extremidades
		descricao = " "+descricao+" ";
		let words = await readFile('./app/commom/stopwords.txt');
		words = words.toString().split(/\r?\n/);
		
		for(let word of words){
			let arrayTermos = (descricao.toUpperCase().split(" ")).filter((value, index, arr) => { return value != '' });
			descricao = (arrayTermos.filter((value, index, arr) => { return value != word.toUpperCase() })).join(" ");
		}

		if(descricao.substr(0,1) == " ")
			descricao = descricao.substr(1)

		if(descricao.substr(descricao.length) == " ")
			descricao = descricao.substr(0,descricao.length)

		return new Promise(async (resolve, reject) => {
			if(descricao != null){ resolve(descricao); }else{ reject(); }
		});
	}
	/*
	Remover espaços em brancos duplicados ou que estejam no inicio da string
	*/
	static async retirarEspacosBrancoDuplicados(descricao) {
		const vogaisAcento = ["à", "á", "â", "ã", "è", "é", "ê", "î", "ì", "í", "ú", "ù", "û", "ò", "õ", "ô", "ó", "ç"];
		const vogaisSemAcento = ["a", "a", "a", "a", "e", "e", "e", "i", "i", "i", "u", "u", "u", "o", "o", "o", "o", "c"];
		let index = 0;
		for (const vogalAcento of vogaisAcento) {
			descricao = descricao.replace(vogalAcento, vogaisSemAcento[index++]);
		}
		return new Promise(async (resolve, reject) => {
			if(descricao != null){ resolve(descricao); }else{ reject(); }
		});
	}

	static async clean(descricao){
		descricao = await JunkDescricao.retirarStopWords(await JunkDescricao.retirarAcentos(await JunkDescricao.retirarPontuacao(await JunkDescricao.extrairRepeticao(descricao))));
		return new Promise(async (resolve, reject) => {
			if(descricao != null){ resolve(descricao); }else{ reject(); }
		});
	}
}

module.exports = JunkDescricao;