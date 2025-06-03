"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

export default function Calendar({ selectedDate, onChange, interviewDates = [] }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
    const [selectedDayTimes, setSelectedDayTimes] = useState(null);

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
        setSelectedDayTimes(null);
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
        setSelectedDayTimes(null);
    };

    const toggleMonthDropdown = () => {
        setIsMonthDropdownOpen(!isMonthDropdownOpen);
    };

    const selectMonth = (monthIndex) => {
        setCurrentDate(new Date(currentDate.getFullYear(), monthIndex, 1));
        setIsMonthDropdownOpen(false);
        setSelectedDayTimes(null);
    };

    const handleDateClick = (day) => {
        if (!day) return;

        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        date.setHours(0, 0, 0, 0);

        // Find times for this date
        const timesForDate = interviewDates
            .filter(interview => {
                const interviewDate = new Date(interview.date);
                interviewDate.setHours(0, 0, 0, 0);
                return interviewDate.getTime() === date.getTime();
            })
            .map(interview => interview.time);

        if (timesForDate.length > 0) {
            setSelectedDayTimes({
                date,
                times: timesForDate
            });
            onChange(date); // Set the selected date
            console.log(selectedDate)
        }
    };

    const handleTimeSelect = (time) => {
        if (!selectedDayTimes) return;

        // Combine date and time
        const [hours, minutes] = time.split(':').map(Number);
        const dateWithTime = new Date(selectedDayTimes.date);
        dateWithTime.setHours(hours, minutes);

        onChange(dateWithTime);
    };

    const isInterviewDate = (day) => {
        if (!day) return false;

        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        date.setHours(0, 0, 0, 0);

        return interviewDates.some(interview => {
            const interviewDate = new Date(interview.date);
            interviewDate.setHours(0, 0, 0, 0);
            return interviewDate.getTime() === date.getTime();
        });
    };

    const isSelectedDate = (day) => {
        if (!day || !selectedDate) return false;

        const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        date.setHours(0, 0, 0, 0);

        const selDate = new Date(selectedDate);
        selDate.setHours(0, 0, 0, 0);

        return selDate.getTime() === date.getTime();
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
            <div className="grid grid-cols-7 gap-2 text-sm mb-4">
                {weekdays.map((day) => (
                    <div key={day} className="text-center text-gray-500 font-medium">
                        {day}
                    </div>
                ))}

                {days.map((day, index) => (
                    <button
                        key={index}
                        onClick={() => handleDateClick(day)}
                        disabled={!day || !isInterviewDate(day)}
                        className={`text-center py-1 relative
                            ${!day ? "cursor-default" : "cursor-pointer"}
                            ${isSelectedDate(day) ? "bg-teal-500 text-white rounded-full" : ""}
                            ${!isSelectedDate(day) && isInterviewDate(day) ? "border-2 border-teal-500 rounded-full" : ""}
                            ${!isSelectedDate(day) && isInterviewDate(day) ? "hover:bg-teal-50" : ""}
                        `}
                    >
                        {day && (
                            <span className={`${isSelectedDate(day) ? "text-white" : "text-gray-700"}`}>
                                {day}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            {/* Time slots section */}
            {selectedDayTimes && (
                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3">
                        Available times for {selectedDayTimes.date.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedDayTimes.times.map((time, index) => (
                            <button
                                key={index}
                                onClick={() => handleTimeSelect(time)}
                                className={`py-2 px-4 rounded-lg border text-center
                                    ${selectedDate && selectedDate.getHours() === parseInt(time.split(':')[0]) &&
                                        selectedDate.getMinutes() === parseInt(time.split(':')[1])
                                        ? "bg-teal-500 text-white border-teal-600"
                                        : "bg-white border-gray-300 hover:bg-teal-50 hover:border-teal-500"
                                    }
                                `}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}