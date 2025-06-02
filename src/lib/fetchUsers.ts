import type { RawUser } from './types.js';

// ใช้ fetch global (Node 18+ หรือ Next.js); ถ้า Node<18 ให้ `import fetch from 'node-fetch'`
const USERS_URL = 'https://dummyjson.com/users?limit=100'; // 100 คนพอ

export async function fetchUsers(): Promise<RawUser[]> {
  const res = await fetch(USERS_URL);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  const json = (await res.json()) as { users: RawUser[] };
  return json.users;
}
