"use client";

import { useState } from "react";
import CommentsDisplay from "./CommentsDiplay";
import CommentForm from "../forms/CommentForm";
import Upvote from "../Upvote";
import { CommentDisplayType } from "@/types/global";
import { RoadmapItemType } from "@/types/roadmap";
import { Button } from "../ui/button";
import { getButtonStyles } from "@/lib/handlers/client-actions";

type Props = {
  roadmapItem: RoadmapItemType;
  initialComments: CommentDisplayType[];
  currentUserId: string;
  userName: string;
};

const CommentClient = ({
  roadmapItem,
  initialComments,
  currentUserId,
  userName,
}: Props) => {
  const [comments, setComments] = useState(initialComments);

  const handleCommentPost = (newComment: CommentDisplayType) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleCommentDelete = (commentId: string) => {
    setComments((prevComments) => {
      const updated = prevComments
        .filter((comment) => comment._id.toString() !== commentId.toString())
        .map((comment) => ({
          ...comment,
          _id: comment._id.toString(),
          parentId: comment.parentId ? comment.parentId.toString() : null,
          createdAt: new Date(comment.createdAt).toISOString(),
          userId: comment.userId.toString(),
          roadmapItemId: comment.roadmapItemId.toString(),
        }));

      return updated;
    });
  };

  const handleCommentEdit = (updatedComment: CommentDisplayType) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id.toString() === updatedComment._id.toString()
          ? { ...comment, ...updatedComment }
          : comment
      )
    );
  };
  return (
    <div>
      <div className="w-full mx-auto mt-10 p-8 bg-white rounded-lg shadow flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold mb-2">{roadmapItem.title}</h1>
          <p className="text-gray-500 text-sm mb-4">
            Created:{" "}
            {new Date(roadmapItem.createdAt).toISOString().split("T")[0]}
          </p>
          <p className="mb-4">{roadmapItem.description}</p>
          <p className="mb-4">
            <span className="font-semibold">Status:</span>{" "}
            <Button
              className={`${getButtonStyles(roadmapItem.status)} text-xs rounded-full`}
            >
              {roadmapItem.status}
            </Button>
          </p>
        </div>
        <Upvote
          itemId={roadmapItem._id.toString()}
          initialUpvotes={roadmapItem.upvotes.length}
        />
      </div>

      <CommentsDisplay
        roadmapItemId={roadmapItem._id.toString()}
        comments={comments}
        currentUserId={currentUserId}
        onCommentPost={handleCommentPost}
        onCommentDelete={handleCommentDelete}
        onCommentEdit={handleCommentEdit}
        userName={userName}
      />

      <CommentForm
        roadmapItemId={roadmapItem._id.toString()}
        onCommentPost={handleCommentPost}
        userName={userName}
      />
    </div>
  );
};

export default CommentClient;
