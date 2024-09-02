import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/apis";
import type { SelectedDay } from "@/types";

interface Data {
  pageId: string;
  selectedDays: SelectedDay[];
  nickname: string;
  password: string;
}
const usePostSelectedDays = () => {
  const postSelectedDays = async ({
    pageId,
    selectedDays,
    nickname,
    password,
  }: Data) => {
    const uniqueId = `${pageId}-${nickname}-${password}`; // 고유 식별자 생성
    const { error } = await supabase
      .from("user_selection")
      .upsert(
        { pageId, selectedDays, nickname, password, uniqueId },
        { onConflict: "uniqueId" }
      );

    if (error) {
      console.log(error);
      throw new Error("Failed to post data");
    }
  };

  return useMutation({
    mutationFn: postSelectedDays,
  });
};

export default usePostSelectedDays;
