import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiDeleteAnswer } from "../../api";

export function useDeleteAnswer() {
  const queryClient = useQueryClient();
  const { isPending: isLoading, mutate: deleteAnswer } = useMutation({
    mutationFn: (id) => apiDeleteAnswer(id),
    onSuccess: (res) => {
      if (res && res.statusCode === 200) {
        toast.success(res.message);
      } else {
        toast.error(res.data.message);
      }
      queryClient.invalidateQueries({
        queryKey: ["answers"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, deleteAnswer };
}
