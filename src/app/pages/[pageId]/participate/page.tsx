"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { groupDays } from "@/utils";
import { Fragment } from "react";
import { Arrow } from "@/assets";

interface Data {
  title: string;
  dates: { [key: number]: { [key: string]: number[] } };
  days: string[];
  startTime: string;
  endTime: string;
}

interface SelectedBlock {
  date: string;
  hour: number;
}

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<Data>();
  const [selectedBlocks, setSelectedBlocks] = useState<SelectedBlock[]>([]);
  const [isDragging, setIsDragging] = useState(false);

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

    obj.dates = groupDays(obj.days || []);

    setData(obj);
  }, [searchParams]);

  const handleClickBack = () => {
    router.back();
  };

  const handleMouseDown = (date: string, hour: number) => {
    setIsDragging(true);
    handleBlockSelection(date, hour);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseEnter = (date: string, hour: number) => {
    if (isDragging) {
      handleBlockSelection(date, hour);
    }
  };

  const handleBlockSelection = (date: string, hour: number) => {
    setSelectedBlocks((prev) => {
      return isBlockSelected(date, hour)
        ? prev.filter((block) => block.date !== date || block.hour !== hour)
        : [...prev, { date, hour }];
    });
  };

  const isBlockSelected = (date: string, hour: number) => {
    return selectedBlocks.some(
      (block) => block.date === date && block.hour === hour
    );
  };

  const handleSaveTime = () => {
    console.log(selectedBlocks);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <Arrow
        className="w-6 h-6 mt-4 mb-3 shrink-0 mobile:w-8 mobile:h-8 mobile:mt-6 mobile:mb-5"
        onClick={handleClickBack}
      />
      <header className="py-4">
        <h1 className="text-lg text-blue font-semibold mobile:text-xl">
          {data?.title}
        </h1>
        <p className="text-lg text-[#979797] font-semibold mobile:text-xl">
          가능한 시간을 선택해주세요.
        </p>
      </header>
      <div className="flex flex-col h-full w-full overflow-y-scroll gap-3">
        <Carousel className="w-full h-full relative mt-4">
          <CarouselPrevious className="absolute top-4 left-1/5 z-50" />
          <CarouselNext className="absolute top-4 right-0 z-50" />
          <CarouselContent key={`${data?.endTime} + '10'`}>
            {data &&
              Object.entries(data.dates).map(([year, months], idx1) => {
                return Object.entries(months).map(([month, value], idx2) => {
                  value = value.sort((a, b) => a - b);

                  return value.length > 5 ? (
                    <Fragment key={idx2 + idx1 + 1}>
                      {data?.startTime &&
                        data?.endTime &&
                        Array.from(
                          { length: Math.ceil(value.length / 5) },
                          (_, i) => (
                            <CarouselItem key={`${idx2}-${i}`}>
                              <div className="flex flex-col w-full h-full justify-center items-center">
                                <span className="text-sm font-medium p-0.5 text-[#979797] mobile:text-base">
                                  {`${year}년 ${month}월`}
                                </span>
                                <table className="w-full h-full border-separate border-spacing-0 table-fixed border border-blue mt-3 rounded-lg pr-3 py-3">
                                  <thead className="block">
                                    <tr className="flex justify-center items-center">
                                      <th className="py-2 w-12 text-xs text-[#979797] font-normal mobile:text-sm">
                                        Time
                                      </th>
                                      {value
                                        .slice(i * 5, i * 5 + 5)
                                        .map((date, index) => (
                                          <th
                                            key={index}
                                            className="py-2 w-12 text-xs text-[#979797] font-normal mobile:text-sm"
                                          >
                                            {`${date}일`}
                                          </th>
                                        ))}
                                    </tr>
                                  </thead>
                                  <tbody
                                    className="block max-h-80 w-full overflow-y-scroll mobile:max-h-96"
                                    onMouseUp={handleMouseUp}
                                  >
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
                                          <td className="py-2 w-12 text-center text-xs text-[#979797] font-base mobile:text-sm">
                                            {parseInt(data.startTime) +
                                              hourIndex}
                                          </td>
                                          {value
                                            .slice(i * 5, i * 5 + 5)
                                            .map((date, dateIndex) => (
                                              <td
                                                key={dateIndex}
                                                className="p-0"
                                                onMouseDown={() =>
                                                  handleMouseDown(
                                                    `${year}-${month}-${date}`,
                                                    parseInt(data.startTime) +
                                                      hourIndex
                                                  )
                                                }
                                                onMouseEnter={() =>
                                                  handleMouseEnter(
                                                    `${year}-${month}-${date}`,
                                                    parseInt(data.startTime) +
                                                      hourIndex
                                                  )
                                                }
                                              >
                                                <div
                                                  className={`flex mx-auto w-12 aspect-[4/3] border border-[#D9D9D9] justify-center items-center ${
                                                    isBlockSelected(
                                                      `${year}-${month}-${date}`,
                                                      parseInt(data.startTime) +
                                                        hourIndex
                                                    )
                                                      ? "bg-blue"
                                                      : "bg-white"
                                                  }`}
                                                />
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
                      <CarouselItem key={idx1}>
                        <div className="flex flex-col w-full h-full justify-center items-center">
                          <span className="text-sm font-medium p-0.5 text-[#979797] mobile:text-base">
                            {`${year}년 ${month}월`}
                          </span>
                          <table className="w-full h-full border-separate border-spacing-0 table-fixed border border-blue mt-3 rounded-lg pr-3 py-3">
                            <thead className="block">
                              <tr className="flex justify-center items-center">
                                <th className="py-2 w-12 text-xs text-[#979797] font-normal mobile:text-sm">
                                  Time
                                </th>
                                {value.map((date, index) => (
                                  <th
                                    key={index}
                                    className="py-2 w-12 text-xs text-[#979797] font-normal mobile:text-sm"
                                  >
                                    {`${date}일`}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody
                              className="block max-h-80 w-full overflow-y-scroll mobile:max-h-96"
                              onMouseUp={handleMouseUp}
                            >
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
                                    <td className="py-2 w-12 text-center text-xs text-[#979797] font-base mobile:text-sm">
                                      {parseInt(data.startTime) + hourIndex}
                                    </td>
                                    {value.map((date, dateIndex) => (
                                      <td
                                        key={dateIndex}
                                        className="p-0"
                                        onMouseDown={() =>
                                          handleMouseDown(
                                            `${year}-${month}-${date}`,
                                            parseInt(data.startTime) + hourIndex
                                          )
                                        }
                                        onMouseEnter={() =>
                                          handleMouseEnter(
                                            `${year}-${month}-${date}`,
                                            parseInt(data.startTime) + hourIndex
                                          )
                                        }
                                      >
                                        <div
                                          className={`flex mx-auto w-12 aspect-[4/3] border border-[#D9D9D9] justify-center items-center ${
                                            isBlockSelected(
                                              `${year}-${month}-${date}`,
                                              parseInt(data.startTime) +
                                                hourIndex
                                            )
                                              ? "bg-blue"
                                              : "bg-white"
                                          }`}
                                        />
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
                });
              })}
          </CarouselContent>
        </Carousel>
        <button className="w-full px-3 py-1.5 border border-blue rounded-lg bg-white text-blue text-sm">
          겹치는 시간 확인하기
        </button>
        <div className="flex w-full gap-3 py-4 mobile:py-6">
          <button
            className="w-full text-sm px-3 py-2 bg-[#5A5A5A] text-white rounded-lg mobile:text-base"
            onClick={handleClickBack}
          >
            취소
          </button>
          <button
            className="w-full text-sm px-3 py-2 bg-blue text-white rounded-lg mobile:text-base"
            onClick={handleSaveTime}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
