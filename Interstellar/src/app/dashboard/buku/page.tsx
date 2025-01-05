import { api } from "~/trpc/server";
import { auth } from "@clerk/nextjs/server";
import { columns } from "~/components/table/col-buku";
import { MahasiswaAkses } from "~/components/akses/mahasiswa-component";

import DataTable from "~/components/table/table-buku";
import BukuLayout from "~/components/layouts/buku-layout";
import { AdminAkses } from "~/components/akses/admin-component";

export default async function Page() {
  // mahasiswa only
  const { sessionClaims } = auth();
  const role = sessionClaims?.metadata.role;

  if (role === "admin") {
    return <AdminAkses />;
  }
  // end mahasiswa only

  const data = await api.buku.semua();

  return (
    <BukuLayout>
      <div className="w-full overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-1">
        <div className="rounded-xl bg-gradient-to-b from-black/60 to-black/40 p-6 backdrop-blur-xl">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-gradient-to-b from-amber-400 to-amber-600"></div>
              <div>
                <h1 className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-2xl font-bold text-transparent">
                  Halaman Daftar Buku
                </h1>
                <p className="mt-2 text-sm text-gray-400">
                  Silahkan tuliskan di form pencarian buku yang anda ingin cari.
                </p>
              </div>
            </div>
          </div>

          {/* Table Section */}
          <div className="overflow-hidden rounded-xl border border-amber-500/10 bg-black/40 shadow-[inset_0_0_20px_rgba(251,191,36,0.05)]">
            <div className="overflow-x-auto">
              <DataTable data={data} columns={columns} />
            </div>
          </div>
        </div>
      </div>
    </BukuLayout>
  );
}
