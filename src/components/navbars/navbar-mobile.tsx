import type { Dispatch } from "react";
import { Button } from "~/components/ui/button";
import { XOctagon } from "lucide-react";
import Link from "next/link";

interface Props {
  role: string | undefined;
  open: boolean;
  setOpen: Dispatch<boolean>;
}

export default function NavbarMobile({ role, open, setOpen }: Props) {
  return (
    <div className="fixed right-0 top-0 flex h-screen w-full justify-end backdrop-blur">
      <div className="h-screen w-3/5 border-l bg-background px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">SIP</h1>
          <Button onClick={() => setOpen(!open)} variant="ghost" size="icon">
            <XOctagon />
          </Button>
        </div>
        <div className="mt-10 flex flex-col items-end gap-5">
          <Link href="/">
            <Button variant="link" className="underline underline-offset-4">
              Beranda
            </Button>
          </Link>
          <Link href={`/dashboard/${role == "admin" ? "admin" : "mahasiswa"}`}>
            <Button variant="link" className="underline underline-offset-4">
              Dashboard
            </Button>
          </Link>
          {role !== "admin" && (
            <Link href="/dashboard/buku">
              <Button variant="link" className="underline underline-offset-4">
                Buku
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
