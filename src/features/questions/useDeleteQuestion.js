import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiDeleteQuestion } from "../../services/apiQuestion";

export function useDeleteQuestion() {
  const access_token = localStorage.getItem("access_token");
  const queryClient = useQueryClient();

  const { isPending: isLoading, mutate: deleteUser } = useMutation({
    mutationFn: (id) => apiDeleteQuestion(access_token, id),
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
