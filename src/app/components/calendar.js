"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 1));
    const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);

    const month = currentDate.toLocaleString("default", { month: "long" });
    const year = currentDate.getFullYear();

    const generateDays = () => {
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

        const days = [];
        for (let i = 0; i < adjustedFirstDay; i++) days.push(null);
        for (let i = 1; i <= daysInMonth; i++) days.push(i);
        return days;
    };

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const toggleMonthDropdown = () => {
        setIsMonthDropdownOpen(!isMonthDropdownOpen);
    };

    const selectMonth = (monthIndex) => {
        setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
        setIsMonthDropdownOpen(false);
    };

    const days = generateDays();
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];

    return (
        <div className="w-full max-w-screen-sm mx-auto px-4 py-3">
            <h1 className="text-2xl font-bold mb-1">Choose a date</h1>

            {/* Progress bar */}
            <div className="w-full h-1 bg-gray-200 mb-6">
                <div className="h-full bg-teal-500 w-1/4"></div>
            </div>

            {/* Month navigation */}
            <div className="flex items-center justify-between mb-5">
                <button
                    onClick={goToPreviousMonth}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
                    aria-label="Previous Month"
                >
                    <ChevronLeft size={20} />
                </button>

                <div className="relative">
                    <button
                        onClick={toggleMonthDropdown}
                        className="flex items-center text-lg font-medium text-teal-500"
                        aria-haspopup="listbox"
                        aria-expanded={isMonthDropdownOpen}
                    >
                        {month} {year}
                        <ChevronDown size={20} className="ml-1" />
                    </button>

                    {isMonthDropdownOpen && (
                        <div className="absolute top-full mt-1 w-40 bg-white shadow-lg rounded-md border border-gray-200 z-10 max-h-48 overflow-y-auto">
                            {months.map((monthName, index) => (
                                <button
                                    key={monthName}
                                    onClick={() => selectMonth(index)}
                                    className="block w-full text-left px-3 py-1 text-sm hover:bg-gray-100"
                                >
                                    {monthName} {year}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button
                    onClick={goToNextMonth}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100"
                    aria-label="Next Month"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-2 text-sm">
                {weekdays.map((day) => (
                    <div key={day} className="text-center text-gray-500 font-medium">
                        {day}
                    </div>
                ))}

                {days.map((day, index) => (
                    <div
                        key={index}
                        className={`text-center py-1 ${day ? "cursor-pointer hover:bg-gray-100 rounded-full" : ""}`}
                    >
                        {day && <span className="text-gray-700">{day}</span>}
                    </div>
                ))}
            </div>
        </div>
    );
}
