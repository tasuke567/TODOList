import { describe, expect, it } from 'vitest';
import { groupByDepartment } from '../lib/group.js';

describe('groupByDepartment', () => {
  it('aggregates correctly', () => {
    const mock: any = [
      { firstName: 'A', lastName: 'X', gender: 'male', age: 20, hair: { color: 'Black' },
        address: { postalCode: '111' }, company: { department: 'HR' } },
      { firstName: 'B', lastName: 'Y', gender: 'female', age: 40, hair: { color: 'Blond' },
        address: { postalCode: '222' }, company: { department: 'HR' } },
    ];
    const res = groupByDepartment(mock);
    expect(res.HR.male).toBe(1);
    expect(res.HR.female).toBe(1);
    expect(res.HR.ageRange).toBe('20-40');
    expect(res.HR.hair.Black).toBe(1);
    expect(res.HR.hair.Blond).toBe(1);
  });
});
