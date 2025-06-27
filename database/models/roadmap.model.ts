import mongoose, { models, Schema } from "mongoose";

const RoadmapSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Roadmap =
  models?.Roadmap || mongoose.model("Roadmap", RoadmapSchema);
