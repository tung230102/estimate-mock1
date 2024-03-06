import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiCreateAnswer } from "../../services/apiAnswer";

export function useCreateAnswer() {
  const access_token = localStorage.getItem("access_token");
  const queryClient = useQueryClient();

  const { mutate: createAnswer, isPending: isLoading } = useMutation({
    mutationFn: (data) => apiCreateAnswer(access_token, data),
    onSuccess: (res) => {
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
      queryClient.invalidateQueries({ queryKey: ["answers"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, createAnswer };
}
