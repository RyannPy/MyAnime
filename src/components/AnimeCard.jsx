import GenreBadge from "./GenreBadge";

const AnimeCard = ({ anime, onClick }) => {
  const { title = "", rating = "", review = "", image_url = "", anime_genres = [] } = anime || {};
  const preview = review ? (review.length > 100 ? `${review.slice(0, 100)}...` : review) : "";

  return (
    <article onClick={() => onClick?.(anime)} className="group relative cursor-pointer overflow-hidden rounded-3xl shadow-sm transition-transform duration-200 hover:scale-[1.01]">
      <div className="h-56 w-full overflow-hidden bg-slate-100">
        <img src={image_url} alt={title} className="h-full w-full object-cover" />
      </div>

      <div className="absolute inset-0 flex items-end bg-linear-to-t from-black/40 to-transparent opacity-0 transition-opacity group-hover:opacity-100 hover:opacity-100">
        <div className="w-full p-4 text-white">
          <h3 className="text-sm font-semibold">{title}</h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/30 px-2 py-1 text-xs">
              ⭐ {rating}
            </span>
            <div className="flex gap-2">
              {anime_genres.slice(0, 3).map((g) => (
                <GenreBadge key={g.genres?.id || g.id}>{g.genres?.name || g.name}</GenreBadge>
              ))}
            </div>
          </div>
          <p className="mt-2 text-xs text-white/90 line-clamp-2">{preview}</p>
        </div>
      </div>
    </article>
  );
};

export default AnimeCard;
