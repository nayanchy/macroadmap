import dbConnect from "@/lib/mongoose";
import slugify from "slugify";
import { createRoadmap } from "@/lib/queries/roadmaps";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { title, description } = await request.json();

  const slugified = slugify(title, { lower: true });

  const data = {
    title,
    description,
    slug: slugified,
  };

  //  Create DB connection
  await dbConnect();

  // Update DB
  try {
    await createRoadmap(data);
  } catch (err) {
    console.log(err);
    let errorMessage = "An unknown error occurred";
    if (err instanceof Error) {
      errorMessage = err.message;
    } else if (typeof err === "string") {
      errorMessage = err;
    }
    return new NextResponse(errorMessage, { status: 500 });
  }

  return new NextResponse("Roadmap created", { status: 201 });
};
