import { useQuery } from "@tanstack/react-query";
import { apiGetUserProfile } from "../../api";

export default function useProfile() {
  const {
    isLoading,
    data: user,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => apiGetUserProfile(),
  });

  return {
    isLoading,
    user,
    refetch,
    isFetching,
    isRoles: user?.data?.roles?.includes("admin"),
  };
}
