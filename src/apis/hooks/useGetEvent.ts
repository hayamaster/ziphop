import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/apis";

interface Data {
  title: string;
  created_at: string;
  days: string[];
  startTime: string;
  endTime: string;
  pageId: string;
}

const useGetEvent = ({ pageId }: { pageId: string }) => {
  const getEventData = async () => {
    const response = await supabase
      .from("pages")
      .select("*")
      .eq("pageId", pageId)
      .single();

    return response.data;
  };

  return useQuery<Data>({
    queryKey: ["event", pageId],
    queryFn: getEventData,
  });
};

export default useGetEvent;
