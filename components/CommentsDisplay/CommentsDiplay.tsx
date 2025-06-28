"use client";

import { CommentDisplayType } from "@/types/global";
import { useState } from "react";
import CommentThread from "./CommentThread";

type CommentsDisplayProps = {
  comments: CommentDisplayType[];
  currentUserId: string;
  roadmapItemId: string;
  onCommentPost: (comment: CommentDisplayType) => void;
  onCommentDelete: (commentId: string) => void | undefined;
  onCommentEdit: (comment: CommentDisplayType) => void | undefined;
  userName?: string;
};

const CommentsDisplay = ({
  comments = [],
  currentUserId,
  roadmapItemId,
  onCommentPost,
  onCommentDelete,
  onCommentEdit,
  userName,
}: CommentsDisplayProps) => {
  const [replyTo, setReplyTo] = useState<string | null>(null);

  return (
    <div className="w-full mx-auto mt-10 flex flex-col gap-6">
      <h2 className="text-2xl font-bold">Comments</h2>
      <CommentThread
        comments={comments}
        currentUserId={currentUserId}
        roadmapItemId={roadmapItemId}
        onCommentPost={onCommentPost}
        setReplyTo={setReplyTo}
        replyTo={replyTo}
        onCommentDelete={onCommentDelete}
        onCommentEdit={onCommentEdit}
        userName={userName}
      />
    </div>
  );
};

export default CommentsDisplay;
