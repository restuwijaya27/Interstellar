import { api } from "~/trpc/server";
import { auth } from "@clerk/nextjs/server";
import { MahasiswaAkses } from "~/components/akses/mahasiswa-component";
import { columns } from "~/components/table/col-pinjaman";

import DashboardLayout from "~/components/layouts/dashboard-layout";
import BukuInfo from "~/components/info/buku-info";
import RakInfo from "~/components/info/rak-info";
import PinjamInfo from "~/components/info/pinjam-info";
import DataTable from "~/components/table/table-pinjaman";

export default async function Page() {
  // mahasiswa only
  const { sessionClaims } = auth();
  const role = sessionClaims?.metadata.role;

  if (role === "admin" || role == undefined) {
    return <MahasiswaAkses/>;
  }
  // end mahasiswa only

  const data = await api.buku.semua_dipinjam();

  return (
    <DashboardLayout>
      <div className="my-5 w-full">
        <div className="grid h-[85vh] grid-cols-1 place-content-center gap-10 md:h-[40vh] md:grid-cols-3">
          {/* buku */}
          <BukuInfo />
          {/* Rak */}
          <RakInfo />
          {/* Pinjam */}
          <PinjamInfo />
          {/* daftar buku yang dipinjam */}
        </div>
        <div className="w-full">
          <div className="mb-3 leading-relaxed">
            <h1 className="text-xl font-semibold">Daftar Pinjaman</h1>
            <p className="text-sm text-muted-foreground">
              Silahkan tuliskan di form pencarian buku yang anda ingin cari.
            </p>
          </div>
          <DataTable data={data} columns={columns} />
        </div>
      </div>
    </DashboardLayout>
  );
}