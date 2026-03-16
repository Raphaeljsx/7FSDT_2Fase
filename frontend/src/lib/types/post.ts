export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  created_at: Date;
  updated_at: Date;
}

export interface PostCreate {
  title: string;
  content: string;
  author: string;
}

export interface PostUpdate {
  title?: string;
  content?: string;
  author?: string;
}
