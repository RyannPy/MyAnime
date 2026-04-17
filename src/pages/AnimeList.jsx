import { useState, useEffect } from "react";

import Sidebar from "../components/Sidebar";
import AnimeCard from "../components/AnimeCard";
import AnimeModal from "../components/AnimeModal";
import AddAnimeModal from "../components/AddAnimeModal";

import { getAnimesWithGenres } from "../services/animeServices";
import { getCurrentUser } from "../services/authServices";

const AnimeList = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [animes, setAnimes] = useState([]);
  const [loadingAnimes, setLoadingAnimes] = useState(false);
  const [selectedAnime, setSelectedAnime] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    const { data, error } = await getAnimesWithGenres(user.id);
    if (error) {
      console.error(error);
      setLoadingAnimes(false);
      return;
    }
    setAnimes(data || []);

    setLoadingAnimes(false);
  };

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
                  ANIME LIST
                </h1>
              </div>
              <button
                onClick={() => setShowAddForm(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white transition hover:bg-blue-700"
                aria-label="Add Anime"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* ANIME LIST */}

          <section className="space-y-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                  Koleksi Anime Pilihan
                </h2>
              </div>
              <p className="max-w-xl text-sm text-slate-500 sm:text-right">
                Lihat anime apa aja yang udah kamu tonton dan kasih review!
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {loadingAnimes ? (
                <div className="col-span-4 text-center text-slate-500">
                  Loading...
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

            {/* ADD ANIME */}
            <AddAnimeModal
              isOpen={showAddForm}
              onClose={() => setShowAddForm(false)}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default AnimeList;
