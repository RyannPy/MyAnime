


// TOTAL ANIME
export const getTotalAnime = (animes) => {
    return animes.length;
}

// AVERAGE RATING
export const getAverageRating = (animes) => {
    if (animes.length === 0) return 0;

    const total = animes.reduce((sum, a) => sum + (a.rating || 0), 0);

    return (total / animes.length).toFixed(1);
}

// HIGHEST RATING
export const getTopRated = (animes) => {
    if (!animes.length) return null;

    return animes.reduce((prev, curr) =>
        (curr.rating || 0) > (prev.rating || 0) ? curr : prev
    );
};


// FAVORITE GENRE
export const getFavoriteGenre = (animes) => {
    const count = {};

    animes.forEach((anime) => {
        (anime.anime_genres || []).forEach((g) => {
            const name = g.genres?.name;
            if (!name) return;

            count[name] = (count[name] || 0) + 1;
        });

    });

    let max = 0
    let favorite = null

    for (const genre in count) {
        if (count[genre] > max) {
            max = count[genre]
            favorite = genre;
        }
    }

    return favorite;
};