import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiChangePassword } from "../../api";

function useChangePassword() {
  const {
    mutate: changePassword,
    isPending: isLoading,
    data,
  } = useMutation({
    mutationFn: (data) => apiChangePassword(data),
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
    },
  });

  return { changePassword, isLoading, data };
}

export default useChangePassword;
