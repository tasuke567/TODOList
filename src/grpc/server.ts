import {
  Server,
  ServerCredentials,
  loadPackageDefinition,
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { fetchUsers } from "../lib/fetchUsers.js";
import { groupByDepartment } from "../lib/group.js";
import { fileURLToPath } from "node:url";
import path from "node:path";

// 🗂️  Find proto relative to this file (safe for TS/JS & CJS/ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROTO = path.join(__dirname, "summary.proto");

// 🪄  Generated types from ts-proto
import type {
  SummaryServiceDefinition,
  DeptResponse,
  HairCount,
  DeptInfo,
} from "./summary";

const pkgDef = loadSync(PROTO, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
});

const proto = loadPackageDefinition(pkgDef) as unknown as {
  summary: { Summary: SummaryServiceDefinition };
};

const server = new Server();

/* -------------------------------------------------------- */
/* 🛠  helpers                                              */
/* -------------------------------------------------------- */
function toGrpcHair([color, count]: [string, number]): HairCount {
  return { color, count };
}

function toGrpcDept([name, d]: [string, ReturnType<typeof groupByDepartment>[string]]): DeptInfo {
  return {
    name,
    male: d.male,
    female: d.female,
    ageRange: d.ageRange,
    hair: Object.entries(d.hair).map(toGrpcHair),
  };
}

/* -------------------------------------------------------- */
/* 🛰  Service impl                                          */
/* -------------------------------------------------------- */
server.addService(proto.summary.Summary, {
  async GetStats(
    _req: unknown,
    cb: (error: Error | null, response?: DeptResponse) => void
  ): Promise<void> {
    try {
      const users = await fetchUsers();
      const raw = groupByDepartment(users);
      const departments: DeptResponse["departments"] =
        Object.entries(raw).map(toGrpcDept);

      cb(null, { departments });
    } catch (err) {
      cb(err as Error);
    }
  },
});

/* -------------------------------------------------------- */
/* 🚀 Boot function                                         */
/* -------------------------------------------------------- */
export async function startGrpc(port = 50051) {
  await new Promise<void>((resolve, reject) =>
    server.bindAsync(
      `0.0.0.0:${port}`,
      ServerCredentials.createInsecure(),
      (err) => (err ? reject(err) : resolve())
    )
  );
  console.log(`🛰️  gRPC on ${port}`);
}

/* -------------------------------------------------------- */
/* 🏃‍♂️ Dev runner (tsx ts-node etc.)                       */
/* -------------------------------------------------------- */
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startGrpc().catch((e) => {
    console.error("gRPC failed to start:", e);
    process.exit(1);
  });
}
