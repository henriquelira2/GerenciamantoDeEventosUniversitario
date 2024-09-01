const Picture = require("../models/Picture");

// Função para salvar uma nova imagem
exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Nenhum arquivo enviado." });
    }
    const picture = new Picture({
      name,
      src: file.path,
    });

    await picture.save();

    res.json({ picture, msg: "Imagem salva com sucesso" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro ao salvar imagem." });
  }
};

// Função para obter todos as imagens
exports.findAll = async (req, res) => {
  try {
    const pictures = await Picture.findAll(); 
    res.json(pictures);


  } catch (error) {
    console.log(error); 
    res.status(500).json({ message: "Erro ao ao buscar imagens." });
  }
};
