const model = require('../models/post.model')

const getAllPosts = async () => model.findAllPosts()

const getPostById = async (id) => {
  const post = await model.findByIdPost(id)
  if (!post) throw new Error('Post not found')
  return post
}

const createPost = async ({ title, content, author }) => {
  if (!title || !content || !author) throw new Error('Campos obrigatórios não preenchidos')
  return model.createPost({ title, content, author })
}

const updatePost = async (id, data) => {
  const post = await model.findByIdPost(id, data)
  if (!post) throw new Error('Post não encontrado')
  return post;
}

const deletePost = async (id) => await model.removePost(id);

const searchPosts = async (title) => {
  if (!title) throw new Error('Título é obrigatório')
  return model.searchPosts(title)
}

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  searchPosts
}