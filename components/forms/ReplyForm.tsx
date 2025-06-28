import { handleComment } from "@/lib/handlers/action";
import { commentFormSchema } from "@/lib/schemas/form.schema";
import { CommentDisplayType } from "@/types/global";
import React, { useState } from "react";
import { toast } from "sonner";

const ReplyForm = ({
  roadmapItemId,
  onCommentPost,
  commentId,
  userName,
}: {
  roadmapItemId: string;
  onCommentPost: (comment: CommentDisplayType) => void;
  commentId: string;
  userName?: string;
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [reply, setReply] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsReplying(true);
    const formData = new FormData(e.currentTarget);
    const reply = formData.get("reply");
    const parentId = formData.get("parentId");

    try {
      const validatedReply = commentFormSchema.safeParse({
        content: reply as string, // Ensure comment is a string
      });

      if (!validatedReply.success) {
        const fieldErrors: { [key: string]: string } = {};
        validatedReply.error.errors.forEach((error) => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
        return;
      }

      const result = await handleComment({
        roadmapItemId,
        content: reply as string,
        parentId: parentId as string,
      });

      if (result?.success && result?.comment) {
        onCommentPost({ ...result.comment, userName });
        setReply("");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsReplying(false);
    }
  };
  return (
    <form onSubmit={handleReply}>
      <input type="hidden" value={commentId} name="parentId" />
      <textarea
        className="w-full border border-gray-300 rounded p-2 mb-2"
        placeholder="Write a reply..."
        rows={2}
        name="reply"
        onChange={(e) => setReply(e.target.value)}
        disabled={isReplying}
        value={reply}
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
        className="px-4 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
        disabled={isReplying || !reply.trim()}
      >
        Post Reply
      </button>
    </form>
  );
};

export default ReplyForm;
