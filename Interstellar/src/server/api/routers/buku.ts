import {
  protectedProcedure,
  createTRPCRouter,
  adminProcedure,
} from "~/server/api/trpc";
import { z } from "zod";

export const bukuRouter = createTRPCRouter({
  semua: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.buku.findMany({
      include: {
        rak: true,
      },
    });
  }),
  jumlah: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.buku.count();
  }),
  pinjam: protectedProcedure
    .input(
      z.object({
        waktu: z.string(),
        idBuku: z.string(),
        idUser: z.string(),
        namaBuku: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [updateStatus, pinjamBuku] = await ctx.db.$transaction([
        ctx.db.buku.update({
          data: { dipinjam: true },
          where: { id: input.idBuku },
        }),
        ctx.db.peminjaman.create({
          data: {
            idBuku: input.idBuku,
            idUser: input.idUser,
            waktu: input.waktu,
            namaBuku: input.namaBuku,
          },
        }),
      ]);
    }),
  jumlah_dipinjam: protectedProcedure.query(async ({ ctx }) => {
    const dipinjam = await ctx.db.peminjaman.count({
      where: { idUser: ctx.userId },
    });
    return dipinjam;
  }),
  semua_dipinjam: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.peminjaman.findMany({
      where: {
        idUser: ctx.userId,
      },
    });
  }),
  pengembalian_buku: protectedProcedure
    .input(
      z.object({
        idPeminjaman: z.string(),
        idBuku: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [kembalikan, ubahStatus] = await ctx.db.$transaction([
        ctx.db.peminjaman.delete({
          where: {
            id: input.idPeminjaman,
            idBuku: input.idBuku,
          },
        }),
        ctx.db.buku.update({
          data: {
            dipinjam: false,
          },
          where: {
            id: input.idBuku,
          },
        }),
      ]);
    }),
  tambah_buku: adminProcedure
    .input(
      z.object({
        nomor: z.string(),
        nama: z.string(),
        idRak: z.string(),
        dipinjam: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.buku.create({
        data: {
          nomor: input.nomor,
          nama: input.nama,
          idRak: input.idRak,
          dipinjam: input.dipinjam,
        },
      });
    }),
  ubah_buku: adminProcedure
    .input(
      z.object({
        id: z.string(),
        nomor: z.string(),
        nama: z.string(),
        idRak: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.buku.update({
        where: {
          id: input.id,
        },
        data: {
          nomor: input.nomor,
          nama: input.nama,
          idRak: input.idRak,
        },
      });
    }),
  hapus_buku: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.buku.delete({ where: { id: input.id } });
    }),
});
