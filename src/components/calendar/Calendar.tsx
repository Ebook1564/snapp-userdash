"use client";
import {
  EventInput,
  EventContentArg,
} from "@fullcalendar/core";


import React from "react";

interface CalendarEvent extends EventInput {
  extendedProps: {
    calendar: string;
  };
}

// Calendar component logic removed for build stability or because it is unused
const MyCalendar: React.FC = () => {
    return <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">Calendar placeholder</div>;
};

const renderEventContent = (_eventInfo: EventContentArg) => {
    return <></>;
};

export default MyCalendar;

