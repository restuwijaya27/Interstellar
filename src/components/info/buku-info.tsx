import { api } from "~/trpc/server";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { Book } from "lucide-react";

export default async function BukuInfo() {
  const jumlah = await api.buku.jumlah();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <span>BUKU</span>
            <span>
              <Book />
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <h1 className="text-4xl font-semibold">{jumlah ?? 0}</h1>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        * Jumlah buku yang ada di perpustakaan.
      </CardFooter>
    </Card>
  );
}
