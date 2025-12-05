import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function FeaturedCarousel() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.getFeaturedEvents().then(setFeatured);

    // SAFE CLEANUP
    return () => {
      try {
        document.querySelectorAll(".swiper").forEach((el) => {
          if (el.swiper && typeof el.swiper.destroy === "function") {
            el.swiper.destroy(true, false);
          }
        });
      } catch {}
    };
  }, []);

  if (featured.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto mt-6">
      <Swiper
        key={featured.length}
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        loop={featured.length > 1}
        observer={true}
        observeParents={true}
        className="rounded-xl overflow-hidden"
      >
        {featured.map(event => (
          <SwiperSlide key={event.id}>
            <div className="relative h-[350px] md:h-[450px] lg:h-[550px] bg-black">

              <img
                src={event.banner_url}
                alt={event.title}
                className="absolute inset-0 w-full h-full object-cover opacity-70"
              />

              <div className="absolute inset-0 flex flex-col justify-center items-start px-10 md:px-20 text-white backdrop-blur-sm">

                <span className="px-3 py-1 bg-blue-600 text-xs rounded-lg mb-3 uppercase tracking-wide">
                  {event.category}
                </span>

                <h1 className="text-3xl md:text-5xl font-bold drop-shadow-lg mb-4">
                  {event.title}
                </h1>

                <p className="text-lg md:text-xl font-medium drop-shadow-md mb-4">
                  Event Date: {new Date(event.event_date).toLocaleDateString()}
                </p>

                <p className="text-md md:text-lg drop-shadow-md mb-6">
                  Meetup: {event.meetup_time} • Departure: {event.departure_time}
                </p>

                <Link
                  to={`/event/${event.id}`}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg text-lg font-semibold transition"
                >
                  View Details
                </Link>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
