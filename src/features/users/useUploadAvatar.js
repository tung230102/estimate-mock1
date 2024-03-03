import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiUploadAvatar } from "../../services/apiUsers";

function useUploadAvatar() {
  const access_token = localStorage.getItem("access_token");

  const { mutate: changeAvatar, isPending: isLoading } = useMutation({
    mutationFn: (formData) => apiUploadAvatar(access_token, formData),
    onSuccess: (res) => {
      if (res && res.statusCode === 200) {
        toast.success(res.message);
      } else if (res && res.status === 400) {
        let errors = res.data.message;
        if (errors) {
          toast.error(errors);
        }
      }
    },
  });

  return { changeAvatar, isLoading };
}

export default useUploadAvatar;
