// test/group.empty.spec.ts
import { groupByDepartment } from '@/lib/group';

it('handles empty array', () => {
  expect(groupByDepartment([])).toEqual({});
});
