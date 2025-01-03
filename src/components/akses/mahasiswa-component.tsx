import Link from "next/link";

export function MahasiswaAkses() {
  return (
    <div className="grid h-screen place-content-center">
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">Akses Dibatasi</h1>
        <div className="flex items-center gap-1">
          <p>Kembali ke</p>
          <Link
            href="/dashboard/admin"
            className="text-blue-600 underline underline-offset-4"
          >
            dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
