import { useQuery } from "@tanstack/react-query";
import { apiGetQuestionById } from "../../services/apiQuestion";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

export function useQuestion() {
  const access_token = localStorage.getItem("access_token");
  const { questionId } = useParams();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["question"],
    queryFn: () => apiGetQuestionById(access_token, questionId),
    enabled: !!access_token,
    onSuccess: (res) => {
      console.log("res :>> ", res);
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLoading, data, refetch };
}
