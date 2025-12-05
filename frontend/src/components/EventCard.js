import React from "react";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="bg-gray-900 rounded-xl shadow-lg border border-gray-800 overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all duration-300">

      {/* Banner Image */}
      <div className="h-48 w-full overflow-hidden relative">
        <img
          src={event.banner_url}
          alt={event.title}
          className="w-full h-full object-cover"
        />

        {/* Route Map thumbnail (top-right) */}
        {event.route_map_url && (
          <img
            src={event.route_map_url}
            alt="Route Map"
            className="absolute top-2 right-2 h-12 w-12 rounded-lg border border-gray-700 shadow-md object-cover"
          />
        )}
      </div>

      {/* Content */}
      <div className="p-6">

        {/* Category Badge */}
        <span className="px-3 py-1 bg-blue-600 text-xs rounded-lg uppercase tracking-wide inline-block mb-3">
          {event.category}
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
          <strong className="text-gray-300">Departure:</strong>{" "}
          {event.departure_time}
        </p>

        {/* Slot Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {event.our_slot && (
            <span className="px-3 py-1 bg-green-600/80 text-sm rounded-lg">
              Our Slot: {event.our_slot}
            </span>
          )}

          {event.public_slot && (
            <span className="px-3 py-1 bg-blue-600/80 text-sm rounded-lg">
              Public Slot: {event.public_slot}
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">

          <Link
            to={`/event/${event.id}`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition"
          >
            Details
          </Link>

          {event.tmp_link && (
            <a
              href={event.tmp_link}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition flex items-center gap-2"
            >
              <img
                src="https://static.truckersmp.com/images/favicon.png"
                className="h-4 w-4"
                alt="TMP"
              />
              TMP
            </a>
          )}

        </div>
      </div>
    </div>
  );
}
