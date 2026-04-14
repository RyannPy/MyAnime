import { useState } from "react";
import Sidebar from "../components/Sidebar";
import AnimeCard from "../components/AnimeCard";
import StatsCard from "../features/StatsCard";
import AddAnime from "../features/AddAnime";

const dummyAnimes = [
  {
    id: 1,
    title: "Attack on Titan",
    rating: 9.5,
    review: "Storynya sangat dalam dan penuh plot twist yang membuat penonton selalu penasaran.",
    image_url: "https://via.placeholder.com/400x280",
  },
  {
    id: 2,
    title: "Naruto",
    rating: 8.7,
    review: "Perjalanan ninja yang penuh emosi dan perjuangan, serta karakter-karakter ikonik.",
    image_url: "https://via.placeholder.com/400x280",
  },
  {
    id: 3,
    title: "One Piece",
    rating: 9.8,
    review: "Petualangan panjang dengan world building luar biasa dan cerita yang terus berkembang.",
    image_url: "https://via.placeholder.com/400x280",
  },
  {
    id: 4,
    title: "Demon Slayer",
    rating: 9.1,
    review: "Visual memukau dan cerita keluarga yang kuat membuat pengalaman menonton makin berkesan.",
    image_url: "https://via.placeholder.com/400x280",
  },
];

function Dashboard() {
  const [showAddForm, setShowAddForm] = useState(false);

  const statsData = [
    {
      id: 1,
      title: "Total Anime Ditonton",
      value: "24",
      description: "Koleksi anime yang sudah kamu selesaikan.",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3v18m9-9H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Rata-rata Rating",
      value: "8.9",
      description: "Penilaian rata-rata dari anime yang kamu lihat.",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.45 13.97 5.82 21 12 17.27Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Tambah Anime",
      value: "Add",
      description: "Gunakan fitur tambah anime untuk menyimpan koleksi baru.",
      icon: (
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5v14m7-7H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      actionText: showAddForm ? "Tutup Form" : "Tambah Anime",
      onAction: () => setShowAddForm((value) => !value),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-mono text-slate-900">
      <Sidebar />

      <main className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:ml-64 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-6">
          <div className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500/80">
                  Dashboard
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                  Ringkasan MyAnime
                </h1>
              </div>
              <p className="max-w-xl text-sm text-slate-500 sm:text-right">
                Lihat statistik menonton dan rekomendasi anime terbaru dalam tampilan minimalis berwarna biru.
              </p>
            </div>
          </div>

          <section>
            <div className="grid gap-6 xl:grid-cols-3">
              {statsData.map((item) => (
                <StatsCard
                  key={item.id}
                  title={item.title}
                  value={item.value}
                  description={item.description}
                  icon={item.icon}
                  actionText={item.actionText}
                  onAction={item.onAction}
                />
              ))}
            </div>
          </section>

          {showAddForm && (
            <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-blue-500/80">Tambah Anime</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">Form Tambah Anime</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-blue-300 hover:text-blue-600"
                >
                  Tutup
                </button>
              </div>
              <AddAnime />
            </section>
          )}
        </div>

        <section className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                Anime List
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                Koleksi Anime Pilihan
              </h2>
            </div>
            <p className="text-sm text-slate-500">
              Kartu anime dengan ulasan singkat dan tombol untuk melihat detail.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {dummyAnimes.map((anime) => (
              <AnimeCard
                key={anime.id}
                title={anime.title}
                rating={anime.rating}
                review={anime.review}
                image_url={anime.image_url}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
