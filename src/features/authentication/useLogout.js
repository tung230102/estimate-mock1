import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiLogout } from "../../api";
import { authKey } from "../../constants";
import { setDataLocalStorage } from "../../utils";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: (data) => apiLogout(data),
    onSuccess: (res) => {
      queryClient.removeQueries();
      if (res && res?.statusCode === 200) {
        navigate("/login", { replace: true });
        toast.success(res?.message);
        setDataLocalStorage(authKey.tokens, {});
      }
    },
  });

  return { logout, isLoading };
}
