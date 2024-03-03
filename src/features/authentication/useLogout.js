import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiLogout } from "../../services/apiAuth";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const access_token = localStorage.getItem("access_token");
  const refresh_token = localStorage.getItem("refresh_token");

  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: () => apiLogout(refresh_token),
    onSuccess: () => {
      queryClient.removeQueries();
      localStorage.removeItem("access_token", access_token);
      localStorage.removeItem("refresh_token", refresh_token);
      navigate("/login", { replace: true });
      toast.success("You have been logged out");
    },
  });

  return { logout, isLoading };
}
