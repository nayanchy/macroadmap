import { CommentDisplayType } from "./global";

export interface CommentParameter {
  roadmapItemId: string;
  content: string;
  parentId?: string | null;
}

export type CommentThreadProps = {
  comments: CommentDisplayType[];
  parentId?: string | null;
  currentUserId: string;
  roadmapItemId: string;
  onCommentPost: (comment: CommentDisplayType) => void;
  onCommentDelete?: (commentId: string) => void;
  onCommentEdit?: (comment: CommentDisplayType) => void;
  level?: number;
  setReplyTo: (id: string | null) => void;
  replyTo: string | null;
  userName?: string;
};
