"use server";

import { RoadmapItem } from "@/database/models/roadmapItem.model";
import { PipelineStage } from "mongoose";

export async function filterRoadmapItems(
  roadmapId: string,
  filter: { status?: string }
) {
  const query: { roadmapId: string; status?: string } = { roadmapId };

  if (filter.status) {
    query.status = filter.status;
  }

  const items = await RoadmapItem.find(query).lean();

  return items;
}

export async function getRoadmapItemsSortedFiltered(
  roadmapId: string,
  sortOrder: string = "desc",
  additionalFilters: { [key: string]: string } = {},
  sort: boolean = false
) {
  try {
    const matchStage = {
      roadmapId,
      ...additionalFilters,
    };

    const pipeline: PipelineStage[] = [
      {
        $match: matchStage,
      },
    ];

    if (sort) {
      pipeline.push(
        {
          $addFields: {
            upvotesCount: { $size: "$upvotes" },
          },
        },
        {
          $sort: {
            upvotesCount: sortOrder === "desc" ? -1 : 1,
          },
        }
      );
    }

    const items = await RoadmapItem.aggregate(pipeline);
    return items;
  } catch (error) {
    console.error("Error sorting roadmap items by upvotes:", error);
    throw error;
  }
}
