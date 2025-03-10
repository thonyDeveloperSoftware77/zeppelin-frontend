import { useUser } from "@clerk/clerk-react";

const useUserRole = () => {
  const { user } = useUser();
  return user?.publicMetadata?.role || "student";
};

export default useUserRole;
