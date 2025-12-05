import React from "react";
import { Link } from "react-router-dom";
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

export default function CalendarModal({ events, close }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-gray-900 p-8 rounded-xl border border-gray-800 w-full max-w-2xl overflow-y-auto max-h-[90vh]"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Events on This Day</h2>
          <button onClick={close} className="text-gray-400 hover:text-white text-2xl">
            ✕
          </button>
        </div>

        {/* Events List */}
        {events.map((event) => (
          <div key={event.id} className="mb-10">

            {/* Banner */}
            <img
              src={event.banner_url}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />

            {/* Category */}
            <span
              className={`px-3 py-1 rounded-lg text-sm uppercase tracking-wide ${CATEGORY_COLORS[event.category]}`}
            >
              {event.category}
            </span>

            {/* Title */}
            <h3 className="text-2xl font-bold mt-3">{event.title}</h3>

            {/* Time Info */}
            <p className="text-gray-400 mt-2">
              <strong className="text-gray-300">Meetup:</strong> {event.meetup_time}
              {" • "}
              <strong className="text-gray-300">Departure:</strong> {event.departure_time}
            </p>

            {/* Description */}
            <p className="text-gray-300 mt-4 whitespace-pre-line">
              {event.description}
            </p>

            {/* View event */}
            <Link
              to={`/event/${event.id}`}
              className="inline-block mt-5 px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition"
            >
              View Event Page
            </Link>

            <hr className="border-gray-800 mt-10" />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
