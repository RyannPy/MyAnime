import Sidebar from "../components/Sidebar";

const AnimeList = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-mono text-slate-900">
      <Sidebar />
      <main className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:ml-64 sm:px-6 lg:px-8">
        <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-900">Daftar Anime</h1>
          <p className="mt-2 text-sm text-slate-500">Halaman daftar lengkap (placeholder, belum diimplementasikan).</p>
        </div>
      </main>
    </div>
  );
};

export default AnimeList;
