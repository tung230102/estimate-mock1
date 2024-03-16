import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiDeleteUser } from "../../api";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { isPending: isLoading, mutate: deleteUser } = useMutation({
    mutationFn: (id) => apiDeleteUser(id),
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
