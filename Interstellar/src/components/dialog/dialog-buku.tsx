"use client";

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
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import { z } from "zod";

export default function DialogBuku() {
  const { data: rak, isLoading } = api.rak.semua.useQuery();
  const { toast } = useToast();
  const { refresh } = useRouter();

  const formSchema = z.object({
    nomor: z.string().min(2).max(50),
    nama: z.string().min(2).max(50),
    idRak: z.string(),
    dipinjam: z.boolean(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nomor: "",
      nama: "",
      idRak: "",
      dipinjam: false,
    },
  });

  const mutate = api.buku.tambah_buku.useMutation({
    onSuccess: () => {
      refresh();
      toast({
        title: "Berhasil",
        description: "Buku berhasil ditambahkan",
      });
    },
  });

  const onSubmit = (val: z.infer<typeof formSchema>) => {
    mutate.mutate({
      nomor: val.nomor,
      nama: val.nama,
      idRak: val.idRak,
      dipinjam: val.dipinjam,
    });
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Buku Baru</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buku Baru</DialogTitle>
          <DialogDescription>
            Form untuk menambahkan Buku baru
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="nomor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nomor Buku</FormLabel>
                  <FormControl>
                    <Input placeholder="....." {...field} />
                  </FormControl>
                  <FormDescription>Masukan nomor buku</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Buku</FormLabel>
                  <FormControl>
                    <Input placeholder="....." {...field} />
                  </FormControl>
                  <FormDescription>Masukan nama buku</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading ? (
              "memuat ..."
            ) : (
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
            )}
            <DialogFooter>
              <Button type="submit" disabled={mutate.isPending}>
                Tambahkan
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
