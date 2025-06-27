import { auth } from "@/auth";
import dbConnect from "@/lib/mongoose";
import { getUserByEmail } from "@/lib/queries/users";
import { NextResponse } from "next/server";

export const GET = async () => {
  const session = await auth();

  if (!session?.user) {
    return new NextResponse("You are not logged in", { status: 401 });
  }
  await dbConnect();

  try {
    const userDetails = await getUserByEmail(session?.user?.email as string);
    return new NextResponse(JSON.stringify(userDetails), { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : (err as string);
    return new NextResponse(message, { status: 500 });
  }
};
