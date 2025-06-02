import { NextResponse} from "next/server";
import { fetchUsers } from "@/lib/fetchUsers";
import { groupByDepartment } from "@/lib/group";

export const revalidate = 600; // ✔︎  literal number

export async function GET() {

  try {
    const users = await fetchUsers();
    const stats = groupByDepartment(users);
    return NextResponse.json(stats, { status: 200 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "unknown";
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
