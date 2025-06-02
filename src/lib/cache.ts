// src/lib/cache.ts
import { fetchUsers } from './fetchUsers.js';
import { groupByDepartment } from './group.js';
import { DeptStatsMap } from './types.js';
const cache = new Map<string, { ts: number; data: DeptStatsMap }>();

export async function getStatsCached(ttl = 600_000) {
  const hit = cache.get('stats');
  if (hit && Date.now() - hit.ts < ttl) return hit.data;

  const users = await fetchUsers();
  const data = groupByDepartment(users);
  cache.set('stats', { ts: Date.now(), data });
  return data;
}
