import Sidebar from "../components/Sidebar";

function Leaderboard() {
  return (
    <div className="min-h-screen bg-slate-50 font-mono text-slate-900">
      <Sidebar />
      <main className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:ml-64 sm:px-6 lg:px-8">
        <div className="rounded-4xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500/80">
            MyAnime
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 mb-4">
            LEADERBOARD
          </h1>
          <p className="text-slate-500">Halaman ini masih dalam tahap pengembangan.</p>
        </div>
      </main>
    </div>
  );
}

export default Leaderboard;
