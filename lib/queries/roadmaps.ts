import { Roadmap } from "@/database/models/roadmap.model";
import { RoadmapItemDocument, RoadmapType } from "@/types/roadmap";
import { RoadmapItem } from "@/database/models/roadmapItem.model";

export async function createRoadmap(roadmapData: {
  title: string;
  description: string;
  slug: string;
}): Promise<RoadmapType> {
  const roadmap = await Roadmap.create(roadmapData);

  return roadmap;
}

export async function getAllRoadmaps(): Promise<RoadmapType[]> {
  const roadmaps = await Roadmap.find();
  return roadmaps;
}

export async function getRoadmapBySlug(
  slug: string
): Promise<RoadmapType | null> {
  const roadmap = await Roadmap.findOne({ slug }).lean<RoadmapType>();
  return roadmap;
}

export async function getAllRoadmapItemsById(roadmapId: string) {
  const roadmaps = await RoadmapItem.find({ roadmapId }).lean();
  return roadmaps;
}

export async function getSingleRoadmapItem(
  id: string
): Promise<RoadmapItemDocument | null> {
  const roadmapItem = await RoadmapItem.findById(id);
  return roadmapItem;
}
