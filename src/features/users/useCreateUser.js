import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiCreateUser } from "../../services/apiUsers";
import { toast } from "react-toastify";

export function useCreateUser() {
  const access_token = localStorage.getItem("access_token");
  const queryClient = useQueryClient();

  const {
    mutate: createUser,
    isPending: isLoading,
    data,
  } = useMutation({
    mutationFn: (data) => apiCreateUser(access_token, data),
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
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, createUser, data };
}