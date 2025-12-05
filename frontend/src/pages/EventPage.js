import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    api.getEvent(id).then(setEvent);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-400 text-xl">Loading event details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-20">

      {/* Banner */}
      <div className="w-full h-64 md:h-96 overflow-hidden">
        <img
          src={event.banner_url}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 mt-10">
        
        {/* Category */}
        <span className="px-4 py-1 bg-blue-600 text-xs rounded-lg uppercase tracking-wide inline-block mb-4">
          {event.category}
        </span>

        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-4">{event.title}</h1>

        {/* Date + Times */}
        <p className="text-gray-400 text-lg mb-2">
          <strong className="text-gray-300">Event Date:</strong>{" "}
          {new Date(event.event_date).toLocaleDateString()}
        </p>

        <p className="text-gray-400 text-lg mb-4">
          <strong className="text-gray-300">Meetup:</strong> {event.meetup_time}
          {" • "}
          <strong className="text-gray-300">Departure:</strong>{" "}
          {event.departure_time}
        </p>

        {/* Slot Pills */}
        <div className="flex flex-wrap gap-4 mb-6">
          {event.our_slot && (
            <span className="px-4 py-2 bg-green-600/80 text-md rounded-lg shadow">
              Our Slot: {event.our_slot}
            </span>
          )}

          {event.public_slot && (
            <span className="px-4 py-2 bg-blue-600/80 text-md rounded-lg shadow">
              Public Slot: {event.public_slot}
            </span>
          )}
        </div>

        {/* Description */}
        <div className="prose prose-invert max-w-none mb-10">
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {event.description}
          </p>
        </div>

        {/* Route Map */}
        {event.route_map_url && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-3">Route Map</h2>
            <img
              src={event.route_map_url}
              alt="Route Map"
              className="w-full rounded-xl border border-gray-800 shadow-xl"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-wrap gap-4">

          {/* Add to Calendar */}
          <a
            href={`data:text/calendar;charset=utf-8,${encodeURIComponent(generateICS(event))}`}
            download={`${event.title}.ics`}
            className="px-5 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg transition font-semibold"
          >
            Add to Calendar
          </a>

          {/* TMP Page */}
          {event.tmp_link && (
            <a
              href={event.tmp_link}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition flex items-center gap-2"
            >
              <img
                src="https://static.truckersmp.com/images/favicon.png"
                className="h-5 w-5"
                alt="TMP"
              />
              View on TMP
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

/* ICS Generator */
function generateICS(event) {
  const dateFormatted = event.event_date.replace(/-/g, "");

  return `
BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${event.title}
DTSTART:${dateFormatted}T${event.meetup_time.replace(":", "")}00Z
DTEND:${dateFormatted}T${event.departure_time.replace(":", "")}00Z
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR
  `;
}
