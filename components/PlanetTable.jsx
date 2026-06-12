"use client";

const SIGN_GLYPHS = {
  Aries: "♈", Taurus: "♉", Gemini: "♊", Cancer: "♋", Leo: "♌", Virgo: "♍",
  Libra: "♎", Scorpio: "♏", Sagittarius: "♐", Capricorn: "♑", Aquarius: "♒", Pisces: "♓",
};

const PLANET_LABELS = {
  sun: "Sun", moon: "Moon", mercury: "Mercury", venus: "Venus", mars: "Mars",
  jupiter: "Jupiter", saturn: "Saturn", uranus: "Uranus", neptune: "Neptune",
  pluto: "Pluto", chiron: "Chiron", northnode: "North Node", southnode: "South Node",
};

const HOUSE_ORDINALS = {
  1: "1st", 2: "2nd", 3: "3rd", 4: "4th", 5: "5th", 6: "6th",
  7: "7th", 8: "8th", 9: "9th", 10: "10th", 11: "11th", 12: "12th",
};

export default function PlanetTable({ chart }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-indigo-800">
      <table className="w-full text-sm text-left text-indigo-100">
        <thead className="bg-indigo-900/60 text-indigo-300 uppercase text-xs">
          <tr>
            <th className="px-4 py-3">Planet</th>
            <th className="px-4 py-3">Sign</th>
            <th className="px-4 py-3">Degree</th>
            <th className="px-4 py-3">House</th>
          </tr>
        </thead>
        <tbody>
          {chart.planets.map((p) => (
            <tr key={p.key} className="border-t border-indigo-800/50">
              <td className="px-4 py-3 font-medium text-white">
                {PLANET_LABELS[p.key] || p.label}
                {p.retrograde && <span className="ml-1 text-red-400 text-xs">R</span>}
              </td>
              <td className="px-4 py-3">
                {SIGN_GLYPHS[p.sign]} {p.sign}
              </td>
              <td className="px-4 py-3">{p.degree}° {p.minute}&apos;</td>
              <td className="px-4 py-3">{p.house ? HOUSE_ORDINALS[p.house] : "—"}</td>
            </tr>
          ))}
          <tr className="border-t border-indigo-800/50 bg-indigo-900/30">
            <td className="px-4 py-3 font-medium text-amber-300">Ascendant</td>
            <td className="px-4 py-3">
              {SIGN_GLYPHS[chart.angles.ascendant.sign]} {chart.angles.ascendant.sign}
            </td>
            <td className="px-4 py-3">{chart.angles.ascendant.degree}° {chart.angles.ascendant.minute}&apos;</td>
            <td className="px-4 py-3">—</td>
          </tr>
          <tr className="border-t border-indigo-800/50 bg-indigo-900/30">
            <td className="px-4 py-3 font-medium text-amber-300">Midheaven</td>
            <td className="px-4 py-3">
              {SIGN_GLYPHS[chart.angles.midheaven.sign]} {chart.angles.midheaven.sign}
            </td>
            <td className="px-4 py-3">{chart.angles.midheaven.degree}° {chart.angles.midheaven.minute}&apos;</td>
            <td className="px-4 py-3">—</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}