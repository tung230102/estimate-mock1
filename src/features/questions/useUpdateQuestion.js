import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiUpdateQuestion } from "../../api";

export function useUpdateQuestion() {
  const queryClient = useQueryClient();

  const { mutate: updateQuestion, isPending: isLoading } = useMutation({
    mutationFn: ({ id, data }) => apiUpdateQuestion(id, data),
    onSuccess: (res) => {
      if (res && res.statusCode === 200) {
        toast.success(res.message);
      } else if (res && res.status === 400) {
        let errors = res.data.message;
        if (errors && typeof errors !== "string") {
          toast.error(errors[0]);
        } else if (errors) {
          toast.error(errors);
        }
      }
      queryClient.invalidateQueries({ queryKey: ["questions"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, updateQuestion };
}
