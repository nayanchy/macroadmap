import mongoose, { models, Schema } from "mongoose";

const CommentSchema = new Schema({
  roadmapItemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RoadmapItem",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: String,
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
    default: null,
  },
  createdAt: { type: Date, default: Date.now },
});

export const Comment =
  models?.Comment || mongoose.model("Comment", CommentSchema);
