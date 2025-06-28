import { getSingleRoadmapItem } from "@/lib/queries/roadmaps";
import { auth } from "@/auth";
import { getAllCommentsByRoadmapItemId } from "@/lib/queries/comments";
import CommentClient from "@/components/CommentsDisplay/CommentClient";
import { CommentDisplayType } from "@/types/global";
import { notFound } from "next/navigation";

const SingleRoadmapItem = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const session = await auth();
  const currentUserId = session?.user?.id;
  const userName = session?.user?.name;
  const roadmapItem = await getSingleRoadmapItem(id);

  if (!roadmapItem) {
    return notFound();
  }

  const roadmapItemFormatted = {
    _id: roadmapItem!._id.toString(),
    roadmapId: roadmapItem!.roadmapId.toString(),
    title: roadmapItem!.title.toString(),
    description: roadmapItem!.description.toString(),
    status: roadmapItem!.status.toString(),
    upvotes: roadmapItem!.upvotes
      ? roadmapItem!.upvotes.map((id) => id.toString())
      : [],
    createdAt: roadmapItem!.createdAt.toISOString(),
    __v: roadmapItem!.__v.toString() as string,
  };

  const comments = await getAllCommentsByRoadmapItemId(id);

  if (!roadmapItem) {
    return <div>Item not found</div>;
  }

  return (
    <CommentClient
      roadmapItem={roadmapItemFormatted}
      initialComments={comments as CommentDisplayType[]}
      currentUserId={currentUserId as string}
      userName={userName as string}
    />
  );
};

export default SingleRoadmapItem;
