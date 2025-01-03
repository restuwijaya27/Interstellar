import { useSession } from "@clerk/nextjs";

export const isLogin = () => {
  const { session } = useSession();
  if (session?.user.id) return true;
  return false;
};
