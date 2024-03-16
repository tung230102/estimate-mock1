import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiDeleteQuestion } from "../../api";

export function useDeleteQuestion() {
  const queryClient = useQueryClient();

  const { isPending: isLoading, mutate: deleteUser } = useMutation({
    mutationFn: (id) => apiDeleteQuestion(id),
    onSuccess: (res) => {
      if (res && res.statusCode === 200) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, deleteUser };
}
