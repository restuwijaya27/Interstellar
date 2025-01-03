export const metadata = {
  title: "SIP - Buku",
  description: "Daftar buku di perpustakaan",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function KunjunganLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* navbar */}
      <main className="grid h-screen place-content-center p-6">{children}</main>
    </>
  );
}
