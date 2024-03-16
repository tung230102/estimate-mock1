import { useQuery } from "@tanstack/react-query";
import { apiGetQuestions } from "../../api";

export function useQuestions(page, keyWord, size, order, sortField) {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["questions", page, keyWord],
    queryFn: () => apiGetQuestions(page, size, order, keyWord, sortField),
  });

  return { isLoading, data, refetch };
}
