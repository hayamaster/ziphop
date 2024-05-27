// "use client";
// import { useState, useEffect } from "react";
import { supabase } from "@/apis";

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

  return (
    <main>
      <h1>{data?.title}</h1>

      <div>Page</div>
      <div>siv</div>
    </main>
  );
}
