import Sidebar from "../components/Sidebar";
import AnimeCard from "../components/element/AnimeCard";
import AnimeModal from "../components/element/AnimeModal";
import AddAnimeModal from "../components/element/AddAnimeModal";

import LoadingSpinner from "../components/element/LoadingSpinner";


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

// services
import { getAnimesWithGenres } from "../services/animeServices";
import { getCurrentUser } from "../services/authServices";
import { useState, useEffect } from "react";

// ─── Dummy Data ─────────────────────────────────────────────────────────────

const DUMMY_STATS = {
  totalAnime: 47,
  averageRating: 8.4,
  completedThisMonth: 6,
  uploadToday: 1,
};

const DUMMY_ANIMES = [
  {
    id: 1,
    title: "Attack on Titan",
    rating: 9.2,
    review:
      "Masterpiece dari awal hingga akhir. Cerita yang kompleks dan mengejutkan dengan twist yang luar biasa.",
    image_url: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
    anime_genres: [{ genres: { id: 1, name: "Action" } }, { genres: { id: 2, name: "Drama" } }],
  },
  {
    id: 2,
    title: "Demon Slayer",
    rating: 8.9,
    review:
      "Animasi yang sangat indah dengan pertarungan yang memukau. Kimetsu no Yaiba benar-benar memanjakan mata.",
    image_url: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
    anime_genres: [{ genres: { id: 1, name: "Action" } }, { genres: { id: 3, name: "Supernatural" } }],
  },
  {
    id: 3,
    title: "Your Lie in April",
    rating: 8.7,
    review:
      "Sangat emosional dan menyentuh hati. Musik klasik berpadu dengan cerita yang indah namun menyedihkan.",
    image_url: "https://cdn.myanimelist.net/images/anime/3/67177.jpg",
    anime_genres: [{ genres: { id: 4, name: "Romance" } }, { genres: { id: 5, name: "Music" } }],
  },
  {
    id: 4,
    title: "Fullmetal Alchemist: Brotherhood",
    rating: 9.1,
    review:
      "Plot yang sempurna, karakter yang luar biasa. Salah satu anime terbaik sepanjang masa yang wajib ditonton.",
    image_url: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg",
    anime_genres: [{ genres: { id: 1, name: "Action" } }, { genres: { id: 6, name: "Adventure" } }],
  },
];

const DUMMY_GENRES = [
  { name: "Action", count: 18, color: "bg-blue-500" },
  { name: "Romance", count: 12, color: "bg-pink-500" },
  { name: "Comedy", count: 9, color: "bg-amber-500" },
  { name: "Drama", count: 7, color: "bg-purple-500" },
  { name: "Fantasy", count: 5, color: "bg-emerald-500" },
];

const DUMMY_ACTIVITY = [
  { week: "Mg 1", added: 3, completed: 2 },
  { week: "Mg 2", added: 7, completed: 5 },
  { week: "Mg 3", added: 2, completed: 4 },
  { week: "Mg 4", added: 9, completed: 6 },
  { week: "Mg 5", added: 5, completed: 3 },
  { week: "Mg 6", added: 11, completed: 8 },
  { week: "Mg 7", added: 4, completed: 5 },
  { week: "Mg 8", added: 8, completed: 7 },
];

