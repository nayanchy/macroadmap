import dbConnect from "@/lib/mongoose";
import { createUser } from "@/lib/queries/users";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { name, email, password } = await request.json();

  //  Create DB connection
  await dbConnect();

  // Encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const newUser = {
    name,
    email,
    password: hashedPassword,
  };

  // Update DB
  try {
    await createUser(newUser);
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

  return new NextResponse("User created", { status: 201 });
};
