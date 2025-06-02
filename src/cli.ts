// src/cli.ts
import { fetchUsers } from './lib/fetchUsers.js';
import { groupByDepartment } from './lib/group.js';

async function main() {
  const users = await fetchUsers();
  console.time('group');
  const stats = groupByDepartment(users);
  console.timeEnd('group');
  console.log(JSON.stringify(stats, null, 2));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
