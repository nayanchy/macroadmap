import { handleComment } from "@/lib/handlers/action";
import { CommentDisplayType } from "@/types/global";
import React, { useState } from "react";

const ReplyForm = ({
  roadmapItemId,
  onCommentPost,
  commentId,
}: {
  roadmapItemId: string;
  onCommentPost: (comment: CommentDisplayType) => void;
  commentId: string;
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [reply, setReply] = useState<string>("");

  const handleReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsReplying(true);
    const formData = new FormData(e.currentTarget);
    const reply = formData.get("reply");
    const parentId = formData.get("parentId");

    try {
      const result = await handleComment({
        roadmapItemId,
        content: reply as string,
        parentId: parentId as string,
      });

      console.log(result);

      if (result?.success && result?.comment) {
        onCommentPost(result.comment);
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
      />
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
