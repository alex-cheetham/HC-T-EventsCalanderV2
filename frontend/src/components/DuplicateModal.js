import React, { useState } from "react";
import { motion } from "framer-motion";

export default function DuplicateModal({ event, close, onDuplicate }) {
  const [newEvent, setNewEvent] = useState({
    ...event,
    title: `${event.title} (Copy)`
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onDuplicate(newEvent);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50 p-6"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gray-900 p-8 rounded-xl border border-gray-800 w-full max-w-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Duplicate Event</h2>
          <button onClick={close} className="text-gray-400 hover:text-white text-2xl">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold">Event Title</label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
          </div>

          {/* Date */}
          <div>
            <label className="block mb-2 font-semibold">Event Date</label>
            <input
              type="date"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
              value={newEvent.event_date}
              onChange={(e) => setNewEvent({ ...newEvent, event_date: e.target.value })}
            />
          </div>

          {/* Times */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold">Meetup Time</label>
              <input
                type="time"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
                value={newEvent.meetup_time}
                onChange={(e) => setNewEvent({ ...newEvent, meetup_time: e.target.value })}
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Departure Time</label>
              <input
                type="time"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
                value={newEvent.departure_time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, departure_time: e.target.value })
                }
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold">Category</label>
            <input
              type="text"
              disabled
              value={newEvent.category}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 opacity-70"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={newEvent.is_featured}
              onChange={(e) =>
                setNewEvent({ ...newEvent, is_featured: e.target.checked })
              }
            />
            <label className="font-semibold">Mark as Featured</label>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition"
          >
            Create Duplicate
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
