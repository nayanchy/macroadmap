import { RoadmapItemDocument } from "@/types/roadmap";
import mongoose, { Model, models, Schema } from "mongoose";

const RoadmapItemSchema = new Schema({
  roadmapId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roadmap",
    required: true,
  },
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["Planned", "In Progress", "Completed"],
    default: "Planned",
  },
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

export const RoadmapItem: Model<RoadmapItemDocument> =
  models?.RoadmapItem ||
  mongoose.model<RoadmapItemDocument>("RoadmapItem", RoadmapItemSchema);
