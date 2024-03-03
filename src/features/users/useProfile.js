import { useQuery } from "@tanstack/react-query";
import { apiGetUserProfile } from "../../services/apiUsers";

export function useProfile() {
  const access_token = localStorage.getItem("access_token");

  const {
    isLoading,
    data: user,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => apiGetUserProfile(access_token),
  });

  return {
    isLoading,
    user,
    refetch,
    isFetching,
    isRoles: user?.data?.roles?.includes("admin"),
  };
}
