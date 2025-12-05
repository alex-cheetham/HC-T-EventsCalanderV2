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
        
        {/* Category Badge */}
        <span className="px-4 py-1 bg-blue-600 text-xs rounded-lg uppercase tracking-wide inline-block mb-4">
          {event.category}
        </span>

        {/* Title */}
        <h1 className="text-4xl font-extrabold mb-4">{event.title}</h1>

        {/* Event Date */}
        <p className="text-gray-400 text-lg mb-2">
          <strong className="text-gray-300">Event Date:</strong>{" "}
          {new Date(event.event_date).toLocaleDateString()}
        </p>

        {/* Meetup / Departure */}
        <p className="text-gray-400 text-lg mb-6">
          <strong className="text-gray-300">Meetup:</strong> {event.meetup_time}  
          {" • "}
          <strong className="text-gray-300">Departure:</strong> {event.departure_time}
        </p>

        {/* Description */}
        <div className="prose prose-invert max-w-none mb-10">
          <p className="text-gray-300 leading-relaxed whitespace-pre-line">
            {event.description}
          </p>
        </div>

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

          {/* Share Button (Optional) */}
          <button
            onClick={() => navigator.share && navigator.share({
              title: event.title,
              text: "Check out this event!",
              url: window.location.href
            })}
            className="px-5 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg transition"
          >
            Share Event
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------
// ICS CALENDAR FILE GENERATOR
// ---------------------------
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
