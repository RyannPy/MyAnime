import GenreBadge from "./GenreBadge";

const HistoryCard = ({ anime, onClick }) => {
  const {
    created_at = "",
    title = "",
    rating = "",
    review = "",
    image_url = "",
    anime_genres = [],
  } = anime || {};
  const preview = review
    ? review.length > 100
      ? `${review.slice(0, 100)}...`
      : review
    : "";

  return (
    <article onClick={() => onClick?.(anime)} className="flex w-full overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-200 hover:shadow-md cursor-pointer border border-slate-100 h-37.5 mt-1">
      {/* Thumbnail Kiri */}
      <div className="w-28 sm:w-36 shrink-0 bg-slate-100">
        <img
          src={image_url}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Konten Kanan */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <div className="flex justify-between items-start gap-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-800 line-clamp-1">
              {title}
            </h3>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700">
              ⭐ {rating}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            {anime_genres.map((g) => (
              <GenreBadge key={g.genres?.id}>
                {g.genres?.name || g.name}
              </GenreBadge>
            ))}
          </div>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-2">
            {preview}
          </p>
        </div>

        <div className="mt-1 flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-xs text-slate-400 font-medium">
            Di upload pada{" "}
            {new Date(created_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </article>
  );
};

export default HistoryCard;
