import type { RawUser, DeptStatsMap } from "./types.js";
import type { DeptStats } from "./types.js";
interface DeptStatsInternal extends DeptStats {
  _min?: number;
  _max?: number;
}
/** one-pass, O(n) grouping; ใช้ property ชั่วคราว _min/_max แล้วค่อยลบ */
export function groupByDepartment(users: RawUser[]): DeptStatsMap {
  const out: DeptStatsMap = {};

  for (const u of users) {
    const dep = u.company.department;
    const fullName = `${u.firstName}${u.lastName}`;

    const stat = (out[dep] ??= {
      male: 0,
      female: 0,
      ageRange: "",
      hair: {},
      addressUser: {},
      _min: Infinity,
      _max: -Infinity,
    } as DeptStatsInternal);

    stat[u.gender]++;
    stat._min = Math.min(stat._min ?? Infinity, u.age ?? Infinity);
    stat._max = Math.max(stat._max ?? -Infinity, u.age ?? -Infinity);

    stat.hair[u.hair.color] = (stat.hair[u.hair.color] ?? 0) + 1;
    stat.addressUser[fullName] = u.address.postalCode;
  }

  // finalize
  for (const d of Object.values(out) as DeptStatsInternal[]) {
    d.ageRange = `${d._min}-${d._max}`;
    delete d._min;
    delete d._max;
  }

  return out;
}
