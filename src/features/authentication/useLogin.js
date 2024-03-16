import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiLogin } from "../../api";
import { authKey } from "../../constants";
import { setDataLocalStorage } from "../../utils";

function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending: isLoading,
    data,
  } = useMutation({
    mutationFn: (data) => apiLogin(data),
    onSuccess: (res) => {
      if (res && res.statusCode === 200) {
        toast.success(res.message);

        const metaData = res?.data;
        const dataUserReceived = {
          email: metaData?.user?.email,
          avatarLink: metaData?.user?.avatar_link,
          userName: metaData?.user?.name,
          role: metaData?.user?.roles,
          id: metaData?.user?.id,
        };
        const tokensReceived = {
          accessToken: metaData?.tokens?.access_token?.access_token,
          refreshToken: metaData?.tokens?.refresh_token?.refresh_token,
        };

        setDataLocalStorage(authKey.userData, dataUserReceived);
        setDataLocalStorage(authKey.tokens, tokensReceived);

        queryClient.setQueryData(["users"], res.data.user);

        if (res.data.user.roles.includes("admin")) {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/play", { replace: true });
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
