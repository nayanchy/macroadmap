import { editComment } from "@/lib/handlers/action";
import { CommentDisplayType } from "@/types/global";
import { useState } from "react";

const EditForm = ({
  commentId,
  initialComment,
  onCommentEdit,
  setIsEditing,
}: {
  commentId: string;
  initialComment: string;
  onCommentEdit?: (comment: CommentDisplayType) => void;
  setIsEditing: (state: boolean) => void;
}) => {
  const [editedComment, setEditedComment] = useState<string>(initialComment);
  const handleEditing = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(true);
    try {
      const res = (await editComment(commentId, editedComment)) as {
        success: boolean;
        comment: CommentDisplayType;
      };

      if (!res.success) {
        throw new Error("Failed to edit comment");
      }

      if (onCommentEdit) {
        onCommentEdit(res.comment);
      }
    } catch (error) {
      console.error("Error while editing:", error);
    } finally {
      setIsEditing(false);
    }
  };

  return (
    <form onSubmit={handleEditing} className="w-full max-w-md mx-auto">
      <input type="hidden" value={commentId} name="parentId" />
      <textarea
        className="w-full border border-gray-300 rounded p-2 mb-2"
        rows={2}
        name="comment"
        onChange={(e) => setEditedComment(e.target.value)}
        value={editedComment}
      />
      <button
        type="submit"
        className="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Post Reply
      </button>
    </form>
  );
};

export default EditForm;
