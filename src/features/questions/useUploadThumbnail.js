import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiUploadThumbnail } from "../../services/apiQuestion";

export function useUploadThumbnail() {
  const access_token = localStorage.getItem("access_token");

  const { mutate: changeThumbnail, isPending: isLoading } = useMutation({
    mutationFn: (formData) => apiUploadThumbnail(access_token, formData),
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
    onError: (err) => toast.error(err.message),
  });

  return { changeThumbnail, isLoading };
}
