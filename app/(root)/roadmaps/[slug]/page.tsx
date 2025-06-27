import Filter from "@/components/Filter";
import ItemsCard from "@/components/ItemsCard";
import Sort from "@/components/Sort";
import { getRoadmapItemsSortedFiltered } from "@/lib/queries/filter";
import { getRoadmapBySlug } from "@/lib/queries/roadmaps";
import { notFound } from "next/navigation";

const RoadmapSingle = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { status?: string; sortBy?: string };
}) => {
  const { slug } = await params;
  const roadmap = await getRoadmapBySlug(slug);
  const roadmapId = roadmap?._id;
  const searchParameter = await searchParams;

  const filter: { status?: string; sortBy?: string } = {};

  const shouldSort = searchParameter.sortBy === "Popularity";
  if (searchParameter.status) {
    filter.status = searchParameter.status;
  }
  const roadmapItems = await getRoadmapItemsSortedFiltered(
    roadmapId as string,
    "desc",
    filter,
    shouldSort
  );

  if (!roadmap) {
    return notFound();
  }

  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-semibold">{roadmap?.title}</h1>
        <div className="flex gap-4">
          <Sort />
          <Filter />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
        {roadmapItems.map((item) => (
          <div key={item._id as string} className="w-full">
            <ItemsCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapSingle;
