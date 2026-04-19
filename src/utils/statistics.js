


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


// GET TOP GENRES
export const getTopGenres = (animes, limit = 5) => {
    const count = {};

    animes.forEach((anime) => {
        (anime.anime_genres || []).forEach((g) => {
            const name = g.genres?.name;
            if (!name) return;

            count[name] = (count[name] || 0) + 1;
        });

    });

    const sorted = Object.entries(count)
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit);

    return sorted.map(([name, total]) => ({
        name,
        total,
    }));
};



// GET MONTHLY ANIME COUNT
export const getThisMonthAnimeCount = (animes) => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();


    return animes.filter((anime) => {
        const created = new Date(anime.created_at);
        return (
            created.getMonth() === currentMonth &&
            created.getFullYear() === currentYear
        );
    }).length
};

// GET MONTHLY ACTIVITY
export const getMonthlyActivity = (animes) => {
    const result = {};

    animes.forEach((anime) => {
        const date = new Date(anime.created_at);

        const month = date.toLocaleString("id-ID", {
            month: "short",
            year: "numeric",
        }); // Apr 2026

        result[month] = (result[month] || 0) + 1;
    });

    return Object.entries(result).map(([month, added]) => ({
        month,
        added,
    }));

};

export const getTotalAdded = (activity) => {
    return activity.reduce((sum, d) => sum + d.added, 0);
};

export const getBestMonth = (activity) => {
    if (!activity.length) return null;

    return activity.reduce((prev, curr) =>
        curr.added > prev.added ? curr : prev
    ).month;
};

export const getAvgPerMonth = (activity) => {
    if (!activity.length) return 0;

    const total = activity.reduce((sum, d) => sum + d.added, 0);
    return (total / activity.length).toFixed(1);
};


// RATING DISTRIBUTION
export const getRatingDistribution = (animes) => {
    const ranges = [
        { range: "1–4", min: 1, max: 4, count: 0 },
        { range: "4–5", min: 4, max: 5, count: 0 },
        { range: "5–6", min: 5, max: 6, count: 0 },
        { range: "6–7", min: 6, max: 7, count: 0 },
        { range: "7–8", min: 7, max: 8, count: 0 },
        { range: "8–9", min: 8, max: 9, count: 0 },
        { range: "9–10", min: 9, max: 10, count: 0 },
    ];

    animes.forEach((anime) => {
        const rating = anime.rating;
        if (rating == null) return;

        const bucket = ranges.find(
            (r) => rating >= r.min && rating <= r.max
        );

        if (bucket) bucket.count++;

        return ranges.map(({ range, count }) => ({ range, count }))
    })

}