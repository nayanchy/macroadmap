import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import { getRoadmapBySlug } from "@/lib/queries/roadmaps";
import { RoadmapItem } from "@/database/models/roadmapItem.model";
import { RoadmapType } from "@/types/roadmap";

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  await dbConnect();
  const { slug } = await params;

  try {
    const roadmap = await getRoadmapBySlug(slug);
    if (!roadmap) {
      return new NextResponse("Roadmap not found", { status: 404 });
    }
    return NextResponse.json(roadmap);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new NextResponse(message, { status: 500 });
  }
};

export const POST = async (
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  await dbConnect();

  const { slug } = await params;

  const roadmap: RoadmapType | null = await getRoadmapBySlug(slug);
  console.log(roadmap);
  if (!roadmap) {
    return new NextResponse("Roadmap not found", { status: 404 });
  }

  const { title, description, status } = await request.json();

  try {
    const newItem = await RoadmapItem.create({
      roadmapId: roadmap._id,
      title,
      description,
      status,
    });
    return NextResponse.json(newItem, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new NextResponse(message, { status: 500 });
  }
};
