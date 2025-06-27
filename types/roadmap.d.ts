import { Document } from "mongoose";

export interface RoadmapType {
  _id: string;
  title: string;
  description: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoadmapItemType {
  _id: string;
  roadmapId: string;
  title: string;
  description: string;
  status: string;
  upvotes: string[];
  createdAt: Date;
  __v: number;
}

// export interface RoadmapItemType {
//   _id: Types.ObjectId;
//   roadmapId: Types.ObjectId;
//   title: string;
//   description: string;
//   status: string;
//   upvotes: Types.ObjectId[];
//   createdAt: Date;
// }
export type RoadmapItemDocument = RoadmapItemType & Document;

export interface CommentType {
  _id: string;
  roadmapItemId: string;
  userId: string;
  content: string;
  parentId?: string | null;
  createdAt: string;
}

export type CommentDocument = CommentType & Document;
