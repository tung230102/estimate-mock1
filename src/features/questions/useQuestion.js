import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiGetQuestionById } from "../../services/apiQuestion";

export function useQuestion() {
  const access_token = localStorage.getItem("access_token");
  const { questionId } = useParams();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["question"],
    queryFn: () => apiGetQuestionById(access_token, questionId),
    enabled: !!access_token,
  });

  return { isLoading, data, refetch };
}
