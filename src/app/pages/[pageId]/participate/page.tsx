"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface Data {
  title: string;
  days: string[];
  startTime: string;
  endTime: string;
}

export default function Page() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<Data>();

  useEffect(() => {
    const obj: Data = { title: "", days: [], startTime: "", endTime: "" };

    for (const [key, value] of searchParams.entries()) {
      if (key === "days") {
        obj[key].push(value);
      } else {
        (obj as any)[key] = value;
      }
    }

    setData(obj);
  }, [searchParams]);

  return (
    <div>
      <div>dis</div>
      <div>{data?.startTime}</div>
    </div>
  );
}
