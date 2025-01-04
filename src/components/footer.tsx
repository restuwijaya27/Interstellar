import Link from "next/link";

export default function Footer() {
  const tahun = new Date();

  return (
    <footer className="bg-gradient-to-r from-base-300 via-neutral to-base-300">
      <div className="footer footer-center p-4 bg-base-300/50 text-base-content border-t border-base-200">
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-2">
          <span className="text-sm">
            &copy; {tahun.getFullYear()} Sistem Informasi Perpustakaan -
            Interstellar
          </span>
          <div className="text-sm">
            <span>Created by </span>
            <Link
              href="https://github.com/restuwijaya27"
              className="link link-hover link-primary font-medium">
              Interstellar
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
