import { useState } from "react";
import GenreBadge from "./GenreBadge";
import ConfirmModal from "../notification/ConfirmModal";
import { deleteAnimeById } from "../../services/animeServices";
import { useToast } from "../../contexts/ToastContexts";

const AnimeModal = ({ anime, isOpen, onClose, onEdit, onDeleted }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const { addToast } = useToast();

  if (!isOpen || !anime) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 max-w-4xl rounded-2xl bg-white p-6 shadow-lg">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">
              {anime.title}
            </h3>
            <div className="mt-4 flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-blue-700">
                <span>⭐</span>
                <span className="font-medium">{anime.rating}</span>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {(anime.anime_genres || []).map((g) => (
                <GenreBadge key={g.genres?.id || g.id}>
                  {g.genres?.name || g.name}
                </GenreBadge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="h-56 w-full overflow-hidden rounded-lg border border-slate-200">
              <img
                src={anime.image_url}
                alt={anime.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="text-sm font-semibold text-slate-700">Review</h4>
          <p className="mt-2 text-sm text-slate-600 whitespace-pre-line">
            {anime.review}
          </p>
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => {
              onEdit(anime);
              onClose();
            }}
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="rounded-full border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
          >
            Hapus
          </button>
          <button
            onClick={onClose}
            className="ml-auto rounded-full border border-slate-200 px-3 py-1 text-sm text-slate-600 transition hover:bg-slate-50"
          >
            ✕
          </button>
        </div>

        <ConfirmModal
          isOpen={showConfirm}
          onClose={() => setShowConfirm(false)}
          message="Yakin ingin menghapus anime ini? Tindakan ini tidak dapat dibatalkan."
          confirmText="Hapus"
          onConfirm={async () => {
            const result = await deleteAnimeById(anime.id);
            if (result?.error) {
              addToast("Gagal menghapus anime.", "error");
            } else {
              addToast("Anime berhasil dihapus!", "success");
              onDeleted?.();
              setShowConfirm(false);
              onClose();
            }
          }}
        />
      </div>
    </div>
  );
};

export default AnimeModal;
