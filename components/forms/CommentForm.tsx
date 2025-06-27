"use client";
import { handleComment } from "@/lib/handlers/action";
import { CommentDisplayType } from "@/types/global";
import { useState } from "react";

const CommentForm = ({
  roadmapItemId,
  onCommentPost,
}: {
  roadmapItemId: string;
  onCommentPost: (comment: CommentDisplayType) => void;
}) => {
  const [comment, setComment] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    try {
      const formData = new FormData(e.currentTarget);
      const comment = formData.get("comment");
      const result = await handleComment({
        roadmapItemId,
        content: comment as string,
      });

      if (result?.success && result?.comment) {
        onCommentPost(result.comment);
        setComment("");
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      throw new Error(message);
    } finally {
      setPending(false);
      setComment("");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto bg-white dark:bg-gray-50 p-8 mt-10 rounded-lg shadow flex flex-col gap-4"
    >
      <label htmlFor="comment" className="font-semibold text-gray-700">
        Add a Comment
      </label>
      <textarea
        id="comment"
        name="comment"
        className="border border-gray-300 rounded p-3 min-h-[80px] resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Write your comment here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        disabled={pending}
      />
      <button
        type="submit"
        className="self-end px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
        disabled={pending || !comment.trim()}
      >
        {pending ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
};

export default CommentForm;
