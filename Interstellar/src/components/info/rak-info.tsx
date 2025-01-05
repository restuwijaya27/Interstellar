import { api } from "~/trpc/server";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "~/components/ui/card";
import { SquareLibrary } from "lucide-react";

export default async function RakInfo() {
  const jumlah = await api.rak.jumlah();

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <span>RAK</span>
            <span>
              <SquareLibrary />
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <h1 className="text-4xl font-semibold">{jumlah ?? 0}</h1>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        * Jumlah rak yang ada di perpustakaan.
      </CardFooter>
    </Card>
  );
}
