import SingleRoadmapCard from "@/components/ItemsCard/SingleRoadmapCard";
import { getAllRoadmaps } from "@/lib/queries/roadmaps";
import React from "react";

const RoadmapsPage = async () => {
  const roadmaps = await getAllRoadmaps();
  return (
    <div className="mx-auto py-5 sm:py-10 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
        {roadmaps.map((roadmap) => (
          <SingleRoadmapCard roadmap={roadmap} key={roadmap._id} />
        ))}
      </div>
    </div>
  );
};

export default RoadmapsPage;
