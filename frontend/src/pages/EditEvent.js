import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

const CATEGORIES = [
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

export default function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  
  const [event, setEvent] = useState(null);

  useEffect(() => {
    api.getEvent(id).then(setEvent);
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <p className="text-gray-400 text-xl">Loading event data...</p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.updateEvent(token, id, event);
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      <div className="max-w-4xl mx-auto bg-gray-900 p-10 rounded-xl border border-gray-800">

        <h1 className="text-3xl font-bold mb-6">Edit Event</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold">Event Title</label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
              value={event.title}
              onChange={(e) => setEvent({ ...event, title: e.target.value })}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-semibold">Description</label>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 h-32"
              value={event.description}
              onChange={(e) => setEvent({ ...event, description: e.target.value })}
              required
            ></textarea>
          </div>

          {/* Location */}
          <div>
            <label className="block mb-2 font-semibold">Location</label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
              value={event.location}
              onChange={(e) => setEvent({ ...event, location: e.target.value })}
              required
            />
          </div>

          {/* Event Date */}
          <div>
            <label className="block mb-2 font-semibold">Event Date</label>
            <input
              type="date"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
              value={event.event_date}
              onChange={(e) => setEvent({ ...event, event_date: e.target.value })}
              required
            />
          </div>

          {/* Meetup Time */}
          <div>
            <label className="block mb-2 font-semibold">Meetup Time</label>
            <input
              type="time"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
              value={event.meetup_time}
              onChange={(e) => setEvent({ ...event, meetup_time: e.target.value })}
              required
            />
          </div>

          {/* Departure Time */}
          <div>
            <label className="block mb-2 font-semibold">Departure Time</label>
            <input
              type="time"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
              value={event.departure_time}
              onChange={(e) => setEvent({ ...event, departure_time: e.target.value })}
              required
            />
          </div>

          {/* Banner URL */}
          <div>
            <label className="block mb-2 font-semibold">Event Banner URL</label>
            <input
              type="text"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
              value={event.banner_url}
              onChange={(e) => setEvent({ ...event, banner_url: e.target.value })}
              required
            />
          </div>

          {/* Banner Preview */}
          {event.banner_url && (
            <div className="mb-6">
              <p className="text-gray-400 mb-2">Preview:</p>
              <img
                src={event.banner_url}
                alt="Banner Preview"
                className="w-full h-48 object-cover rounded-lg border border-gray-800"
              />
            </div>
          )}

          {/* Category */}
          <div>
            <label className="block mb-2 font-semibold">Category</label>
            <select
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2"
              value={event.category}
              onChange={(e) => setEvent({ ...event, category: e.target.value })}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={event.is_featured}
              onChange={(e) =>
                setEvent({ ...event, is_featured: e.target.checked })
              }
            />
            <label className="font-semibold">Mark as Featured Event</label>
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-semibold transition"
          >
            Save Changes
          </button>

        </form>

      </div>
    </div>
  );
}
