// "use client";
// import { useState, useEffect } from "react";
import { supabase } from "@/apis";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShareIcon } from "@/assets";
import { groupDaysByMonth } from "@/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
  const dates = groupDaysByMonth(data?.days || []);
  console.log(dates);

  return (
    <main className="h-full flex flex-col">
      <Tabs
        defaultValue="account"
        className="w-full h-dvh p-0 overflow-y-scroll"
      >
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
        <TabsContent value="account" className="w-screen px-10 py-10">
          <div className="w-full flex flex-col justify-center items-center gap-4">
            <div className="w-full flex justify-between items-center px-3">
              <h1 className="text-xl text-blue font-semibold">{data?.title}</h1>
              <ShareIcon className="w-6 h-6" />
            </div>
            <Carousel className="w-full h-full max-w-xs relative mt-10">
              <CarouselPrevious className="absolute top-4 left-1/5 z-50" />
              <CarouselNext className="absolute top-4 right-0 z-50" />
              <CarouselContent>
                {Object.entries(dates).map(([month, value], index) => {
                  value = value.sort((a, b) => a - b);

                  return value.length > 5 ? (
                    <>
                      {data?.startTime &&
                        data?.endTime &&
                        Array.from(
                          { length: Math.ceil(value.length / 5) },
                          (_, i) => (
                            <CarouselItem key={i}>
                              <div className="flex flex-col w-full h-full justify-center items-center">
                                <span className="text-lg font-medium p-0.5 text-[#979797]">
                                  {`${month} 월`}
                                </span>
                                <table className="w-full border-separate border-spacing-0 table-fixed border border-blue mt-6 rounded-lg pr-3 py-3">
                                  <thead className="block">
                                    <tr className="flex justify-center items-center">
                                      <th className="py-2 w-12 text-[#979797] font-medium text-sm">
                                        Hour
                                      </th>
                                      {value
                                        .slice(i * 5, i * 5 + 5)
                                        .map((date, index) => (
                                          <th
                                            key={index}
                                            className="py-2 w-12 text-[#979797] font-medium text-sm"
                                          >
                                            {`${date}일`}
                                          </th>
                                        ))}
                                    </tr>
                                  </thead>
                                  <tbody className="block max-h-96 w-full overflow-y-scroll">
                                    {Array.from(
                                      {
                                        length:
                                          parseInt(data.endTime) -
                                          parseInt(data.startTime) +
                                          1,
                                      },
                                      (_, hourIndex) => (
                                        <tr
                                          key={hourIndex}
                                          className="border-collapse w-full flex justify-center items-center"
                                        >
                                          <td className="py-2 w-12 text-center text-[#979797] font-base text-sm">
                                            {parseInt(data.startTime) +
                                              hourIndex}
                                          </td>
                                          {value
                                            .slice(i * 5, i * 5 + 5)
                                            .map((_, dateIndex) => (
                                              <td
                                                key={dateIndex}
                                                className="p-0"
                                              >
                                                <div className="flex mx-auto w-12 aspect-[4/3] border border-[#D9D9D9] justify-center items-center" />
                                              </td>
                                            ))}
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </div>
                            </CarouselItem>
                          )
                        )}
                    </>
                  ) : (
                    data?.startTime && data?.endTime && (
                      <CarouselItem>
                        <div className="flex flex-col w-full h-full justify-center items-center">
                          <span className="text-lg font-medium p-0.5 text-[#979797]">
                            {`${month} 월`}
                          </span>
                          <table className="w-full border-separate border-spacing-0 table-fixed border border-blue overflow-y-scroll mt-6 rounded-lg pr-3 py-3">
                            <thead className="block">
                              <tr className="flex justify-center items-center">
                                <th className="py-2 w-12 text-[#979797] font-medium text-sm">
                                  Hour
                                </th>
                                {value.map((date, index) => (
                                  <th
                                    key={index}
                                    className="py-2 w-12 text-[#979797] font-medium text-sm"
                                  >
                                    {`${date}일`}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="block max-h-96 w-full overflow-y-scroll">
                              {Array.from(
                                {
                                  length:
                                    parseInt(data.endTime) -
                                    parseInt(data.startTime) +
                                    1,
                                },
                                (_, hourIndex) => (
                                  <tr
                                    key={hourIndex}
                                    className="border-collapse w-full flex justify-center items-center"
                                  >
                                    <td className="py-2 w-12 text-center text-[#979797] font-base text-sm">
                                      {parseInt(data.startTime) + hourIndex}
                                    </td>
                                    {value.map((_, dateIndex) => (
                                      <td key={dateIndex} className="p-0">
                                        <div className="flex mx-auto w-12 aspect-[4/3] border border-[#D9D9D9] justify-center items-center" />
                                      </td>
                                    ))}
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </CarouselItem>
                    )
                  );
                })}
              </CarouselContent>
            </Carousel>
          </div>
        </TabsContent>
        <TabsContent value="password" className="w-full h-full px-10 py-10">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <div className="w-full flex justify-between items-center px-4">
              <h1 className="text-xl text-blue font-semibold">{data?.title}</h1>
              <ShareIcon className="w-6 h-6" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
