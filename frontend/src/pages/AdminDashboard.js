import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import DuplicateModal from "../components/DuplicateModal";

const CATEGORY_OPTIONS = [
  "All Categories",
  "HCT Convoy",
  "Official TMP Convoy",
  "Community Convoy",
  "Special Event",
  "Meeting",
  "HCC Community Event",
  "Charity",
  "Training",
  "Miscellaneous"
];

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [sort, setSort] = useState("ASC");
  const [duplicateEvent, setDuplicateEvent] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    api.getEvents().then(setEvents);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    await api.deleteEvent(token, id);
    setEvents(events.filter((e) => e.id !== id));
  };

  const filtered = events
    .filter((e) => e.title.toLowerCase().includes(search.toLowerCase()))
    .filter((e) =>
      categoryFilter === "All Categories"
        ? true
        : e.category === categoryFilter
    )
    .sort((a, b) =>
      sort === "ASC"
        ? new Date(a.event_date) - new Date(b.event_date)
        : new Date(b.event_date) - new Date(a.event_date)
    );

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">

      {/* Header + Create Button */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>

        <Link
          to="/admin/create"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg transition font-semibold"
        >
          Create New Event
        </Link>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">

        {/* Search */}
        <input
          type="text"
          placeholder="Search events..."
          className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Filter */}
        <select
          className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {CATEGORY_OPTIONS.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="ASC">Sort by Date (Ascending)</option>
          <option value="DESC">Sort by Date (Descending)</option>
        </select>
      </div>

      {/* Event Grid */}
      <AnimatePresence>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filtered.map((event) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="bg-gray-900 rounded-xl border border-gray-800 shadow-lg overflow-hidden"
            >
              {/* Banner */}
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={event.banner_url}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="p-6">

                {/* Category + Featured */}
                <div className="flex justify-between items-center mb-3">
                  <span className="px-3 py-1 bg-blue-600 text-xs rounded-lg uppercase">
                    {event.category}
                  </span>

                  {event.is_featured && (
                    <span className="px-3 py-1 bg-yellow-600 text-xs rounded-lg uppercase">
                      Featured
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>

                {/* Date */}
                <p className="text-gray-400 mb-1">
                  <strong className="text-gray-300">Event Date:</strong>{" "}
                  {new Date(event.event_date).toLocaleDateString()}
                </p>

                {/* Times */}
                <p className="text-gray-400 mb-4">
                  <strong className="text-gray-300">Meetup:</strong> {event.meetup_time}
                  {" • "}
                  <strong className="text-gray-300">Departure:</strong> {event.departure_time}
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3 mt-4">

                  <Link
                    to={`/admin/edit/${event.id}`}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-center font-semibold transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => setDuplicateEvent(event)}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-lg font-semibold transition"
                  >
                    Duplicate
                  </button>

                  <button
                    onClick={() => handleDelete(event.id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-semibold transition"
                  >
                    Delete
                  </button>

                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Duplicate Modal (if active) */}
      {duplicateEvent && (
        <DuplicateModal
          event={duplicateEvent}
          close={() => setDuplicateEvent(null)}
          onDuplicate={async (newEvent) => {
            const created = await api.createEvent(token, newEvent);
            setEvents([...events, { ...newEvent, id: created.id }]);
            setDuplicateEvent(null);
          }}
        />
      )}
    </div>
  );
}
