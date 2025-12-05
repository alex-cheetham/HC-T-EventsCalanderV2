import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import CalendarModal from "../components/CalendarModal";
import { motion } from "framer-motion";

const CATEGORY_COLORS = {
  "HCT Convoy": "bg-blue-500",
  "Official TMP Convoy": "bg-yellow-500",
  "Community Convoy": "bg-green-500",
  "Special Event": "bg-purple-500",
  "Meeting": "bg-orange-500",
  "HCC Community Event": "bg-cyan-500",
  "Charity": "bg-pink-500",
  "Training": "bg-red-500",
  "Miscellaneous": "bg-gray-500"
};

export default function CalendarView() {
  const [events, setEvents] = useState([]);
  const [selectedDateEvents, setSelectedDateEvents] = useState(null);

  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  useEffect(() => {
    api.getEvents().then(setEvents);
  }, []);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstWeekday = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 10 }, (_, i) => today.getFullYear() - 5 + i);

  const handleDayClick = (day) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    const dayEvents = events.filter(e => e.event_date === dateString);

    if (dayEvents.length > 0) {
      setSelectedDateEvents(dayEvents);
    }
  };

  const nextMonth = () => {
    setCurrentMonth(prev => (prev === 11 ? 0 : prev + 1));
    setCurrentYear(prev => (currentMonth === 11 ? prev + 1 : prev));
  };

  const prevMonth = () => {
    setCurrentMonth(prev => (prev === 0 ? 11 : prev - 1));
    setCurrentYear(prev => (currentMonth === 0 ? prev - 1 : prev));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10 pb-20">

      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Event Calendar</h1>
        <p className="text-gray-400">Click a date to view scheduled events.</p>
      </div>

      {/* Month Navigation + Dropdown */}
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

        {/* Left/Right Arrows */}
        <div className="flex gap-4 items-center">
          <button onClick={prevMonth} className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
            ‹
          </button>

          <span className="text-xl font-semibold">
            {monthNames[currentMonth]} {currentYear}
          </span>

          <button onClick={nextMonth} className="px-3 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
            ›
          </button>
        </div>

        {/* Dropdown Month Selector */}
        <div className="flex gap-4">

          <select
            className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2"
            value={currentMonth}
            onChange={(e) => setCurrentMonth(Number(e.target.value))}
          >
            {monthNames.map((m, i) => (
              <option key={i} value={i}>{m}</option>
            ))}
          </select>

          <select
            className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2"
            value={currentYear}
            onChange={(e) => setCurrentYear(Number(e.target.value))}
          >
            {years.map(y => (
              <option key={y}>{y}</option>
            ))}
          </select>

        </div>
      </div>

      {/* Calendar Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-7 gap-3 text-center">

        {/* Weekday Labels */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
          <div key={d} className="text-gray-400 font-semibold pb-2">{d}</div>
        ))}

        {/* Empty starting cells */}
        {Array.from({ length: firstWeekday }).map((_, i) => (
          <div key={`e${i}`} />
        ))}

        {/* Days */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
            day
          ).padStart(2, "0")}`;

          const dayEvents = events.filter(e => e.event_date === dateString);

          return (
            <motion.div
              key={day}
              whileHover={{ scale: dayEvents.length > 0 ? 1.05 : 1 }}
              onClick={() => handleDayClick(day)}
              className={`cursor-pointer border border-gray-800 rounded-lg p-2 h-20 flex flex-col items-center justify-between hover:bg-gray-800 ${
                dayEvents.length === 0 ? "opacity-50" : ""
              }`}
            >
              <span className="text-lg font-semibold">{day}</span>

              {/* Event Dots */}
              <div className="flex gap-1 flex-wrap justify-center">
                {dayEvents.map((e) => (
                  <span
                    key={e.id}
                    className={`w-3 h-3 rounded-full ${CATEGORY_COLORS[e.category]}`}
                  ></span>
                ))}
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* Modal Popup */}
      {selectedDateEvents && (
        <CalendarModal
          events={selectedDateEvents}
          close={() => setSelectedDateEvents(null)}
        />
      )}
    </div>
  );
}
