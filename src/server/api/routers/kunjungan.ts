import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const kunjunganRouter = createTRPCRouter({
  simpan: protectedProcedure
    .input(
      z.object({
        nama: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      const simpan = ctx.db.kunjungan.create({
        data: {
          nama: input.nama,
        },
      });
      return simpan;
    }),
  semua: protectedProcedure.query(async ({ ctx }) => {
    const kunjungan = await ctx.db.kunjungan.findMany();
    return { kunjungan };
  }),
});
