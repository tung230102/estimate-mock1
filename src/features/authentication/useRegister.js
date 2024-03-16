import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiRegister } from "../../api";
import { useNavigate } from "react-router-dom";

function useRegister() {
  const navigate = useNavigate();
  const {
    mutate: register,
    isPending: isLoading,
    data,
  } = useMutation({
    mutationFn: (data) => apiRegister(data),
    onSuccess: (res) => {
      if (res && res.statusCode === 201) {
        navigate("/login");
        toast.success(res.message);
      } else if (res && res.status === 400) {
        const errors = res.data.message;
        toast.error(errors);
      }
    },
  });

  return {
    register,
    isLoading,
    data,
  };
}

export default useRegister;
