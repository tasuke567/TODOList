import { NextResponse } from 'next/server';
import { fetchUsers } from '@/lib/fetchUsers';
import { groupByDepartment } from '@/lib/group';

export const revalidate = 60 * 10; // ISR 10 นาที

export async function GET() {
  try {
    const users = await fetchUsers();
    const stats = groupByDepartment(users);
    return NextResponse.json(stats, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
