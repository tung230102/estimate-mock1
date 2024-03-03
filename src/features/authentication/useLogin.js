import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiLogin } from "../../services/apiAuth";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending: isLoading,
    data,
  } = useMutation({
    mutationFn: ({ email, password }) => apiLogin(email, password),
    onSuccess: (res) => {
      if (res && res.statusCode === 200) {
        toast.success(res.message);
        const access_token = res.data.tokens.access_token.access_token;
        const refresh_token = res.data.tokens.refresh_token.refresh_token;
        queryClient.setQueryData(["users"], res.data.user);
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("refresh_token", refresh_token);
        if (res.data.user.roles.includes("admin")) {
          navigate("/admin", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
      } else if (res && res.status === 400) {
        const errors = res.data.message;
        toast.error(errors);
      }
    },
  });

  return {
    login,
    isLoading,
    data,
  };
}

export default useLogin;
