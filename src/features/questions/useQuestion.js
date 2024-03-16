import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { apiGetQuestionById } from "../../api";

export function useQuestion() {
  const { id } = useParams();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["question"],
    queryFn: () => apiGetQuestionById(id),
  });

  return { isLoading, data, refetch };
}
