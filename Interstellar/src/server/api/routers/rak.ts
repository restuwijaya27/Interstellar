import {
  createTRPCRouter,
  protectedProcedure,
  adminProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const rakRouter = createTRPCRouter({
  jumlah: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.rak.count();
  }),
  semua: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.rak.findMany();
  }),
  hapus: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.rak.delete({ where: { id: input.id } });
    }),
  tambah: adminProcedure
    .input(z.object({ nama: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.rak.create({
        data: {
          nama: input.nama,
        },
      });
    }),
  ubah: adminProcedure
    .input(
      z.object({
        id: z.string(),
        nama: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.rak.update({
        where: {
          id: input.id,
        },
        data: {
          nama: input.nama,
        },
      });
    }),
});
