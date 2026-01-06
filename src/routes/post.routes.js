const express = require('express');
const controller = require('../controllers/post.controller');

const router = express.Router();

router.get('/posts', controller.getAll);
router.get('/posts/:id', controller.getById);
router.get('/posts/search', controller.search);
router.post('/posts', controller.create);
router.put('/posts/:id', controller.update);
router.delete('/posts/id', controller.remove)

module.exports = router;