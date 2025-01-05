"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { type RouterOutput } from "~/server/api/trpc";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "~/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { useToast } from "~/components/ui/use-toast";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";

type Data = {
  id: string;
  nomor: string | null;
  nama: string;
  idRak: string;
  dipinjam: boolean;
  rak: { id: string; nama: string };
};

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "nomor",
    header: "No.",
    cell: ({ row }) => {
      const no = row.original.nomor;
      return <Badge>{no}</Badge>;
    },
  },
  {
    accessorKey: "rak.nama",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rak Buku
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rak = row.original.rak.nama;
      return <Badge variant="secondary">{rak}</Badge>;
    },
  },
  {
    accessorKey: "nama",
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
    accessorKey: "dipinjam",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.dipinjam;

      return (
        <Badge variant={`${!status ? "default" : "destructive"}`}>
          {!status ? "Tersedia" : "Dipinjam"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const { toast } = useToast();
      const router = useRouter();
      const user = useUser();
      const data = row.original;
      const formatter = new Intl.DateTimeFormat("id-ID", {
        timeZone: "Asia/Jakarta",
        dateStyle: "full",
        timeStyle: "long",
      });

      const formattedDate = formatter.format(new Date());

      const mutate = api.buku.pinjam.useMutation({
        onSuccess() {
          router.refresh();
          toast({
            title: "Berhasil Dipinjam",
            description: `Buku ${data.nama} berhasil dipinjam!`,
          });
        },
      });
      const pinjamBuku = () => {
        if (data.dipinjam) {
          return toast({
            title: "Buku Tidak Tersedia",
            description: `Saat ini Buku ${data.nama} tidak tersedia untuk dipinjam`,
          });
        }
        mutate.mutate({
          idBuku: row.original.id,
          idUser: user.user?.id!,
          namaBuku: row.original.nama,
          waktu: formattedDate,
        });
      };

      return (
        <AlertDialog>
          <DropdownMenu>
            {!mutate.isPending ? (
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            ) : (
              "mohon tunggu..."
            )}
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuItem>
                <AlertDialogTrigger>Pinjam Buku</AlertDialogTrigger>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex flex-col items-center gap-6 md:flex-row">
                <Badge>{data.nomor}</Badge>
                <span>{data.nama}</span>
              </AlertDialogTitle>
              <AlertDialogDescription>
                Apakah anda yakin untuk meminjam buku ini? Click lanjutkan untuk
                meminjam buku <span className="font-semibold">{data.nama}</span>
                .
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              <AlertDialogAction onClick={pinjamBuku}>
                Lanjutkan
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    },
  },
];
