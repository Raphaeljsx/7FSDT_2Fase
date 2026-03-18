export interface PostAuthor {
  id: number;
  name: string | null;
  email: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author_id: number;
  author?: PostAuthor;
  created_at: Date;
  updated_at: Date;
}

export interface PostCreate {
  title: string;
  content: string;
  author_id: number;
}

export interface PostUpdate {
  title?: string;
  content?: string;
}
