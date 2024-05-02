"use client";
import Logo from "@/assets/logo.svg";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import { DateFormatter } from "react-day-picker";

export default function Home() {
  const [name, setName] = useState("");
  const [days, setDays] = useState<Date[] | undefined>([]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    console.log(name);
  };

  const formatCaption: DateFormatter = (month, options) => {
    return <>{format(month, "LLLL", { locale: options?.locale })}</>;
  };

  return (
    <main className="flex w-full h-full flex-col items-center justify-center px-10 py-12">
      <i className="flex justify-center items-center w-full py-8">
        <Logo />
      </i>
      <div className="flex flex-col gap-4 w-full items-center">
        <input
          value={name}
          onChange={handleNameChange}
          type="text"
          placeholder="미팅 이름을 지어주세요."
          className="w-full px-4 py-2 border-2 border-[#DADADA] rounded-xl placeholder:text-xs text-sm text-center focus:border-[#00B2FF] focus:outline-none"
        />
        <div className="relative w-screen mobile:w-full mt-10 justify-center items-center">
          <Calendar
            mode="multiple"
            selected={days}
            onSelect={setDays}
            locale={ko}
            formatters={{ formatCaption }}
            className={`rounded-xl border-2 ${
              days && days.length > 0 ? "border-[#00B2FF]" : "border-[#DADADA]"
            }`}
          />
        </div>
      </div>

      <div>s</div>
    </main>
  );
}
