import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiGetQuestionsPlay } from "../../services/apiQuestion";

export function useQuestionsPlay() {
  const access_token = localStorage.getItem("access_token");

  const {
    mutate: createPlay,
    isPending: isLoading,
    data,
  } = useMutation({
    mutationFn: (total) => apiGetQuestionsPlay(access_token, total),

    onError: (err) => toast.error(err.message),
  });

  return { isLoading, createPlay, data };
}
