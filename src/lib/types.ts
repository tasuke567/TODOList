export interface RawUser {
  id: number;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  age: number;
  hair: { color: string };
  address: { postalCode: string };
  company: { department: string };
}

// สรุปต่อ 1 แผนก
export interface DeptStats {
  male: number;
  female: number;
  ageRange: string;                 // "minAge-maxAge"
  hair: Record<string, number>;     // {"Black": 3, ...}
  addressUser: Record<string, string>; // {"TerryMedhurst": "92130"}
}

export type DeptStatsMap = Record<string, DeptStats>;
export interface DeptStats {
  male: number;
  female: number;
  ageRange: string;
  hair: Record<string, number>;
  addressUser: Record<string, string>;
  _min?: number;
  _max?: number;
}