import { useMutation } from "@tanstack/react-query";
import { apiRefreshToken } from "../../services/apiAuth";

export default function useRefreshToken() {
  const refresh_token = localStorage.getItem("refresh_token");

  const { mutate: refreshToken, isPending: isLoading } = useMutation({
    mutationFn: () => apiRefreshToken(refresh_token),
    onSuccess: (res) => {
      localStorage.setItem("access_token", res.data.newTokens.access_token);
      localStorage.setItem("refresh_token", res.data.newTokens.refresh_token);
    },
  });

  return { refreshToken, isLoading };
}
