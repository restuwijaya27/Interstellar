"use client";

import { type ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Badge } from "~/components/ui/badge";
import { api } from "~/trpc/react";
import { z } from "zod";

type Buku = {
  id: string;
  nomor: string | any;
  nama: string;
  idRak: string;
  dipinjam: boolean;
};

type Data = {
  rak: {
    id: string;
    nama: string;
  };
};

export const columns: ColumnDef<Data & Buku>[] = [
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
    cell: ({ row }) => {
      return <p className="truncate text-ellipsis">{row.original.nama}</p>;
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
    header: "Opsi",
    cell: ({ row }) => {
      const { data: rak } = api.rak.semua.useQuery();
      const { refresh } = useRouter();
      const { toast } = useToast();

      const hapusMutate = api.buku.hapus_buku.useMutation({
        onSuccess: () => {
          toast({
            title: "Berhasil",
            description: "Buku berhasil dihapus",
          });
          refresh();
        },
      });

      const ubahMutate = api.buku.ubah_buku.useMutation({
        onSuccess: () => {
          toast({
            title: "Berhasil",
            description: "Buku berhasil diubah",
          });
          refresh();
        },
      });

      const formSchema = z.object({
        id: z.string(),
        nomor: z.string(),
        nama: z.string().min(2).max(50),
        idRak: z.string(),
      });

      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          id: row.original.id,
          nomor: row.original.nomor,
          nama: row.original.nama,
          idRak: row.original.idRak,
        },
      });

      const onSubmit = (val: z.infer<typeof formSchema>) => {
        ubahMutate.mutate({
          id: val.id,
          nomor: val.nomor,
          nama: val.nama,
          idRak: val.idRak,
        });
      };

      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Opsi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => hapusMutate.mutate({ id: row.original.id })}
                className="text-destructive"
              >
                Hapus
              </DropdownMenuItem>
              <DialogTrigger className="w-full">
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit buku</DialogTitle>
              <DialogDescription>Form untuk mengedit buku</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="nomor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor buku</FormLabel>
                      <FormControl>
                        <Input placeholder="....." {...field} />
                      </FormControl>
                      <FormDescription>Ubah nomor buku</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama buku</FormLabel>
                      <FormControl>
                        <Input placeholder="....." {...field} />
                      </FormControl>
                      <FormDescription>Ubah nama buku</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="idRak"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rak buku</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="-- rak buku --" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {rak?.map((r) => (
                            <SelectItem value={r.id} key={r.id}>
                              {r.nama}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Silahkan pilih rak buku</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={ubahMutate.isPending}>
                    Simpan
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
