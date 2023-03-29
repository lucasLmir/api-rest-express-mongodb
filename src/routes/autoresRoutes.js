import express from "express";
import AutorController from "../controllers/autoresController.js";

const router = express.Router();

router
  .get("/autores", AutorController.listarautores)
  .get("/autores/:id", AutorController.listArautorPorId)
  .post("/autores", AutorController.cadstrarArautor)
  .put("/autores/:id", AutorController.atualizarAutor)
  .delete("/autores/:id", AutorController.excluirAutor);

export default router;