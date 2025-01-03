export const metadata = {
  title: "SIP UTI",
  description: "Sistem manajemen perpustakaan yang efisien dan modern",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-slate-900 to-black">
      <div className="relative flex min-h-screen w-full items-center justify-center">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,rgba(251,191,36,0.1),transparent)]" />

        {/* Content container */}
        <div className="relative w-full">{children}</div>
      </div>
    </div>
  );
}
