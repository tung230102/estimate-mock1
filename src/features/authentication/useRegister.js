import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiRegister } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

function useRegister() {
  const navigate = useNavigate();
  const {
    mutate: register,
    isPending: isLoading,
    data,
  } = useMutation({
    mutationFn: ({ email, name, password }) =>
      apiRegister(email, name, password),
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
