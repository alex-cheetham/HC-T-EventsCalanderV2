import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import EventCard from "../components/EventCard";
import FeaturedCarousel from "../components/FeaturedCarousel";
import { motion, AnimatePresence } from "framer-motion";

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

export default function PublicEvents() {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [sort, setSort] = useState("ASC");

  useEffect(() => {
    api.getEvents().then(setEvents);
  }, []);

  // Filter + search
  const filteredEvents = events
    .filter((event) =>
      event.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((event) =>
      category === "All Categories" ? true : event.category === category
    )
    .sort((a, b) =>
      sort === "ASC"
        ? new Date(a.event_date) - new Date(b.event_date)
        : new Date(b.event_date) - new Date(a.event_date)
    );

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-20">

      {/* FEATURED CAROUSEL */}
      <FeaturedCarousel />

      {/* FILTER BAR */}
      <div className="max-w-7xl mx-auto px-6 mt-10 space-y-6">

        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">

          {/* Search */}
          <input
            type="text"
            placeholder="Search events..."
            className="w-full md:w-1/3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Category Filter */}
          <select
            className="w-full md:w-1/3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          {/* Sort Options */}
          <select
            className="w-full md:w-1/3 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="ASC">Sort: Date Ascending</option>
            <option value="DESC">Sort: Date Descending</option>
          </select>
        </div>

        <h2 className="text-3xl font-bold mt-8">All Upcoming Events</h2>

        {/* EVENT GRID */}
        <AnimatePresence>
          {filteredEvents.length === 0 ? (
            <p className="text-gray-400 mt-10">No events match your filters.</p>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredEvents.map((event) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
