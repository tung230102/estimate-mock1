import { useMutation } from "@tanstack/react-query";
import { apiChangePassword } from "../../services/apiUsers";
import { toast } from "react-toastify";

function useChangePassword() {
  const access_token = localStorage.getItem("access_token");

  const {
    mutate: changePassword,
    isPending: isLoading,
    data,
  } = useMutation({
    mutationFn: ({ oldPassword, newPassword }) =>
      apiChangePassword(access_token, oldPassword, newPassword),
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
