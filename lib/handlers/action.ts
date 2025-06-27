"use server";

import { auth, signIn, signOut } from "@/auth";
import { NextResponse } from "next/server";
import { getSingleRoadmapItem } from "../queries/roadmaps";
import { Comment } from "@/database/models/comment.model";
import { CommentParameter } from "@/types/comments";

export async function handleSocialLogin(formData: FormData) {
  const action = formData.get("action");
  const callbackUrl = formData.get("callbackUrl");

  await signIn(action as string, { redirectTo: callbackUrl as string });
}

export async function handleLogout() {
  await signOut();
}

export async function handleCredLogin(formData: FormData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl: formData.get("callbackUrl"),
      redirect: false,
    });

    console.log(response);

    return response;
  } catch (error) {
    throw new Error(error as string);
  }
}

export async function handleUpvoteRoadmapItem(itemId: string) {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse("You are not logged in", { status: 401 });
  }

  const userId = session.user.id;

  console.log("User ID:", userId);

  const item = await getSingleRoadmapItem(itemId);
  if (!item) {
    return new NextResponse("Item not found", { status: 404 });
  }

  const hasVoted = item.upvotes.some(
    (id: string) => id.toString() === userId?.toString()
  );

  if (hasVoted) {
    item.upvotes = item.upvotes.filter(
      (id: string) => id.toString() !== userId
    );
  } else {
    item.upvotes.push(userId as string);
  }

  await item.save();

  return { upvotes: item.upvotes.length, voted: !hasVoted };
}

export async function getUpvotes(itemId: string) {
  const item = await getSingleRoadmapItem(itemId);
  if (!item) {
    return new NextResponse("Item not found", { status: 404 });
  }
  return { upvotes: item.upvotes.length };
}

export async function handleComment({
  roadmapItemId,
  content,
  parentId = null,
}: CommentParameter) {
  const session = await auth();

  if (!session?.user) {
    throw new Error("You are not logged in");
  }

  const userId = session.user.id;

  try {
    const newComment = await Comment.create({
      roadmapItemId,
      userId,
      content,
      parentId: parentId || null,
    });

    const plainComment = {
      _id: newComment._id.toString(),
      roadmapItemId: newComment.roadmapItemId.toString(),
      userId: newComment.userId.toString(),
      content: newComment.content,
      parentId: newComment.parentId ? newComment.parentId.toString() : null,
      createdAt:
        newComment.createdAt instanceof Date
          ? newComment.createdAt.toISOString()
          : String(newComment.createdAt),
    };

    return { success: true, comment: plainComment };
  } catch (err) {
    const message = err instanceof Error ? err.message : (err as string);
    throw new Error(message);
  }
}

export async function userVoted(itemId: string) {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse("You are not logged in", { status: 401 });
  }
  const items = await getSingleRoadmapItem(itemId);

  const upvotes = items?.upvotes || [];
  const userId = session.user.id;
  console.log("User ID:", userId, "Upvotes:", upvotes);
  const hasVoted = upvotes.some(
    (id: string) => id.toString() === userId.toString()
  );

  return { voted: hasVoted };
}

export async function ifUserComment(commentId: string) {
  const session = await auth();
  if (!session?.user) {
    return new NextResponse("You are not logged in", { status: 401 });
  }

  const userId = session.user.id;

  const comment = await Comment.findOne({
    _id: commentId,
    userId,
  });
  if (!comment) {
    return new NextResponse("You are not authorized to delete this comment", {
      status: 403,
    });
  }
  return true;
}

export async function deleteComment(commentId: string) {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: "You are not logged in" };
  }

  const ifOwner = await ifUserComment(commentId);

  if (ifOwner) {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return { success: false, message: "Comment not found" };
    }
    return {
      success: true,
      message: "Comment deleted successfully",
    };
  } else {
    return {
      success: false,
      message: "You are not authorized to delete this comment",
    };
  }
}

export async function editComment(commentId: string, content: string) {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: "You are not logged in" };
  }

  const ifOwner = await ifUserComment(commentId);

  if (ifOwner) {
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { content },
      { new: true }
    );
    if (!updatedComment) {
      return { success: false, message: "Comment not found" };
    }

    const plainComment = {
      _id: updatedComment._id.toString(),
      roadmapItemId: updatedComment.roadmapItemId.toString(),
      userId: updatedComment.userId.toString(),
      content: updatedComment.content,
      parentId: updatedComment.parentId
        ? updatedComment.parentId.toString()
        : null,
      createdAt:
        updatedComment.createdAt instanceof Date
          ? updatedComment.createdAt.toISOString()
          : String(updatedComment.createdAt),
    };

    return { success: true, comment: plainComment };
  }

  return {
    success: false,
    message: "You are not authorized to edit this comment",
  };
}

export const getCommentById = async (commentId: string) => {
  const session = await auth();
  if (!session?.user) {
    return { success: false, message: "You are not logged in" };
  }
  const comment = await Comment.findById(commentId);
  if (!comment) {
    return { success: false, message: "Comment not found" };
  }

  const plainComment = {
    _id: comment._id.toString(),
    roadmapItemId: comment.roadmapItemId.toString(),
    userId: comment.userId.toString(),
    content: comment.content,
    parentId: comment.parentId ? comment.parentId.toString() : null,
    createdAt:
      comment.createdAt instanceof Date
        ? comment.createdAt.toISOString()
        : String(comment.createdAt),
  };

  return { success: true, comment: plainComment };
};
