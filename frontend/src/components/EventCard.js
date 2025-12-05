import React from "react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">

      {/* Banner Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={event.banner_url}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">

        {/* Category Badge */}
        <span className="px-3 py-1 bg-blue-600 text-xs rounded-lg uppercase tracking-wide inline-block mb-3">
          {event.category || "General"}
        </span>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2">{event.title}</h3>

        {/* Event Date */}
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

        {/* View Details */}
        <Link
          to={`/event/${event.id}`}
          className="inline-block px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
