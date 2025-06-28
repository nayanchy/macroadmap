"use client";

import { deleteComment } from "@/lib/handlers/action";
import React from "react";
import { MdDeleteSweep, MdEditNote } from "react-icons/md";
import { toast } from "sonner";

const CommentDeleteEdit = ({
  id,
  onCommentDelete,
  setIsEditing,
}: {
  id: string;
  onCommentDelete: (id: string) => void;
  setIsEditing: (state: boolean, commentId: string) => void;
}) => {
  const handleDelete = () => {
    toast("Do you really want to delete this comment?", {
      action: {
        label: "Yes",
        onClick: () => {
          deleteCom();
          onCommentDelete(id);
        },
      },
    });
    const deleteCom = async () => {
      await deleteComment(id);
    };
    deleteCom();
  };

  const handleEditingState = () => {
    setIsEditing(true, id);
  };
  return (
    <div className="flex gap-4">
      <span className="cursor-pointer" onClick={handleDelete}>
        <MdDeleteSweep />
      </span>
      <span className="cursor-pointer" onClick={handleEditingState}>
        <MdEditNote />
      </span>
    </div>
  );
};

export default CommentDeleteEdit;
