import { Server, ServerCredentials, loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { fetchUsers } from '../lib/fetchUsers.js';
import { groupByDepartment } from '../lib/group.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const PROTO = path.resolve('src/grpc/summary.proto');
const pkgDef = loadSync(PROTO, { keepCase: true, longs: String, enums: String, defaults: true });
const proto = loadPackageDefinition(pkgDef) as any;

const server = new Server();

server.addService(proto.summary.Summary.service, {
  async GetStats(_: unknown, cb: (error: Error | null, response?: any) => void) {
    try {
      const users = await fetchUsers();
      const raw = groupByDepartment(users);
      const departments = Object.entries(raw).map(([name, d]) => ({
        name,
        male: d.male,
        female: d.female,
        ageRange: d.ageRange,
        hair: Object.entries(d.hair).map(([color, count]) => ({ color, count })),
      }));
      cb(null, { departments });
    } catch (e) {
      cb(e as Error);
    }
  },
});

export function startGrpc(port = 50051) {
  server.bindAsync(`0.0.0.0:${port}`, ServerCredentials.createInsecure(), () => {
    console.log(`🛰  gRPC on ${port}`);
  });
}

// ⬇️  Dev runner
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startGrpc();
}