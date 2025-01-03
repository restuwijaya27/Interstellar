import { api } from "~/trpc/server";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { HandHelping } from "lucide-react";

export default async function PinjamInfo() {
  const jumlah = await api.buku.jumlah_dipinjam();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <span>DIPINJAM</span>
            <span>
              <HandHelping />
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <h1 className="text-4xl font-semibold">{jumlah ?? 0}</h1>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        * Jumlah buku yang anda pinjam di perpustakaan.
      </CardFooter>
    </Card>
  );
}
