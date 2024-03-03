import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiForgotPass } from "../../services/apiAuth";

export default function useForgotPass() {
  const navigate = useNavigate();

  const { mutate: forgotPassword, isPending: isLoading } = useMutation({
    mutationFn: (email) => apiForgotPass(email),
    onSuccess: (res) => {
      if (res && res.statusCode === 200) {
        toast.success(res.message);
        navigate("/login");
      } else if (res && res.status === 404) {
        const errors = res.data.message;
        toast.error(errors);
      }
    },
  });

  return {
    forgotPassword,
    isLoading,
  };
}
