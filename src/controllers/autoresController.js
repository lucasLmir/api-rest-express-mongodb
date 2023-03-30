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
  static listArautorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autoresResultado = await autores.findById(id);
      if (autoresResultado !== null) {
        res.status(200).send(autoresResultado);
      } else {
        res.status(404).send({ message: "Id do Autor não localizado." });
      }
    } catch (erro) {
      next(erro);
    }
  };
  static cadstrarArautor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      const autoresResultado = await autor.save();
      res.status(201).send(autoresResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };
  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Autor atualizado com sucesso!" });
    } catch (erro) {
      next(erro);
    }
  };
  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor removido com sucesso!" });
    } catch (erro) {
      next(erro);
    }
  };
}

export default AutorController;
