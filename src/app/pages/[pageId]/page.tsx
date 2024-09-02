import { supabase } from "@/apis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { groupDays } from "@/utils";
import { ShareButton, TotalEvent } from "@/components";
import type { MainEventData } from "@/types";

// const testId = "506f47d7-cb0e-4d9b-931d-63fbebcd5533";

async function getData(pageId: string): Promise<MainEventData | null> {
  const { data, error } = await supabase
    .from("pages")
    .select(`*, user_selection(nickname, uniqueId, selectedDays)`)
    .eq("pageId", pageId)
    .single();

  if (error) {
    console.log("Failed to fetch data");
  } else {
    data.userSelections = data.user_selection;
    delete data.user_selection;
  }

  return data;
}

export default async function Page({ params }: { params: { pageId: string } }) {
  const data = await getData(params.pageId);
  const years = groupDays(data?.days || []);

  console.log(data);

  return (
    <main className="h-dvh flex flex-col">
      <Tabs defaultValue="account" className="w-full p-0">
        <TabsList className="flex mt-6 w-screen px-0 py-0 bg-transparent">
          <div className="w-full h-full flex relative">
            <TabsTrigger
              value="account"
              className="absolute left-0 w-[50.8%] m-0 py-2.5 text-gray-200 rounded-t-xl shadow-[0_-1.5px_3px_0px_rgba(0,0,0,0.05)] data-[state=active]:text-blue data-[state=active]:z-20 data-[state=active]:shadow-[3px_-4px_6px_-1px_rgba(0,0,0,0.15)]"
            >
              <h1 className="text-base">미팅 전체보기</h1>
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="absolute right-0 w-[50.8%] m-0 py-2.5 text-gray-200 rounded-t-xl shadow-[0_-1.5px_3px_0px_rgba(0,0,0,0.05)] data-[state=active]:text-blue data-[state=active]:z-20 data-[state=active]:shadow-[-3px_-4px_6px_-1px_rgba(0,0,0,0.15)]"
            >
              <h1 className="text-base">겹치는 시간 확인</h1>
            </TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="account" className="w-screen px-10 py-5 mt-5">
          {data && <TotalEvent data={data} years={years} />}
        </TabsContent>
        <TabsContent value="password" className="w-full h-full px-10 py-10">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-full flex justify-between items-center px-4">
              <h1 className="text-xl text-blue font-semibold">{data?.title}</h1>
              <ShareButton />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
