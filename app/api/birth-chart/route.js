import { NextResponse } from "next/server";
import { calculateBirthChart } from "@/lib/astrology";
import { geocodeLocation } from "@/lib/geocode";

export async function POST(request) {
  try {
    const body = await request.json();
    const { year, month, day, hour, minute, location } = body;

    if (
      year === undefined || month === undefined || day === undefined ||
      hour === undefined || minute === undefined || !location
    ) {
      return NextResponse.json(
        { error: "Missing required fields. Please provide year, month, day, hour, minute, and location." },
        { status: 400 }
      );
    }

    const { latitude, longitude, displayName } = await geocodeLocation(location);

    const { chart, timezone } = calculateBirthChart({
      year: Number(year),
      month: Number(month),
      day: Number(day),
      hour: Number(hour),
      minute: Number(minute),
      latitude,
      longitude,
    });

    return NextResponse.json({
      location: { latitude, longitude, displayName, timezone },
      chart,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: err.message || "Something went wrong calculating the chart." },
      { status: 500 }
    );
  }
}