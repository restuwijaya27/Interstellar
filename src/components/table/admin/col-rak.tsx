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
import { useRouter } from "next/navigation";
import { useToast } from "~/components/ui/use-toast";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { api } from "~/trpc/react";

type Data = {
  id: string;
  nama: string;
};

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: "nama",
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
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Opsi",
    cell: ({ row }) => {
      const { refresh } = useRouter();
      const { toast } = useToast();

      const hapusMutation = api.rak.hapus.useMutation({
        onSuccess: () => {
          refresh();
          toast({
            title: "Berhasil",
            description: "Rak berhasil dihapus",
          });
        },
      });

      const ubahMutation = api.rak.ubah.useMutation({
        onSuccess: () => {
          refresh();
          toast({
            title: "Berhasil",
            description: "Data rak berhasil diubah",
          });
        },
      });

      const formSchema = z.object({
        id: z.string(),
        nama: z.string().min(2).max(50),
      });

      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          id: row.original.id,
          nama: row.original.nama,
        },
      });

      const onSubmit = (val: z.infer<typeof formSchema>) => {
        ubahMutation.mutate({ nama: val.nama, id: val.id });
      };

      return (
        <Dialog>
          <DropdownMenu>
            {!hapusMutation.isPending ? (
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
            ) : (
              <p className="text-sx text-muted-foreground">memuat...</p>
            )}
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Opsi</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => hapusMutation.mutate({ id: row.original.id })}
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
              <DialogTitle>Edit Rak</DialogTitle>
              <DialogDescription>Form untuk mengedit rak</DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Rak</FormLabel>
                      <FormControl>
                        <Input placeholder="....." {...field} />
                      </FormControl>
                      <FormDescription>Masukan nama Rak</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={ubahMutation.isPending}>
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
