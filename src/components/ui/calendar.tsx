"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 w-full", className)}
      classNames={{
        months: "flex flex-col",
        month: "space-y-4",
        caption:
          "flex justify-center pb-4 items-center text-[#979797] z-30 absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-full",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        nav_button_previous: "absolute left-5",
        nav_button_next: "absolute right-3",
        table: "w-full border-collapse space-y-1",
        head_row: "flex justify-center gap-1 mobile:gap-2",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-1 gap-1 justify-center mobile:mt-2 mobile:gap-2",
        cell: "h-8 w-8 text-center text-sm p-0 relative text-[#979797] focus-within:relative focus-within:z-20",
        day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100 rounded-full hover:rounded-full hover:bg-[#77d3fb]",
        day_range_end: "day-range-end",
        day_selected: "rounded-full bg-[#00B2FF] text-white",
        day_today: "text-[#00B2FF]",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="h-5 w-5 hover:stroke-[#00B2FF]" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="h-5 w-5 hover:stroke-[#00B2FF]" />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
