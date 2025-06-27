import { User } from "@/database/models/user.model";
import { UserData } from "@/types/global";
export async function createUser(userData: UserData) {
  try {
    await User.create(userData);
  } catch (err) {
    throw new Error(err instanceof Error ? err.message : (err as string));
  }
}

export async function getUserByEmail(email: string) {
  const user = await User.findOne({ email }).select("-password").lean();

  return user;
}

export async function getUsernameById(id: string): Promise<string | null> {
  const user = await User.findById(id).select("name").lean();
  const singleUser = Array.isArray(user) ? user[0] : user;
  return singleUser?.name ?? null;
}
