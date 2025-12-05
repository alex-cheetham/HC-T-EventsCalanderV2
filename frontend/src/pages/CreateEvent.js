import React, { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    title: "",
    description: "",
    location: "",
    event_date: "",
    meetup_time: "",
    departure_time: "",
    banner_url: "",
    category: "Miscellaneous",
    is_featured: false,

    // NEW FIELDS
    tmp_link: "",
    route_map_url: "",
    public_slot: "",
    our_slot: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEvent({
      ...event,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await api.createEvent(event);

    if (result.success) {
      navigate("/admin");
    } else {
      alert("Error creating event: " + (result.error || "Unknown error"));
    }
  };

  return (
    <div className="p-10 text-white max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create Event</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        <input
          name="title"
          placeholder="Event Title"
          className="w-full bg-gray-800 p-3 rounded"
          value={event.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          className="w-full bg-gray-800 p-3 rounded"
          value={event.description}
          onChange={handleChange}
        />

        <input
          name="location"
          placeholder="Location"
          className="w-full bg-gray-800 p-3 rounded"
          value={event.location}
          onChange={handleChange}
        />

        {/* NEW FIELD: TMP LINK */}
        <input
          name="tmp_link"
          placeholder="TruckersMP Event Link (Optional)"
          className="w-full bg-gray-800 p-3 rounded"
          value={event.tmp_link}
          onChange={handleChange}
        />

        {/* NEW FIELD: ROUTE MAP */}
        <input
          name="route_map_url"
          placeholder="Route Map Image URL"
          className="w-full bg-gray-800 p-3 rounded"
          value={event.route_map_url}
          onChange={handleChange}
        />

        {/* NEW FIELDS: SLOTS */}
        <div className="grid grid-cols-2 gap-6">
          <input
            name="public_slot"
            placeholder="Public Slot (Optional)"
            className="bg-gray-800 p-3 rounded w-full"
            value={event.public_slot}
            onChange={handleChange}
          />

          <input
            name="our_slot"
            placeholder="Our VTC Slot"
            className="bg-gray-800 p-3 rounded w-full"
            value={event.our_slot}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label>Date</label>
            <input
              type="date"
              name="event_date"
              className="w-full bg-gray-800 p-3 rounded"
              value={event.event_date}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Banner URL</label>
            <input
              name="banner_url"
              className="w-full bg-gray-800 p-3 rounded"
              value={event.banner_url}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label>Meetup Time</label>
            <input
              type="time"
              name="meetup_time"
              className="w-full bg-gray-800 p-3 rounded"
              value={event.meetup_time}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Departure Time</label>
            <input
              type="time"
              name="departure_time"
              className="w-full bg-gray-800 p-3 rounded"
              value={event.departure_time}
              onChange={handleChange}
            />
          </div>
        </div>

        <select
          name="category"
          className="w-full bg-gray-800 p-3 rounded"
          value={event.category}
          onChange={handleChange}
        >
          <option>HCT Convoy</option>
          <option>Official TMP Convoy</option>
          <option>Community Convoy</option>
          <option>Special Event</option>
          <option>Meeting</option>
          <option>HCC Community Event</option>
          <option>Charity</option>
          <option>Training</option>
          <option>Miscellaneous</option>
        </select>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            name="is_featured"
            checked={event.is_featured}
            onChange={handleChange}
          />
          Featured Event
        </label>

        <button className="px-6 py-3 bg-blue-600 rounded">
          Create Event
        </button>
      </form>
    </div>
  );
}
