// Credintials
export type CredentialType = {
  email: string;
  password: string;
};

export interface UserData {
  name: string;
  email: string;
  password: string;
}

export type Product = {
  id: number;
  name: string;
  img: string;
  price: number;
  rating?: number;
  desc: string;
};

export interface Usertype {
  _id: string;
  name: string;
  email: string;
}

export type CommentDisplayType = {
  _id: string;
  userId: string;
  content: string;
  createdAt: string;
  parentId?: string | null;
  userName?: string;
  roadmapItemId: string;
};
