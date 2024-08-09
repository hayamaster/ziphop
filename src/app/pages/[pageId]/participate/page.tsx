"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { groupDaysByMonth } from "@/utils";
import { Fragment } from "react";
import { Arrow } from "@/assets";

interface Data {
  title: string;
  dates: { [key: string]: number[] };
  days: string[];
  startTime: string;
  endTime: string;
}

export default function Page() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<Data>();

  useEffect(() => {
    const obj: Data = {
      title: "",
      dates: {},
      days: [],
      startTime: "",
      endTime: "",
    };

    for (const [key, value] of searchParams.entries()) {
      if (key === "days") {
        obj[key].push(value);
      } else {
        (obj as any)[key] = value;
      }
    }

    obj.dates = groupDaysByMonth(obj.days || []);

    setData(obj);
  }, [searchParams]);

  return (
    <div className="w-full h-full flex flex-col">
      <Arrow className="w-8 h-8 my-6" />
      <div className="pt-10 pb-4">
        <h1 className="text-xl text-blue font-semibold">{data?.title}</h1>
        <p className="text-xl text-[#979797] font-semibold">
          가능한 시간을 선택해주세요.
        </p>
      </div>
      <Carousel className="w-full h-full max-w-xs relative mt-4">
        <CarouselPrevious className="absolute top-4 left-1/5 z-50" />
        <CarouselNext className="absolute top-4 right-0 z-50" />
        <CarouselContent key={`${data?.endTime} + '10'`}>
          {data &&
            Object.entries(data.dates).map(([month, value], index) => {
              value = value.sort((a, b) => a - b);

              return value.length > 5 ? (
                <Fragment key={index}>
                  {data?.startTime &&
                    data?.endTime &&
                    Array.from(
                      { length: Math.ceil(value.length / 5) },
                      (_, i) => (
                        <CarouselItem key={`${index}-${i}`}>
                          <div className="flex flex-col w-full h-full justify-center items-center">
                            <span className="text-base font-medium p-0.5 text-[#979797]">
                              {`${month} 월`}
                            </span>
                            <table className="w-full border-separate border-spacing-0 table-fixed border border-blue mt-3 rounded-lg pr-3 py-3">
                              <thead className="block">
                                <tr className="flex justify-center items-center">
                                  <th className="py-2 w-12 text-[#979797] font-normal text-sm">
                                    Time
                                  </th>
                                  {value
                                    .slice(i * 5, i * 5 + 5)
                                    .map((date, index) => (
                                      <th
                                        key={index}
                                        className="py-2 w-12 text-[#979797] font-normal text-sm"
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
                                      {value
                                        .slice(i * 5, i * 5 + 5)
                                        .map((_, dateIndex) => (
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
                    )}
                </Fragment>
              ) : (
                data?.startTime && data?.endTime && (
                  <CarouselItem key={index}>
                    <div className="flex flex-col w-full h-full justify-center items-center">
                      <span className="text-base font-medium p-0.5 text-[#979797]">
                        {`${month} 월`}
                      </span>
                      <table className="w-full border-separate border-spacing-0 table-fixed border border-blue overflow-y-scroll mt-3 rounded-lg pr-3 py-3">
                        <thead className="block">
                          <tr className="flex justify-center items-center">
                            <th className="py-2 w-12 text-[#979797] font-normal text-sm">
                              Time
                            </th>
                            {value.map((date, index) => (
                              <th
                                key={index}
                                className="py-2 w-12 text-[#979797] font-normal text-sm"
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
  );
}
