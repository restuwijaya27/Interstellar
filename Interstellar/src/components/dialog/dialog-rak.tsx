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
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "~/trpc/react";
import { z } from "zod";

export default function DialogRak() {
  const { toast } = useToast();
  const { refresh } = useRouter();

  const formSchema = z.object({
    nama: z.string().min(2).max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
    },
  });

  const mutate = api.rak.tambah.useMutation({
    onSuccess: () => {
      refresh();
      toast({
        title: "Berhasil",
        description: "Rak berhasil ditambahkan",
      });
    },
  });

  const onSubmit = (val: z.infer<typeof formSchema>) => {
    mutate.mutate({ nama: val.nama });
    form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Rak Baru</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rak Baru</DialogTitle>
          <DialogDescription>Form untuk menambahkan Rak baru</DialogDescription>
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
