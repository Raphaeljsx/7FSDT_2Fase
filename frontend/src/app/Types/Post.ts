export interface PostAuthor {
  id: number;
  name: string | null;
  email: string;
}

export interface PostType {
  id: number;
  title: string;
  content: string;
  author_id: number;
  author?: PostAuthor;
  created_at: Date;
  updated_at: Date;
}
