import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiCreateQuestion } from "../../services/apiQuestion";

export function useCreateQuestion() {
  const access_token = localStorage.getItem("access_token");
  const queryClient = useQueryClient();

  const {
    mutate: createQuestion,
    isPending: isLoading,
    data,
  } = useMutation({
    mutationFn: (data) => apiCreateQuestion(access_token, data),
    onSuccess: (res) => {
      console.log("res :>> ", res);
      if (res && res.statusCode === 201) {
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

  return { isLoading, createQuestion, data };
}
