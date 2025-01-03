"use client";

import { api } from "~/trpc/react";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useToast } from "~/components/ui/use-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import Link from "next/link";
import KunjunganLayout from "~/components/layouts/kunjungan-layout";

export default function Page() {
  const [status, setStatus] = useState<boolean>(false);
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  const [waktu, setWaktu] = useState<string>("");

  // Render waktu hanya di klien
  const formatter = new Intl.DateTimeFormat("id-ID", {
    timeZone: "Asia/Jakarta",
    dateStyle: "full",
    timeStyle: "long",
  });

  const formattedDate = formatter.format(new Date());

  const mutate = api.kunjungan.simpan.useMutation({
    onSuccess: () => {
      toast({
        title: "Kunjungan anda berhasil dikirim",
        description: `Waktu kunjungan ${waktu}`,
      });
    },
  });

  if (!isLoaded)
    return (
      <div className="grid h-screen place-content-center">
        <h1 className="font-semibold">memuat ...</h1>
      </div>
    );

  return (
    <KunjunganLayout>
      <Card className="w-full md:max-w-sm">
        <CardHeader>
          <CardTitle className="mb-3">Data Kunjungan</CardTitle>
          <Badge variant="secondary" className="w-fit">
            {waktu}
          </Badge>
          <CardDescription className="flex flex-col gap-3">
            <span className="mt-3 text-muted-foreground">
              Setiap kali anda berkunjung di perpustakaan harap mengisi data
              kunjungan
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {mutate.isSuccess ? (
            <div className="flex flex-col items-center gap-3 text-green-600">
              Data kunjungan berhasil dikirim!
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <span className="text-sm text-muted-foreground">
                Berkunjung sebagai
              </span>
              <span className="text-base font-semibold underline underline-offset-4">
                {user?.fullName ?? user?.primaryEmailAddress?.emailAddress}
              </span>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          {!status ? (
            <Button
              className="w-full"
              onClick={() => {
                mutate.mutate({
                  nama:
                    user?.fullName! ?? user?.primaryEmailAddress?.emailAddress!,
                });
                setStatus(true);
              }}
              disabled={mutate.isPending}
            >
              Lanjutkan
            </Button>
          ) : (
            <Link href="/dashboard/mahasiswa" className="w-full">
              <Button className="w-full" disabled={mutate.isPending}>
                Pergi ke Dashboard
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </KunjunganLayout>
  );
}
