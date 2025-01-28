"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

export interface SelectedMonthType { month: string; year: number }

interface MonthContextType {
  selectedMonth: SelectedMonthType;
  setSelectedMonth: (month: SelectedMonthType) => void;
}

const MonthContext = createContext<MonthContextType>({
  selectedMonth: {month: "", year: 0},
  setSelectedMonth: () => {},
});

export const months = [
  ["Jan", "Feb", "Mar"],
  ["Apr", "May", "Jun"],
  ["Jul", "Aug", "Sep"],
  ["Oct", "Nov", "Dec"],
];

export const yearNow = new Date().getFullYear();

export const getCurrentMonth = () => {
  const monthNames = months.flat(); 
  return monthNames[new Date().getMonth()];
};

export function MonthProvider({ children }: { children: ReactNode }) {

  const [selectedMonth, setSelectedMonth] = useState<SelectedMonthType>({month: getCurrentMonth(), year: yearNow});

  return (
    <MonthContext.Provider value={{ selectedMonth, setSelectedMonth }}>
      {children}
    </MonthContext.Provider>
  );
}

export function useMonthContext() {
  return useContext(MonthContext);
}