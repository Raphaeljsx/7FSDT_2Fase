import * as model from "../models/post.model";
import { NotFoundError, ValidationError } from "../errors";
import type { Post, PostCreate, PostUpdate } from "../types/post";

export async function getAllPosts(): Promise<Post[]> {
  try {
    return await model.findAllPosts();
  } catch (error) {
    throw new Error(
      `Erro ao buscar posts: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`
    );
  }
}

export async function getPostById(id: string | number): Promise<Post> {
  const idNumber = typeof id === "string" ? parseInt(id, 10) : id;

  if (!idNumber || isNaN(idNumber)) throw new ValidationError("ID inválido");

  const post = await model.findByIdPost(idNumber);
  if (!post) throw new NotFoundError("Post não encontrado");

  return post;
}

export async function createPost(data: PostCreate): Promise<Post> {
  const errors: string[] = [];

  if (!data.title || data.title.trim().length === 0)
    errors.push("Título é obrigatório");
  if (!data.content || data.content.trim().length === 0)
    errors.push("Conteúdo é obrigatório");
  if (data.author_id == null || data.author_id <= 0)
    errors.push("Autor é obrigatório");

  if (errors.length > 0)
    throw new ValidationError("Campos obrigatórios não preenchidos", errors);

  try {
    return await model.createPost(data);
  } catch (error) {
    throw new Error(
      `Erro ao criar post: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`
    );
  }
}

export async function updatePost(
  id: string | number,
  data: PostUpdate
): Promise<Post> {
  const idNumber = typeof id === "string" ? parseInt(id, 10) : id;

  if (!idNumber || isNaN(idNumber)) throw new ValidationError("ID inválido");

  const post = await model.findByIdPost(idNumber);
  if (!post) throw new NotFoundError("Post não encontrado");

  const updateData: PostUpdate & { id: number } = {
    id: idNumber,
    title: data.title !== undefined ? data.title : post.title,
    content: data.content !== undefined ? data.content : post.content,
  };

  try {
    return await model.updatePost(updateData);
  } catch (error) {
    throw new Error(
      `Erro ao atualizar post: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`
    );
  }
}

export async function deletePost(id: string | number): Promise<void> {
  const idNumber = typeof id === "string" ? parseInt(id, 10) : id;

  if (!idNumber || isNaN(idNumber)) throw new ValidationError("ID inválido");

  await getPostById(idNumber);

  try {
    await model.removePost(idNumber);
  } catch (error) {
    throw new Error(
      `Erro ao deletar post: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`
    );
  }
}

export async function searchPosts(query: string): Promise<Post[]> {
  if (!query || query.trim().length === 0)
    throw new ValidationError("Query de busca é obrigatória");

  try {
    return await model.searchPosts(query);
  } catch (error) {
    throw new Error(
      `Erro ao buscar posts: ${
        error instanceof Error ? error.message : "Erro desconhecido"
      }`
    );
  }
}
