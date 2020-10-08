const mongoose = require('mongoose');
var Mailgun = require('mailgun-js');

const Pessoa = require('../models/Pessoa.js');

//Your api key, from Mailgun’s Control Panel
var api_key = '0bbafa02bd3d9222c13b691630e15303-0d2e38f7-2f504a9d';

//Your domain, from the Mailgun Control Panel
var domain = 'sandbox94609d6c42f746658e91448811225275.mailgun.org';

//Your sending email address
var from_who = 'isoldamunizb@gmail.com';

module.exports.sendMail = async () => {
    var mailgun = new Mailgun({apiKey: api_key, domain: domain});
    var data = {
        from: from_who,
        subject: 'Seu amigo secreto',
    }
    const pessoas = await Pessoa.find({});
    pessoas.forEach((pessoa) => {
        data.to = pessoa.email;
        data.html = `Olá, o seu amigo secreto é ${pessoa.amigo.nome}`;
    });
    mailgun.messages().send(data, function (err, body) {
        if (err) {
            res.render('error', { error : err});
            console.log("got an error: ", err);
        }
        else {
            console.log(body);
        }
    });
};

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
    const {nome, email, amigo} = req.body;
    
    try {
        await Pessoa.findOneAndUpdate({ _id: id }, {
            nome: nome, 
            email: email,
            amigo: amigo,
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
