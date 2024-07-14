// "use client";
// import { useState, useEffect } from "react";
import { supabase } from "@/apis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Data {
  title: string;
  created_at: string;
  days: string[];
  startTime: string;
  endTime: string;
  pageId: string;
}

// const testId = "506f47d7-cb0e-4d9b-931d-63fbebcd5533";

async function getData(pageId: string): Promise<Data | null> {
  const { data, error } = await supabase
    .from("pages")
    .select("*")
    .eq("pageId", pageId)
    .single();

  if (error) {
    console.log("Failed to fetch data");
  }

  return data;
}

export default async function Page({ params }: { params: { pageId: string } }) {
  const data = await getData(params.pageId);
  console.log(data);

  return (
    <main className="h-full flex flex-col">
      <Tabs defaultValue="account" className="w-full h-full p-0">
        <TabsList className="flex mt-6 w-screen px-0 py-0 bg-transparent">
          <div className="w-full h-full flex relative">
            <TabsTrigger
              value="account"
              className="absolute left-0 w-[50.8%] m-0 py-2.5 text-gray-200 data-[state=active]:text-blue data-[state=active]:z-20 rounded-t-xl shadow-[0_-1.5px_3px_0px_rgba(0,0,0,0.05)] data-[state=active]:shadow-[3px_-4px_6px_-1px_rgba(0,0,0,0.15)]"
            >
              <h1 className="">미팅 전체보기</h1>
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="absolute right-0 w-[50.8%] m-0 py-2.5 text-gray-200 data-[state=active]:text-blue data-[state=active]:z-20 rounded-t-xl shadow-[0_-1.5px_3px_0px_rgba(0,0,0,0.05)] data-[state=active]:shadow-[-3px_-4px_6px_-1px_rgba(0,0,0,0.15)]"
            >
              <h1 className="">겹치는 시간 확인</h1>
            </TabsTrigger>
          </div>
        </TabsList>
        <TabsContent value="account">
          <h1>{data?.title}</h1>
        </TabsContent>
        <TabsContent value="password">
          <h1>{data?.title}</h1>
        </TabsContent>
      </Tabs>

      <h1>{data?.days}</h1>
    </main>
  );
}