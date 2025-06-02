/* eslint-disable @typescript-eslint/consistent-type-definitions */

import type {
  UntypedServiceImplementation,
  handleUnaryCall,
  ServiceDefinition,
} from "@grpc/grpc-js";

/* ------------------------------------------------------------------ */
/* 📨  Message types                                                   */
/* ------------------------------------------------------------------ */

export type Empty = Record<string, never>;

export interface HairCount {
  color: string;
  count: number;
}

export interface DeptInfo {
  name: string;
  male: number;
  female: number;
  ageRange: string;
  hair: HairCount[];
}

export interface DeptResponse {
  departments: DeptInfo[];
}

/* ------------------------------------------------------------------ */
/* 🛰  Service types                                                   */
/* ------------------------------------------------------------------ */

export interface SummaryService {
  /** Returns grouped statistics for all departments */
  GetStats(request: Empty): Promise<DeptResponse>;
}

/**
 * gRPC-JS implementation signature
 * ```ts
 * const impl: SummaryServiceImplementation = {
 *   async GetStats(call, callback) { ... }
 * }
 * ```
 */
export interface SummaryServiceImplementation
  extends UntypedServiceImplementation {
  GetStats: handleUnaryCall<Empty, DeptResponse>;
}

/**
 * Service definition object required by `server.addService(...)`
 */
export interface SummaryServiceDefinition extends ServiceDefinition {
  readonly GetStats: {
    readonly path: "/summary.Summary/GetStats";
    readonly requestStream: false;
    readonly responseStream: false;
    readonly requestSerialize: (value: Empty) => Buffer;
    readonly requestDeserialize: (bytes: Uint8Array) => Empty;
    readonly responseSerialize: (value: DeptResponse) => Buffer;
    readonly responseDeserialize: (bytes: Uint8Array) => DeptResponse;
  };
}

/* ------------------------------------------------------------------ */
/* 📦  Minimal runtime helpers (encode/decode no-op)                   */
/* ------------------------------------------------------------------ */

const noopSer = <T>(_: T) => Buffer.alloc(0);          // 💤
const noopDe  = <T>(_: Uint8Array) => ({} as T);       // 💤

export const SummaryServiceDefinition: SummaryServiceDefinition = {
  GetStats: {
    path: "/summary.Summary/GetStats",
    requestStream: false,
    responseStream: false,
    requestSerialize: noopSer,
    requestDeserialize: noopDe,
    responseSerialize: noopSer,
    responseDeserialize: noopDe,
  },
};
