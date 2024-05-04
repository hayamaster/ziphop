"use client";
import Logo from "@/assets/logo.svg";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { DateFormatter } from "react-day-picker";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContents } from "@/components";

export default function Home() {
  const [name, setName] = useState("");
  const [days, setDays] = useState<Date[] | undefined>([]);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    console.log(name);
    console.log(startTime);
  };

  const formatCaption: DateFormatter = (month, options) => {
    return <>{format(month, "LLLL", { locale: options?.locale })}</>;
  };

  return (
    <main className="flex w-full h-dvh flex-col items-center justify-center px-10 py-12 gap-6">
      <i className="flex justify-center items-center w-full py-8">
        <Logo />
      </i>
      <div className="flex flex-col gap-6 w-full items-center">
        <input
          value={name}
          onChange={handleNameChange}
          type="text"
          placeholder="미팅 이름을 지어주세요."
          className="w-full px-4 py-2 border-2 border-gray rounded-xl placeholder:text-xs text-sm text-center focus:border-blue focus:outline-none"
        />
        <div className="relative w-screen mobile:w-full mt-10 justify-center items-center">
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
          className={`w-full flex justify-center items-center gap-2 border-2 py-3 rounded-xl ${
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
          <p className="mr-4">시 부터</p>
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

      <div>s</div>
    </main>
  );
}
