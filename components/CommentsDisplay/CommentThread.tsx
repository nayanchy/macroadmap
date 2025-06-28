import { CommentThreadProps } from "@/types/comments";
import ReplyForm from "../forms/ReplyForm";
import { settings } from "@/constants/settings";
import CommentDeleteEdit from "./CommentDeleteEdit";
import { useState } from "react";
import EditForm from "../forms/EditForm";

const CommentThread = ({
  comments,
  parentId = null,
  currentUserId,
  roadmapItemId,
  onCommentPost,
  level = 1,
  setReplyTo,
  replyTo,
  onCommentDelete,
  onCommentEdit,
  userName,
}: CommentThreadProps) => {
  const [isEditing, setIsEditing] = useState({
    state: true as boolean,
    commentId: "" as string,
  });

  const handleEditing = (state: boolean, commentId: string) => {
    setIsEditing({
      state,
      commentId,
    });
  };

  const filtered = comments.filter((c) => (c.parentId ?? null) === parentId);
  const allowedCommentLevel = settings.COMMENT_LEVEL;

  if (level > allowedCommentLevel) return null;

  return (
    <>
      {filtered.map((comment) => {
        const ifUserComment = comment.userId === currentUserId;
        return (
          <div
            key={comment._id}
            className={`mt-4 ml-${level * 4} bg-gray-50 rounded-lg shadow p-4`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-primary-500">
                {comment.userName || "User"}
                {comment.userId === currentUserId && (
                  <span className="ml-2 px-2 py-0.5 bg-orange-100 text-primary-500 text-xs rounded">
                    You
                  </span>
                )}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(comment.createdAt).toISOString().split("T")[0]}
              </span>
            </div>
            <div className="mb-2 text-gray-800">{comment.content}</div>
            <div className="flex-between">
              <div className="flex gap-2">
                {level < allowedCommentLevel && (
                  <button
                    className="text-sm text-primary-500 cursor-pointer hover:underline"
                    onClick={() =>
                      setReplyTo(replyTo === comment._id ? null : comment._id)
                    }
                  >
                    Reply
                  </button>
                )}
                {comment.userId === currentUserId && (
                  <span className="text-sm text-gray-400 ml-2">
                    Your comment
                  </span>
                )}
              </div>
              {ifUserComment && (
                <CommentDeleteEdit
                  id={comment._id}
                  onCommentDelete={onCommentDelete ?? (() => {})}
                  setIsEditing={handleEditing}
                />
              )}
            </div>

            {replyTo === comment._id && level < allowedCommentLevel && (
              <div className="mt-3">
                <ReplyForm
                  roadmapItemId={roadmapItemId}
                  commentId={comment._id}
                  onCommentPost={(newComment) => {
                    onCommentPost(newComment);
                    setReplyTo(null);
                  }}
                  userName={userName}
                />
              </div>
            )}
            {isEditing.state && isEditing.commentId === comment._id && (
              <div className="mt-3">
                <EditForm
                  commentId={comment._id}
                  initialComment={comment.content}
                  onCommentEdit={onCommentEdit}
                  setIsEditing={handleEditing}
                />
              </div>
            )}
            <CommentThread
              comments={comments}
              parentId={comment._id}
              currentUserId={currentUserId}
              roadmapItemId={roadmapItemId}
              onCommentDelete={onCommentDelete}
              onCommentPost={onCommentPost}
              onCommentEdit={onCommentEdit}
              level={level + 1}
              setReplyTo={setReplyTo}
              replyTo={replyTo}
            />
          </div>
        );
      })}
    </>
  );
};

export default CommentThread;
