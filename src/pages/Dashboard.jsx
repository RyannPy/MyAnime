import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AnimeCard from "../components/element/AnimeCard";
import StatsCard from "../features/StatsCard";
import AddAnimeModal from "../components/element/AddAnimeModal";
import AnimeModal from "../components/element/AnimeModal";
import LoadingSpinner from "../components/element/LoadingSpinner";
import { getAnimesWithGenres } from "../services/animeServices";
import { getCurrentUser } from "../services/authServices";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [animes, setAnimes] = useState([]);
  const [loadingAnimes, setLoadingAnimes] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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

  const statsData = [
    {
      id: 1,
      title: "Total Anime Ditonton",
      value: "24",
      description: "Koleksi anime yang sudah kamu selesaikan.",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3v18m9-9H3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Rata-rata Rating",
      value: "8.9",
      description: "Penilaian rata-rata dari anime yang kamu lihat.",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 17.27L18.18 21 16.54 13.97 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.45 13.97 5.82 21 12 17.27Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Tambah Anime",
      value: "Add",
      description: "Gunakan fitur tambah anime untuk menyimpan koleksi baru.",
      icon: (
        <svg
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 5v14m7-7H5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
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
          {/* MAIN TITLE */}
          <div className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500/80">
                  MyAnime
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                  DASHBOARD
                </h1>
              </div>
              <p className="max-w-xl text-sm text-slate-500 sm:text-right">
                Lihat statistik menonton dan rekomendasi anime terbaru dalam
                satu halaman. Klik tombol &quot;Tambah Anime&quot; untuk menambahkan
                koleksi baru atau klik kartu anime untuk melihat detail dan
                mengedit koleksi yang sudah ada.
              </p>
            </div>
          </div>

          {/* CARD-CARD INFO */}
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

          <AddAnimeModal isOpen={showAddForm} onClose={() => setShowAddForm(false)} />
        </div>

        {/* LIST ANIME TERBARU */}
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
              Lihat koleksi anime kamu yang terbaru ditambahkan.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
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

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => navigate("/animes")}
              className="inline-flex items-center gap-2 text-sm text-blue-600"
            >
              Lihat Semua →
            </button>
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
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
