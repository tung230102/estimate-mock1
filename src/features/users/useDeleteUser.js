import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiDeleteUser } from "../../services/apiUsers";

export function useDeleteUser() {
  const access_token = localStorage.getItem("access_token");
  const queryClient = useQueryClient();

  const { isPending: isLoading, mutate: deleteUser } = useMutation({
    mutationFn: (id) => apiDeleteUser(access_token, id),
    onSuccess: (res) => {
      if (res && res.statusCode === 200) {
        toast.success(res.message);
      } else {
        toast.success(res.message);
      }
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, deleteUser };
}
