const { Router } = require('express');

const router = Router();

router.use('/books', require('./books'));
router.use('/users', require('./users'));

module.exports = router;
