"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { isLogin } from "~/lib/user";
import Image from "next/image";
import Link from "next/link";
import HomeLayout from "~/components/layouts/home-layout";

export default function Page() {
  const { user } = useUser();
  const session = isLogin();
  const router = useRouter();
  const role = user?.publicMetadata.role;
  const navigate = () => {
    console.log(role);
  };

  return (
    <HomeLayout>
      <main className="flex min-h-screen flex-col items-center justify-between bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-slate-900 to-black">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(251,191,36,0.1),transparent)]" />

        {/* Main Content - Using screen height calculations */}
        <div className="relative flex h-screen w-full flex-col items-center justify-center px-4">
          {/* Logo Section */}
          <div className="mb-16">
            <div className="relative h-32 w-32 overflow-hidden rounded-xl">
              <Image
                src="/uti.png"
                alt="logo uti"
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
              />
            </div>
          </div>

          {/* Title & Description Section */}
          <div className="mb-12 space-y-8 text-center">
            <h1 className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
              Sistem Informasi Perpustakaan
            </h1>
            <div className="mx-auto h-0.5 w-24 bg-gradient-to-r from-amber-400 to-amber-600" />
            <p className="mx-auto max-w-2xl text-base text-gray-400 md:text-lg">
              Sistem Informasi Perpustakaan yang mempermudah pencarian dan
              peminjaman buku secara praktis dan efisien.
            </p>
          </div>

          {/* Button Section */}
          <div className="mb-16">
            <Link
              href={
                !session
                  ? "/auth/login"
                  : role === "admin"
                    ? "/dashboard/admin"
                    : "/dashboard/mahasiswa"
              }
            >
              <Button
                className="h-12 w-48 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 text-base font-medium text-white shadow-lg transition-all duration-300 hover:from-amber-600 hover:to-amber-700 hover:shadow-amber-500/20"
                onClick={navigate}
              >
                {!session ? "Login" : "Dashboard"}
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </HomeLayout>
  );
}
