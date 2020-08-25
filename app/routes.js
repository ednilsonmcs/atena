const express = require("express");
const multer = require("multer");
const multerConfig = require ("./config/multer");

const ChamadoController = require("./arquivo/controllers/ChamadoController");
const FonteController = require("./arquivo/controllers/FonteController");
const StagingAreaController = require("./arquivo/controllers/StagingAreaController");
const TempoController = require("./dw/controllers/TempoController");
const routes = express.Router();

routes.get("/", (req, res) => {
	return res.json({hello: "World"});
});

//Create(Upload), Read(listar e listarByHash), Update(Não precisa) e Delete(Faltando) 
routes.get("/fonte", FonteController.listar);
routes.get("/fonte/:hash", FonteController.listarByHash);
routes.post("/fonte", multer(multerConfig).single("file"), (req, res) => { return res.json({msg: "Arquivo criado com suceso!"}); });

//Staging Area
//Create(Extrair), Read(Faltando), Update(Não precisa) e Delete(Faltando) 
routes.post("/stagingArea", (req, res) => { StagingAreaController.store(req, res); });
routes.get("/stagingArea", (req, res) => { StagingAreaController.list(req, res); });
routes.get("/stagingArea/:hash", (req, res) => { StagingAreaController.listarByHash(req, res); });
routes.delete("/stagingArea/:hash", (req, res) => { StagingAreaController.deleteByHash(req, res); });

//Chamados
routes.post("/chamados", ChamadoController.store);

//Dw
routes.post("/tempo", TempoController.store);


module.exports = routes; 