// "use client";
// import { useState, useEffect } from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import { supabase } from "@/apis";

interface Data {
  title: string;
  created_at: string;
  days: string[];
  startTime: string;
  endTime: string;
  pageId: string;
}

interface PageProps {
  data: Data | null;
}

const testId = "506f47d7-cb0e-4d9b-931d-63fbebcd5533";

export default function Page({ data }: PageProps) {
  // const [data, setData] = useState<Data>();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { data, error } = await supabase
  //       .from("pages")
  //       .select("*")
  //       .eq("pageId", testId)
  //       .single();

  //     if (error) {
  //       console.error("Error fetching data:", error);
  //     } else {
  //       setData(data);
  //       console.log(data);
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <main>
      <h1>{data?.title}</h1>
      <div>Page</div>
      <div>siv</div>
    </main>
  );
}
