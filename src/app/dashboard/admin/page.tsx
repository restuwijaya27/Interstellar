import { auth } from "@clerk/nextjs/server";
import { api } from "~/trpc/server";
import { AdminAkses } from "~/components/akses/admin-component";
import { columns as ColBuku } from "~/components/table/admin/col-buku";
import { columns as ColRak } from "~/components/table/admin/col-rak";
import { columns as ColPengunjung } from "~/components/table/admin/col-pengunjung";

import DashboardLayout from "~/components/layouts/dashboard-layout";
import DataTableBuku from "~/components/table/admin/table-buku";
import DataTableRak from "~/components/table/admin/table-rak";
import DataTablePengunjung from "~/components/table/admin/table-pengunjung";

export default async function Page() {
  const { sessionClaims } = auth();
  const role = sessionClaims?.metadata.role;
  if (role !== "admin" || role == undefined) {
    return <AdminAkses />;
  }

  const buku = await api.buku.semua();
  const rak = await api.rak.semua();
  const pengunjung = await api.kunjungan.semua();

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-slate-900 to-black p-8">
        <div className="grid grid-cols-1 gap-8 pt-6 md:gap-12 md:pt-8">
          {/* Main Content */}
          <div className="flex w-full flex-col gap-8 md:flex-row">
            {/* Buku Section */}
            <div className="w-full overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-1">
              <div className="rounded-xl bg-gradient-to-b from-black/60 to-black/40 p-6 backdrop-blur-xl">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-1 rounded-full bg-gradient-to-b from-amber-400 to-amber-600"></div>
                    <h2 className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-2xl font-bold text-transparent">
                      Daftar Buku
                    </h2>
                  </div>
                </div>
                <div className="overflow-hidden rounded-xl border border-amber-500/10 bg-black/40 shadow-[inset_0_0_20px_rgba(251,191,36,0.05)]">
                  <div className="overflow-x-auto">
                    <DataTableBuku columns={ColBuku} data={buku} />
                  </div>
                </div>
              </div>
            </div>

            {/* Rak Section */}
            <div className="w-full overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-1 md:max-w-md">
              <div className="rounded-xl bg-gradient-to-b from-black/60 to-black/40 p-6 backdrop-blur-xl">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-1 rounded-full bg-gradient-to-b from-amber-400 to-amber-600"></div>
                    <h2 className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-2xl font-bold text-transparent">
                      Daftar Rak
                    </h2>
                  </div>
                </div>
                <div className="overflow-hidden rounded-xl border border-amber-500/10 bg-black/40 shadow-[inset_0_0_20px_rgba(251,191,36,0.05)]">
                  <div className="overflow-x-auto">
                    <DataTableRak columns={ColRak} data={rak} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pengunjung Section */}
          <div className="w-full overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-1">
            <div className="rounded-xl bg-gradient-to-b from-black/60 to-black/40 p-6 backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-1 rounded-full bg-gradient-to-b from-amber-400 to-amber-600"></div>
                  <h2 className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-2xl font-bold text-transparent">
                    Daftar Pengunjung
                  </h2>
                </div>
              </div>
              <div className="overflow-hidden rounded-xl border border-amber-500/10 bg-black/40 shadow-[inset_0_0_20px_rgba(251,191,36,0.05)]">
                <div className="overflow-x-auto">
                  <DataTablePengunjung
                    columns={ColPengunjung}
                    data={pengunjung.kunjungan}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
