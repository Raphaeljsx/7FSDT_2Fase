const service = require('../services/post.service')

const getAll = async (req, res) => {
  try {
    const posts = await service.getAllPosts();
    if (!posts || posts.length === 0) {
      return res.status(404).json({ message: 'Nenhum post encontrado' })
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};

const getById = async (req, res) => {
  try {
    const post = await service.getPostById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
};

const create = async (req, res) => {
  try {
    const post = await service.createPost(req.body);
    res.status(201).json({ message: 'Post criado com sucesso', post })
  } catch (error) {
    res.status(400).json({ message: error.message || 'Erro ao criar post' })
  }
};

const update = async (req, res) => {
  try {
    const post = await service.updatePost(req.params.id, req.body);
    res.status(200).json({ message: `Post atualizado com sucesso`, post })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}

const remove = async (req, res) => {
  try {
    await service.deletePost(req.params.id);
    res.status(204).json({ message: 'Post deletado com sucesso' }).send();
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
};

const search = async (req, res) => {
  try {
    const posts = await service.searchPosts(req.query.query)
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  search
}
