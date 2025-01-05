"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "~/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from "~/components/ui/alert-dialog";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { toast, useToast } from "~/components/ui/use-toast";

export type Props = {
  id: string;
  waktu: string;
  namaBuku: string;
  idBuku: string;
  idUser: string;
  status: boolean;
};

export const columns: ColumnDef<Props>[] = [
  {
    accessorKey: "waktu",
    header: "Waktu",
  },
  {
    accessorKey: "namaBuku",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Buku
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status Pengembalian
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={!status ? "destructive" : "default"}>
          {!status ? "Belum Dikembalikan" : "Dikembalikan"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter();
      const { toast } = useToast();
      const data = row.original;
      const mutate = api.buku.pengembalian_buku.useMutation({
        onSuccess: () => {
          router.refresh();
          toast({
            title: "Berhasil Dikembalikan",
            description: `Buku berhasil dikembalikan!`,
          });
        },
      });

      return (
        <AlertDialog>
          <DropdownMenu>
            {!mutate.isPending && (
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            )}
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuItem>
                <AlertDialogTrigger>Kembalikan Buku</AlertDialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Kembalikan Buku?</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah anda yakin untuk mengembalikan buku ini? Click lanjutkan
                untuk mengembalikan buku{" "}
                <span className="font-semibold">{data.namaBuku}</span>.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (data.status) return;
                  mutate.mutate({ idBuku: data.idBuku, idPeminjaman: data.id });
                }}
              >
                Lanjutkan
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
