import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {
  static listarautores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (erro) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };
  static listArautorPorId = async (req, res) => {
    try {
      const id = req.params.id;
      const autoresResultado = await autores.findById(id);
      if (autoresResultado !== null) {
        res.status(200).send(autoresResultado);
      } else {
        res.status(404).send({ message: "Id do Autor não localizado." });
      }
    } catch (erro) {
      if (erro instanceof mongoose.Error.CastError) {
        res
          .status(400)
          .send({ message: "Um ou mais dados fornecidos estão incorretos." });
      } else {
        res
          .status(500)
          .send({ message: `${erro.message} - Erro interno de servidor.` });
      }
    }
  };
  static cadstrarArautor = async (req, res) => {
    try {
      let autor = new autores(req.body);
      const autoresResultado = await autor.save();
      res.status(201).send(autoresResultado.toJSON());
    } catch (erro) {
      res
        .status(500)
        .send({ message: `${erro.message} - falha ao cadastrar Autor` });
    }
  };
  static atualizarAutor = async (req, res) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Autor atualizado com sucesso!" });
    } catch (erro) {
      res.send(500).send({ message: erro.message });
    }
  };
  static excluirAutor = async (req, res) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido com sucesso!" });
    } catch (erro) {
      res.status(500).send({ message: erro.message });
    }
  };
}

export default AutorController;
