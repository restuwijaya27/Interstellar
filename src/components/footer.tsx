import Link from "next/link";

export default function Footer() {
  const tahun = new Date();

  return (
    <footer className="border-t border-amber-500/10 bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-xl">
      <div className="flex h-12 items-center justify-between px-6">
        <span className="bg-gradient-to-r from-amber-200/80 to-amber-400/80 bg-clip-text text-xs font-medium text-transparent">
          &copy; {tahun.getFullYear()} Sistem Informasi Perpustakaan - Interstellar
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500">Created by</span>
          <Link
            href="https://github.com/restuwijaya27"
            className="bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-xs font-semibold text-transparent transition-all hover:from-amber-300 hover:to-amber-500"
          >
            Interstellar
          </Link>
        </div>
      </div>
    </footer>
  );
}
