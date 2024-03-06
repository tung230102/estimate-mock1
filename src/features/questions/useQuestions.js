import { useQuery } from "@tanstack/react-query";
import { apiGetQuestions } from "../../services/apiQuestion";

export function useQuestions(page, keyWord, size, order, sortField) {
  const access_token = localStorage.getItem("access_token");

  const { isLoading, data, refetch } = useQuery({
    queryKey: ["questions", page, keyWord],
    queryFn: () =>
      apiGetQuestions(access_token, page, size, order, keyWord, sortField),
    enabled: !!access_token,
  });

  return { isLoading, data, refetch };
}
