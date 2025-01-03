import { auth } from "@clerk/nextjs"
import NavbarMain from "~/components/navbars/navbar-main";

export const metadata = {
  title: "SIP - Buku",
  description: "Daftar buku di perpustakaan",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function BukuLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { sessionClaims } = auth()

  return (
    <>
      {/* navbar */}
      <NavbarMain role={sessionClaims?.metadata.role}/>
      <main className="mt-16 p-6">{children}</main>
    </>
  );
}
