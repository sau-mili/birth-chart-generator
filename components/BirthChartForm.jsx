"use client";

import { useState } from "react";

export default function BirthChartForm({ onSubmit, loading }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [unknownTime, setUnknownTime] = useState(false);
  const [location, setLocation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !location) return;

    const [year, month, day] = date.split("-").map(Number);
    let hour = 12;
    let minute = 0;
    if (!unknownTime && time) {
      [hour, minute] = time.split(":").map(Number);
    }

    onSubmit({ year, month, day, hour, minute, location, unknownTime });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md mx-auto">
      <div>
        <label className="block text-sm font-medium text-indigo-200 mb-1">
          Date of birth
        </label>
        <input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-lg bg-indigo-950 border border-indigo-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-indigo-200 mb-1">
          Time of birth
        </label>
        <input
          type="time"
          value={time}
          disabled={unknownTime}
          onChange={(e) => setTime(e.target.value)}
          className="w-full rounded-lg bg-indigo-950 border border-indigo-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-50"
        />
        <label className="flex items-center gap-2 mt-2 text-sm text-indigo-300">
          <input
            type="checkbox"
            checked={unknownTime}
            onChange={(e) => setUnknownTime(e.target.checked)}
            className="rounded border-indigo-700"
          />
          I don&apos;t know my exact birth time
        </label>
        {unknownTime && (
          <p className="text-xs text-indigo-400 mt-1">
            We&apos;ll use 12:00 PM as an estimate. House placements and the
            Ascendant may not be accurate without an exact birth time.
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-indigo-200 mb-1">
          Place of birth
        </label>
        <input
          type="text"
          required
          placeholder="e.g. Mumbai, India"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full rounded-lg bg-indigo-950 border border-indigo-700 text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-amber-400 text-indigo-950 font-semibold py-3 hover:bg-amber-300 transition disabled:opacity-50"
      >
        {loading ? "Calculating..." : "Generate Birth Chart"}
      </button>
    </form>
  );
}