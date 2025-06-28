import { editComment } from "@/lib/handlers/action";
import { commentFormSchema } from "@/lib/schemas/form.schema";
import { CommentDisplayType } from "@/types/global";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { toast } from "sonner";

const EditForm = ({
  commentId,
  initialComment,
  onCommentEdit,
  setIsEditing,
}: {
  commentId: string;
  initialComment: string;
  onCommentEdit?: (comment: CommentDisplayType) => void;
  setIsEditing: (state: boolean, commentId: string) => void;
}) => {
  const [editedComment, setEditedComment] = useState<string>(initialComment);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleEditing = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const comment = formData.get("comment");
    setIsEditing(true, commentId);
    try {
      const validatedComment = commentFormSchema.safeParse({
        content: comment as string,
      });

      if (!validatedComment.success) {
        const fieldErrors: { [key: string]: string } = {};

        validatedComment.error.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
        return;
      }

      const res = (await editComment(commentId, editedComment)) as {
        success: boolean;
        comment: CommentDisplayType;
      };

      if (!res.success) {
        throw new Error("Failed to edit comment");
      } else {
        setIsEditing(false, "");
        if (onCommentEdit) {
          onCommentEdit(res.comment);
        }
      }
    } catch (error) {
      console.error("Error while editing:", error);
    }
  };

  return (
    <div className="relative py-10">
      <form onSubmit={handleEditing} className="w-full mx-auto">
        <input type="hidden" value={commentId} name="parentId" />
        <textarea
          className="w-full border border-gray-300 rounded p-2 mb-2"
          rows={2}
          name="comment"
          onChange={(e) => setEditedComment(e.target.value)}
          value={editedComment}
        />
        {errors.general &&
          toast(errors.general, {
            position: "top-center",
            duration: 5000,
          })}
        {errors.content && (
          <p className="!text-red-500 text-sm mt-1">{errors.content}</p>
        )}
        <button
          type="submit"
          className="px-4 py-1 bg-primary-500 text-white rounded disabled:opacity-50"
        >
          Edit Post
        </button>
      </form>
      <span
        onClick={() => setIsEditing(false, "")}
        className="absolute top-0 right-0 cursor-pointer p-1 text-gray-500 hover:text-primary-500 transition duration-200 bg-gray-200 dark:bg-slate-700 dark:hover:text-white dark:hover:bg-primary-500 rounded-full"
      >
        <IoClose />
      </span>
    </div>
  );
};

export default EditForm;
