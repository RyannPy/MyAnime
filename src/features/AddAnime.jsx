/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/immutability */
import { useState, useEffect } from "react";
import { getGenres } from "../services/genreServices";
import { addAnimeGenres, uploadImage } from "../services/animeServices";
import ImageUpload from "../components/ImageUpload";

// CRUD
import {
  getAnimes,
  createAnime,
  updateAnime,
  deleteAnimeById,
  setAnimeGenres,
} from "../services/animeServices";

// AUTH
import { getCurrentUser } from "../services/authServices";

const AddAnime = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [list, setList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchGenres();
    fetchAnimes();
   
  }, []);

  // If parent passes prefill via window (Dashboard will set prefillAnime state and pass here via prop if wired),
  // this file also supports an external prefill through a global custom event.
  useEffect(() => {
    const handler = (e) => {
      const payload = e.detail;
      if (!payload) return;
      setEditId(payload.id);
      setTitle(payload.title || "");
      setRating(payload.rating?.toString() || "");
      setReview(payload.review || "");
      setSelectedGenres((payload.anime_genres || []).map((g) => Number(g.genre_id || g.genres?.id)).filter(Boolean));
      setExistingImageUrl(payload.image_url || null);
    };

    window.addEventListener("openEditAnime", handler);
    return () => window.removeEventListener("openEditAnime", handler);
  }, []);

  const fetchGenres = async () => {
    const { data, error } = await getGenres();
    if (error) {
      console.error(error);
      return;
    }
    setGenres(data || []);
  };

  const fetchAnimes = async () => {
    setLoading(true);
    setError("");

    const user = await getCurrentUser();
    if (!user) {
      setError("User tidak ditemukan.");
      setLoading(false);
      return;
    }

    const { data, error } = await getAnimes(user.id);
    if (error) {
      console.error(error);
      setError("Gagal memuat anime.");
      setLoading(false);
      return;
    }

    setList(data || []);
    setLoading(false);
  };

  const resetForm = () => {
    setTitle("");
    setRating("");
    setReview("");
    setSelectedGenres([]);
    setImage(null);
    setError("");
    setSuccess("");
    setEditId(null);
    setExistingImageUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const user = await getCurrentUser();
    if (!user) {
      setError("Silakan login terlebih dahulu.");
      return;
    }

    if (!title.trim() || !rating.trim() || !review.trim() || selectedGenres.length === 0) {
      setError("Semua field wajib diisi, termasuk genre.");
      return;
    }

    const ratingValue = parseFloat(rating);
    if (Number.isNaN(ratingValue) || ratingValue < 0 || ratingValue > 10) {
      setError("Rating harus antara 0 dan 10.");
      return;
    }

    let imageUrl = existingImageUrl || null;
    if (image && image instanceof File) {
      const { url, error: uploadError } = await uploadImage(image);
      if (uploadError) {
        setError("Gagal mengunggah gambar.");
        console.error(uploadError);
        return;
      }
      imageUrl = url;
    }

    // EDIT
    if (editId) {
      const { error } = await updateAnime(editId, {
        title: title.trim(),
        rating: ratingValue,
        review: review.trim(),
        image_url: imageUrl,
      });

      if (error) {
        setError(error.message || "Gagal menyimpan perubahan.");
        return;
      }

      await setAnimeGenres(editId, selectedGenres);

      setSuccess("Perubahan anime berhasil disimpan.");
      resetForm();
      fetchAnimes();
      // notify other components (Dashboard) to refresh
      window.dispatchEvent(new Event("animesChanged"));
      return;
    }

    // CREATE
    const { data, error: createError } = await createAnime({
      title: title.trim(),
      rating: ratingValue,
      review: review.trim(),
      image_url: imageUrl,
      user_id: user.id,
    });

    if (createError) {
      setError(createError.message || "Gagal menambahkan anime.");
      console.error(createError);
      return;
    }

    const animeId = data?.[0]?.id;
    if (animeId && selectedGenres.length > 0) {
      await setAnimeGenres(animeId, selectedGenres);
    }

    setSuccess("Anime berhasil ditambahkan!");
    resetForm();
    fetchAnimes();
    window.dispatchEvent(new Event("animesChanged"));
  };


  const editAnime = (item) => {
    setEditId(item.id);
    setTitle(item.title || "");
    setRating(item.rating?.toString() || "");
    setReview(item.review || "");
    setSelectedGenres((item.anime_genres || []).map((g) => Number(g.genre_id || g.genres?.id)).filter(Boolean));
    setExistingImageUrl(item.image_url || null);
    setError("");
    setSuccess("");
  };
  

  const deleteAnime = async (id) => {
    await deleteAnimeById(id);
    fetchAnimes();
  };

  return (
    <div className="space-y-8">
      <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-500/80">Tambah Anime</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">Form Tambah Anime</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Isi data anime dengan lengkap lalu tekan tombol tambah untuk menyimpan ke koleksi.
            </p>
          </div>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
            {selectedGenres.length} Genre dipilih
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <span className="text-sm font-medium text-slate-700">Judul Anime</span>
              <input
                type="text"
                className="mt-3 w-full bg-transparent text-slate-900 outline-none"
                placeholder="Contoh: Attack on Titan"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label className="block rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <span className="text-sm font-medium text-slate-700">Rating</span>
              <input
                type="number"
                step="0.1"
                min="0"
                max="10"
                className="mt-3 w-full bg-transparent text-slate-900 outline-none"
                placeholder="8.5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </label>
          </div>

          <label className="block rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
            <span className="text-sm font-medium text-slate-700">Review Singkat</span>
            <textarea
              className="mt-3 w-full bg-transparent text-slate-900 outline-none resize-none"
              rows="4"
              placeholder="Tulis review singkat tentang anime ini"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </label>

          <div className="grid gap-4 lg:grid-cols-2">
            <label className="block rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <span className="text-sm font-medium text-slate-700">Genre</span>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {genres.map((g) => (
                  <label key={g.id} className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-blue-300">
                    <input
                      type="checkbox"
                      value={g.id}
                      checked={selectedGenres.includes(Number(g.id))}
                      onChange={(e) => {
                        const value = Number(e.target.value);
                        setSelectedGenres((prev) =>
                          prev.includes(value) ? prev.filter((id) => id !== value) : [...prev, value],
                        );
                      }}
                      className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    {g.name}
                  </label>
                ))}
              </div>
            </label>

            <label className="block rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
              <span className="text-sm font-medium text-slate-700">Gambar Poster</span>
              <div className="mt-3">
                <ImageUpload file={image} onFileChange={setImage} existingUrl={existingImageUrl} />
              </div>
            </label>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="w-full rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
            >
              {editId ? "Simpan Perubahan" : "Tambah Anime"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="w-full rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-300 sm:w-auto"
              >
                Batal Edit
              </button>
            )}
          </div>

          {(error || success) && (
            <div className={`rounded-3xl border px-4 py-3 text-sm ${error ? "border-rose-200 bg-rose-50 text-rose-700" : "border-emerald-200 bg-emerald-50 text-emerald-700"}`}>
              {error || success}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddAnime;
