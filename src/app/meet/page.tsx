"use client";
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/apis";

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const fetchData = useCallback(async () => {
    const { data, error } = await supabase.from("pages").select("*");

    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setData(data);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <main>
      <div>Page</div>
      <div>siv</div>
    </main>
  );
}
