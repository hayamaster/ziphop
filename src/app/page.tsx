"use client";
import Logo from "@/assets/logo.svg";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { DateFormatter } from "react-day-picker";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContents } from "@/components";
import { supabase } from "@/apis";
import { useRouter } from "next/navigation";

interface Data {
  title: string;
  created_at?: string;
  days: string[] | undefined;
  startTime: string;
  endTime: string;
  pageId?: string;
}

async function postData({ title, days, startTime, endTime }: Data) {
  const { data, error } = await supabase
    .from("pages")
    .insert([
      {
        title: title,
        days: days,
        startTime: startTime,
        endTime: endTime,
      },
    ])
    .select();

  if (error) {
    console.log("Failed to post data");
  }

  return data;
}

export default function Home() {
  const [title, setTitle] = useState<string>("");
  const [days, setDays] = useState<Date[] | undefined>([]);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const router = useRouter();

  const isCompleteSetting =
    title &&
    days &&
    days.length > 0 &&
    startTime &&
    endTime &&
    Number(startTime) < Number(endTime);

  const formatCaption: DateFormatter = (month, options) => {
    return <>{format(month, "LLLL", { locale: options?.locale })}</>;
  };

  const handleCreateMeeting = async () => {
    const data = await postData({
      title,
      days: days?.map((day) => day.toISOString()),
      startTime,
      endTime,
    });

    if (data) {
      router.push(`/pages/${data[0].pageId}`);
    }
  };

  return (
    <main className="flex w-full h-full flex-col items-center overflow-y-scroll justify-around">
      <i className="flex justify-center items-center w-full grow-0">
        <Logo />
      </i>
      <div className="flex flex-col gap-6 w-screen items-center xs:w-full">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="미팅 이름을 지어주세요."
          className={`w-full px-4 py-2 border-2 rounded-xl placeholder:text-xs text-sm text-center focus:border-blue focus:outline-none ${
            title ? "text-blue border-blue bg-[#ECF9FF]" : "border-gray"
          }`}
        />
        <div className="relative w-full mt-10 justify-center items-center">
          <Calendar
            mode="multiple"
            selected={days}
            onSelect={setDays}
            locale={ko}
            formatters={{ formatCaption }}
            className={`rounded-xl border-2 ${
              days && days.length > 0 ? "border-blue" : "border-gray"
            }`}
          />
        </div>
        <div
          className={`w-full flex justify-center items-center gap-2 border-2 py-3 rounded-xl text-sm mobile:text-base ${
            startTime && endTime ? "border-blue text-blue" : "border-gray"
          }`}
        >
          <Select onValueChange={(selectedTime) => setStartTime(selectedTime)}>
            <SelectTrigger
              className={`${startTime ? "bg-blue text-white" : "bg-[#F0F0F0]"}`}
            >
              <SelectValue placeholder="start" />
            </SelectTrigger>
            <SelectContents type="start" />
          </Select>
          <p className="mobile:mr-4">시 부터</p>
          <Select onValueChange={(selectedTime) => setEndTime(selectedTime)}>
            <SelectTrigger
              className={`${endTime ? "bg-blue text-white" : "bg-[#F0F0F0]"}`}
            >
              <SelectValue placeholder="end" />
            </SelectTrigger>
            <SelectContents type="end" />
          </Select>
          <p>시</p>
        </div>
      </div>
      <button
        className={`w-full py-3 rounded-xl text-sm mobile:text-base ${
          isCompleteSetting ? "bg-blue text-white" : "bg-[#F0F0F0]"
        }`}
        disabled={!isCompleteSetting}
        onClick={handleCreateMeeting}
      >
        미팅 만들기
      </button>
    </main>
  );
}