// ─── Sub-Components ──────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg text-sm font-mono">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">
          {label}
        </p>
        {payload.map((entry) => (
          <p key={entry.dataKey} className="flex items-center gap-2" style={{ color: entry.color }}>
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            {entry.name}: <span className="font-bold ml-1">{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// ─── Main Page ───────────────────────────────────────────────────────────────

function Analytics() {
  const [animes, setAnimes] = useState([]);
  
  const [showAddForm, setShowAddForm] = useState(false);

  const [selectedAnime, setSelectedAnime] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [loadingAnimes, setLoadingAnimes] = useState(false);

  useEffect(() => {
      // eslint-disable-next-line react-hooks/immutability
      fetchLatest();
  
      const handler = () => fetchLatest();
      window.addEventListener("animesChanged", handler);
      return () => window.removeEventListener("animesChanged", handler);
    }, []);
  
    const fetchLatest = async () => {
      setLoadingAnimes(true);
      const user = await getCurrentUser();
      if (!user) return setLoadingAnimes(false);
      const { data, error } = await getAnimesWithGenres(user.id, 4);
      if (error) {
        console.error(error);
        setLoadingAnimes(false);
        return;
      }
      setAnimes(data || []);

      setLoadingAnimes(false);
    };
  







  const maxGenreCount = DUMMY_GENRES[0].count;

  return (
    <div className="min-h-screen bg-slate-50 font-mono text-slate-900">
      <Sidebar />

      <main className="mx-auto max-w-7xl px-4 pb-12 pt-6 sm:ml-64 sm:px-6 lg:px-8">

        {/* ── PAGE HEADER ── */}
        <div className="mb-8 rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500/80">
                MyAnime
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                ANALYTICS
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Insight mendalam tentang koleksi dan aktivitas anime kamu.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-2 text-sm text-blue-600">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M8 2v4m8-4v4M3 10h18M5 4h14a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
              </svg>
              <span className="font-semibold">April 2026</span>
            </div>
          </div>
        </div>

        {/* ── BENTO GRID: TOP STATS ── */}
        <section className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {/* TOTAL ANIME — span 2 cols, hero card */}
          <div className="group relative col-span-1 sm:col-span-2 xl:col-span-2 overflow-hidden rounded-4xl border border-blue-100 bg-linear-to-br from-blue-600 via-blue-700 to-blue-800 p-8 shadow-lg transition-all duration-300 hover:shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5">
            {/* decorative circles */}
            <div className="pointer-events-none absolute -top-8 -right-8 h-40 w-40 rounded-full bg-white/5" />
            <div className="pointer-events-none absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-white/5" />

            <div className="relative">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur-sm">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1Z" />
                  </svg>
                </div>
                <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm">
                  ALL TIME
                </span>
              </div>

              <p className="mt-6 text-sm font-medium uppercase tracking-widest text-blue-200">
                Total Anime Ditonton
              </p>
              <p className="mt-2 text-6xl font-bold tracking-tight text-white">
                {DUMMY_STATS.totalAnime}
              </p>
              <p className="mt-3 text-sm text-blue-200">
                +{DUMMY_STATS.completedThisMonth} anime bulan ini 🎉
              </p>

              <div className="mt-6 h-1 w-full rounded-full bg-white/10">
                <div className="h-1 w-3/4 rounded-full bg-white/50" />
              </div>

            </div>
          </div>

          {/* AVG RATING */}
          <div className="group rounded-4xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z" />
                </svg>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Avg
              </span>
            </div>
            <p className="mt-6 text-sm font-medium text-slate-500">Rata-rata Rating</p>
            <p className="mt-2 text-4xl font-bold text-slate-900">
              {DUMMY_STATS.averageRating}
              <span className="ml-1 text-lg font-medium text-slate-400">/10</span>
            </p>
            <div className="mt-4 flex gap-0.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-all ${
                    i <= Math.round(DUMMY_STATS.averageRating)
                      ? "bg-amber-400"
                      : "bg-slate-100"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* HOURS WATCHED */}
          <div className="group rounded-4xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Total
              </span>
            </div>
            <p className="mt-6 text-sm font-medium text-slate-500">Upload Hari Ini</p>
            <p className="mt-2 text-4xl font-bold text-slate-900">
              {DUMMY_STATS.uploadToday}
              <span className="ml-1 text-lg font-medium text-slate-400">Anime</span>
            </p>
            <p className="mt-3 text-xs text-emerald-600 font-medium">
              ≈ yang udah kamu upload hari ini.
            </p>
          </div>
        </section>

        {/* ── ANIME TERBARU ── */}
        <section className="mb-8">
          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Koleksi</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">Anime Terbaru</h2>
              </div>
              <p className="text-sm text-slate-500">4 anime terakhir yang ditambahkan</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {loadingAnimes ? (
              <div className="col-span-4 flex justify-center py-16">
                <LoadingSpinner size="lg" />
              </div>
            ) : (
              animes.map((anime) => (
                <AnimeCard
                  key={anime.id}
                  anime={anime}
                  onClick={(a) => {
                    setSelectedAnime(a);
                    setShowModal(true);
                  }}
                />
              ))
            )}
            </div>
          </div>


          {/* ANIME DETAIL */}
          <AnimeModal
            anime={selectedAnime}
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onEdit={(item) => {
              // open AddAnime and prefill via custom event
              setShowAddForm(true);
              setTimeout(
                () =>
                  window.dispatchEvent(
                    new CustomEvent("openEditAnime", { detail: item }),
                  ),
                100,
              );
            }}
            onDeleted={() => fetchLatest()}
          />

          <AddAnimeModal isOpen={showAddForm} onClose={() => setShowAddForm(false)} />
        </section>

        {/* ── BOTTOM GRID: GENRE + CHART ── */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-5">

          {/* TOP GENRES — 2 cols */}
          <div className="xl:col-span-2 rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Statistik</p>
            <h2 className="mt-2 mb-6 text-xl font-semibold text-slate-900">
              Top Genre Favorit
            </h2>

            <div className="space-y-4">
              {DUMMY_GENRES.map((genre, idx) => (
                <div
                  key={genre.name}
                  className="group flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50/40"
                >
                  {/* rank badge */}
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white ${
                      idx === 0
                        ? "bg-blue-600"
                        : idx === 1
                        ? "bg-blue-400"
                        : idx === 2
                        ? "bg-blue-300"
                        : "bg-slate-300 text-slate-600"
                    }`}
                  >
                    #{idx + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-semibold text-slate-800">{genre.name}</span>
                      <span className="text-xs font-medium text-slate-400">
                        {genre.count} anime
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-200">
                      <div
                        className="h-1.5 rounded-full bg-blue-500 transition-all duration-700"
                        style={{ width: `${(genre.count / maxGenreCount) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Genre pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {DUMMY_GENRES.map((g) => (
                <span
                  key={g.name}
                  className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700"
                >
                  {g.name}
                </span>
              ))}
            </div>
          </div>

          {/* ACTIVITY CHART — 3 cols */}
          <div className="xl:col-span-3 rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Aktivitas</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">
                  Grafik Mingguan
                </h2>
              </div>
              {/* Legend */}
              <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500" />
                  Ditambahkan
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  Diselesaikan
                </span>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={DUMMY_ACTIVITY}
                  margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorAdded" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#34d399" stopOpacity={0.18} />
                      <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="#f1f5f9"
                    strokeDasharray="4 4"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="week"
                    tick={{ fontSize: 11, fontFamily: "monospace", fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    dy={8}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fontFamily: "monospace", fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#e2e8f0", strokeWidth: 1 }} />
                  <Area
                    type="monotone"
                    dataKey="added"
                    name="Ditambahkan"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    fill="url(#colorAdded)"
                    dot={{ r: 4, fill: "#3b82f6", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#2563eb", strokeWidth: 2, stroke: "#fff" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    name="Diselesaikan"
                    stroke="#34d399"
                    strokeWidth={2.5}
                    fill="url(#colorCompleted)"
                    dot={{ r: 4, fill: "#34d399", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Mini summary row below chart */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Total Ditambah", value: DUMMY_ACTIVITY.reduce((s, d) => s + d.added, 0), color: "text-blue-600" },
                { label: "Total Selesai", value: DUMMY_ACTIVITY.reduce((s, d) => s + d.completed, 0), color: "text-emerald-600" },
                { label: "Minggu Terbaik", value: "Mg 6", color: "text-slate-700" },
                { label: "Rata-rata/Minggu", value: (DUMMY_ACTIVITY.reduce((s, d) => s + d.added, 0) / DUMMY_ACTIVITY.length).toFixed(1), color: "text-slate-700" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <p className="text-xs text-slate-400">{item.label}</p>
                  <p className={`mt-1 text-lg font-bold ${item.color}`}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BAR CHART: RATING DISTRIBUTION ── */}
        <section className="mt-6">
          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Distribusi</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">
                  Distribusi Rating Anime
                </h2>
              </div>
              <p className="text-sm text-slate-500">Sebaran rating dari koleksimu</p>
            </div>

            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { range: "1–4", count: 2 },
                    { range: "4–5", count: 3 },
                    { range: "5–6", count: 5 },
                    { range: "6–7", count: 7 },
                    { range: "7–8", count: 10 },
                    { range: "8–9", count: 14 },
                    { range: "9–10", count: 6 },
                  ]}
                  margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
                  barCategoryGap="30%"
                >
                  <CartesianGrid stroke="#f1f5f9" strokeDasharray="4 4" vertical={false} />
                  <XAxis
                    dataKey="range"
                    tick={{ fontSize: 11, fontFamily: "monospace", fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    dy={8}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fontFamily: "monospace", fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
                  <Bar dataKey="count" name="Jumlah Anime" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}

export default Analytics;
