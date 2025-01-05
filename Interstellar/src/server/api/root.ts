import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { bukuRouter } from "~/server/api/routers/buku";
import { kunjunganRouter } from "~/server/api/routers/kunjungan";
import { rakRouter } from "./routers/rak";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  buku: bukuRouter,
  kunjungan: kunjunganRouter,
  rak: rakRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
