const express = require("express");
const multer = require("multer");
const multerConfig = require ("./config/multer");

const ChamadoController = require("./arquivo/controllers/ChamadoController");
const FonteController = require("./arquivo/controllers/FonteController");
const routes = express.Router();

routes.get("/", (req, res) => {
	return res.json({hello: "World"});
});

routes.get("/fonte", FonteController.listar);
routes.get("/fonte/:hash", FonteController.listarByHash);
routes.post("/fonte", multer(multerConfig).single("file"), (req, res) => { return res.json({msg: "Arquivo criado com suceso!"}); });

/*
    1. Antes de chamar as controles verificar se o arquivo existe    
    2. Quando o arquivo existir, verificar se j� foi carregado
*/
routes.post("/extrairFonte", (req, res) => { FonteController.store(req, res); });

//Chamados
routes.post("/chamados", ChamadoController.store);

module.exports = routes; 