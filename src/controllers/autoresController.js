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
      res.status(200).send(autoresResultado);
    } catch (erro) {
      res.status(400).send({ message: `${erro.message} - Id não localizada` });
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
    autores.findByIdAndDelete(id, (err) => {
      if (!err) {
        res.status(200).send({ message: "autor removido com sucesso!" });
      } else {
        res.status(500).send({ message: err.message });
      }
    });
  };
}

export default AutorController;
