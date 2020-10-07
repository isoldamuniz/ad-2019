const mongoose = require('mongoose');

const Pessoa = require('../models/Pessoa.js');

module.exports.findAll = async (_, res) => {
    try {
        const data = await Pessoa.find({});
        res.send(data);
    } catch (error) {
        res.status(500).send('Erro ao listar as pessoas');
    }
    res.end();
};

module.exports.register = async (req, res) => {
    const newPessoa = new Pessoa({
        nome: req.body.nome,
        email: req.body.email,
    });
    try {
        const data = await newPessoa.save(newPessoa);
        res.send(data);
    } catch (error) {
        res.status(500).send(`Erro ao cadastrar pessoa - ${error}`);
    }
    res.end();
}

module.exports.update = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: 'Os dados de entrada estão vazios!',
        });
    }
      
    const id = req.params.id;
    const {nome, email} = req.body;
    
    try {
        await Pessoa.findOneAndUpdate({ _id: id }, {
            nome: nome, 
            email: email
        });
        res.send('Pessoa atualizada com sucesso');
    } catch (error) {
        res.status(404).send(`Erro ao atualizar pessoa - ${error}`);
    }
}

module.exports.remove = async (req, res) => {
    const id = req.params.id;
    try {
        await Pessoa.findOneAndRemove({ _id: id });
        res.send('Pessoa removida com sucesso');
      
    } catch (error) {
        res.status(500).send(`Erro ao remover pessoa - ${error}`);
    }
    res.end();
}

module.exports.removeAll = async (req, res) => {
    try {
        await Pessoa.deleteMany({ }, function (err) {});
        res.send(`Todas as pessoas foram removidas!`);
      
    } catch (error) {
        res.status(500).send(`Erro ao remover pessoas - ${error}`);
    }
    res.end();
  };
