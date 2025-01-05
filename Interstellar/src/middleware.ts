import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/", "/api/trpc/(.*)", "/auth/(.*)"],
  debug: false,
});

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)",
    "/cgi-bin/luci/;stok=/locale",
  ],
};
