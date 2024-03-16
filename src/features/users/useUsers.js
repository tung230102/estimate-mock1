import { useQuery } from "@tanstack/react-query";
import { apiGetUsers } from "../../api";

export function useUsers(params) {
  const getUsers = async () => {
    const res = await apiGetUsers(params);
    return res;
  };

  const {
    isLoading,
    data: users,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  return { isLoading, error, users };
}
