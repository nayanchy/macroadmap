import { Comment } from "@/database/models/comment.model";
import { CommentDisplayType } from "@/types/global";
import { getUsernameById } from "./users";

export async function getAllCommentsByRoadmapItemId(itemId: string) {
  const comments = await Comment.find({ roadmapItemId: itemId }).lean<
    CommentDisplayType[]
  >();

  const formattedComments = await Promise.all(
    comments.map(async (comment) => {
      const userIdStr = comment.userId.toString();
      const userName = await getUsernameById(userIdStr);

      return {
        _id: comment._id.toString(),
        roadmapItemId: comment.roadmapItemId.toString(),
        userId: userIdStr,
        content: comment.content,
        parentId: comment.parentId ? comment.parentId.toString() : null,
        createdAt: new Date(comment.createdAt).toISOString(),
        userName,
      };
    })
  );
  return formattedComments;
}
