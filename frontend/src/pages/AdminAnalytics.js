import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  PieChart, Pie, Cell
} from "recharts";

export default function AdminAnalytics() {
  const [kpi, setKpi] = useState(null);
  const [eventsPerMonth, setEventsPerMonth] = useState([]);
  const [categoryDist, setCategoryDist] = useState([]);
  const [featuredBreakdown, setFeaturedBreakdown] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    setKpi(await api.analytics.kpi());
    setEventsPerMonth(await api.analytics.eventsPerMonth());
    setCategoryDist(await api.analytics.categoryDistribution());
    setFeaturedBreakdown(await api.analytics.featuredBreakdown());
  }

  if (!kpi || !featuredBreakdown || !eventsPerMonth || !categoryDist) {
  return <div className="text-white p-10">Loading analytics…</div>;
}


  const colors = ["#3b82f6", "#22c55e", "#eab308", "#ef4444", "#8b5cf6"];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">
      
      <h1 className="text-4xl font-bold mb-10">Analytics Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">

        <KPI title="Total Events" value={kpi.totalEvents} />
        <KPI title="Events This Month" value={kpi.totalThisMonth} />
        <KPI title="Featured Events" value={kpi.featured} />
        <KPI title="Top Category" value={kpi.topCategory} />

      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* EVENTS PER MONTH */}
        <div className="bg-gray-900/70 backdrop-blur-xl p-6 rounded-xl border border-gray-800 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Events Per Month</h2>

          <BarChart width={500} height={250} data={eventsPerMonth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis dataKey="month" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </div>

        {/* CATEGORY DISTRIBUTION */}
        <div className="bg-gray-900/70 backdrop-blur-xl p-6 rounded-xl border border-gray-800 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Category Distribution</h2>

          <PieChart width={500} height={250}>
            <Pie
              data={categoryDist}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {categoryDist.map((entry, i) => (
                <Cell key={i} fill={colors[i % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* FEATURED BREAKDOWN */}
        <div className="bg-gray-900/70 backdrop-blur-xl p-6 rounded-xl border border-gray-800 shadow-xl col-span-1 lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Featured vs Normal Events</h2>

          <PieChart width={500} height={250}>
            <Pie
              data={[
                { name: "Featured", value: featuredBreakdown.featured },
                { name: "Normal", value: featuredBreakdown.normal }
              ]}
              dataKey="value"
              outerRadius={110}
              label
            >
              <Cell fill="#eab308" />
              <Cell fill="#3b82f6" />
            </Pie>
          </PieChart>
        </div>

      </div>
    </div>
  );
}

function KPI({ title, value }) {
  return (
    <div className="bg-gray-900/70 backdrop-blur-xl p-6 rounded-xl border border-gray-800 shadow-lg text-center">
      <div className="text-gray-400 text-md mb-2">{title}</div>
      <div className="text-3xl font-bold text-white">{value}</div>
    </div>
  );
}
