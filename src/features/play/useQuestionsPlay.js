import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { apiGetQuestionsPlay } from "../../api";

export function useQuestionsPlay() {
  const {
    mutate: createPlay,
    isPending: isLoading,
    data,
  } = useMutation({
    mutationFn: (total) => apiGetQuestionsPlay(total),

    onError: (err) => toast.error(err.message),
  });

  return { isLoading, createPlay, data };
}
