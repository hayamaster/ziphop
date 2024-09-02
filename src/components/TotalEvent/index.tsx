import { ShareButton } from "../";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Fragment } from "react";
import type { MainEventData, Years } from "@/types";

interface TotalEventProps {
  data: MainEventData;
  years: Years;
}

const IMSY_PARTICIPANT = ["김주하", "한지섭", "강민재", "하주김", "후후후"];

const TotalEvent = ({ data, years }: TotalEventProps) => {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center gap-4">
        <div className="w-full flex justify-between items-center px-3">
          <h1 className="text-xl text-blue font-semibold">{data?.title}</h1>
          <ShareButton />
        </div>
        <Carousel className="w-full h-full relative mt-4">
          <CarouselPrevious className="absolute top-4 left-1/5 z-50" />
          <CarouselNext className="absolute top-4 right-0 z-50" />
          <CarouselContent>
            {Object.entries(years).map(([year, months], idx1) => {
              return Object.entries(months).map(([month, value], idx2) => {
                value = value.sort((a, b) => a - b);

                return value.length > 5 ? (
                  <Fragment key={idx1 + idx2}>
                    {data?.startTime &&
                      data?.endTime &&
                      Array.from(
                        { length: Math.ceil(value.length / 5) },
                        (_, i) => (
                          <CarouselItem key={i * idx1 + idx2 + i}>
                            <div className="flex flex-col w-full h-full justify-center items-center">
                              <span className="text-base font-medium p-0.5 text-[#979797]">
                                {`${year}년 ${month}월`}
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
                  <CarouselItem key={idx2}>
                    <div className="flex flex-col w-full h-full justify-center items-center">
                      <span className="text-base font-medium p-0.5 text-[#979797]">
                        {`${year}년 ${month}월`}
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
                );
              });
            })}
          </CarouselContent>
        </Carousel>
      </div>
      <footer className="px-2 py-3 w-full flex flex-col gap-2">
        <p className="text-[#979797] font-base text-sm">참여한 사람</p>
        <div className="flex gap-2 w-full overflow-x-scroll whitespace-nowrap">
          {IMSY_PARTICIPANT.map((name, index) => (
            <span
              key={index}
              className="px-3.5 py-0.5 border border-blue text-sm rounded-lg text-blue"
            >
              {name}
            </span>
          ))}
        </div>
        <Link
          href={{
            pathname: `/pages/${data?.pageId}/participate`,
            query: {
              title: data?.title,
              days: data?.days,
              startTime: data?.startTime,
              endTime: data?.endTime,
            },
          }}
        >
          <button className="w-full bg-blue py-2 mt-8 rounded-lg text-white">
            참여하기
          </button>
        </Link>
      </footer>
    </>
  );
};

export default TotalEvent;
