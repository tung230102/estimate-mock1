import { useQuery } from "@tanstack/react-query";
import { apiGetUsers } from "../../services/apiUsers";

export function useUsers(page) {
  const getUsers = async (currentPage) => {
    const access_token = localStorage.getItem("access_token");
    const res = await apiGetUsers(access_token, currentPage);
    return res;
  };

  const {
    isLoading,
    data: users,
    error,
  } = useQuery({ queryKey: ["users", page], queryFn: () => getUsers(page) });

  return { isLoading, error, users };
}
