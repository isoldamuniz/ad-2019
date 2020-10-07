const express = require('express');
const router = express();
const service = require('../services/pessoaService.js');

router.get('', service.findAll);

router.post('', service.register);

router.put('/:id', service.update);

router.delete('/:id', service.remove);

module.exports = router;