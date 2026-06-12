"use client";

import {
  SUN_SIGN_TEXT,
  MOON_SIGN_TEXT,
  ASCENDANT_SIGN_TEXT,
  PLANET_INFO,
  getPlanetInSignText,
  getPlanetInHouseText,
  getAspectText,
} from "@/lib/interpretations";

const ORDERED_PLANETS = [
  "mercury", "venus", "mars", "jupiter", "saturn",
  "uranus", "neptune", "pluto", "chiron",
];

const MAIN_BODIES = [
  "sun", "moon", "mercury", "venus", "mars",
  "jupiter", "saturn", "uranus", "neptune", "pluto",
];

export default function Interpretations({ chart }) {
  const sun = chart.planets.find((p) => p.key === "sun");
  const moon = chart.planets.find((p) => p.key === "moon");
  const asc = chart.angles.ascendant;

  const planetMap = {};
  chart.planets.forEach((p) => (planetMap[p.key] = p));

  const keyAspects = chart.aspects.filter(
    (a) => MAIN_BODIES.includes(a.point1) && MAIN_BODIES.includes(a.point2)
  );

  return (
    <div className="space-y-10 text-indigo-100">
      <section>
        <h2 className="text-xl font-serif text-amber-300 mb-4">Your Big Three</h2>
        <div className="space-y-5">
          <div>
            <h3 className="font-semibold text-white mb-1">☉ Sun in {sun.sign}</h3>
            <p className="text-sm leading-relaxed">{SUN_SIGN_TEXT[sun.sign]}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">☽ Moon in {moon.sign}</h3>
            <p className="text-sm leading-relaxed">{MOON_SIGN_TEXT[moon.sign]}</p>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">Rising / Ascendant in {asc.sign}</h3>
            <p className="text-sm leading-relaxed">{ASCENDANT_SIGN_TEXT[asc.sign]}</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-serif text-amber-300 mb-4">Planets in Your Chart</h2>
        <div className="space-y-5">
          {ORDERED_PLANETS.map((key) => {
            const p = planetMap[key];
            if (!p) return null;
            return (
              <div key={key}>
                <h3 className="font-semibold text-white mb-1">
                  {PLANET_INFO[key].name} in {p.sign}
                  {p.house ? `, House ${p.house}` : ""}
                  {p.retrograde && (
                    <span className="text-red-400 text-xs ml-2">Retrograde</span>
                  )}
                </h3>
                <p className="text-sm leading-relaxed">{getPlanetInSignText(key, p.sign)}</p>
                {p.house && (
                  <p className="text-sm leading-relaxed mt-1">
                    {getPlanetInHouseText(key, p.house)}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-serif text-amber-300 mb-4">Key Aspects</h2>
        <div className="space-y-2">
          {keyAspects.slice(0, 8).map((a, i) => (
            <p key={i} className="text-sm leading-relaxed">
              {getAspectText(a)}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}