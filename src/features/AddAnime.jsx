import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";

const AddAnime = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [list, setList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //   USE EFFECT
  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchAnimes();
  }, []);

  //   FETCH
  const fetchAnimes = async () => {
    setLoading(true);

    const { data, error: dbError } = await supabase
      .from("animes")
      .select("*")
      .order("id", { ascending: false });

    if (dbError) {
      console.log(dbError);
      setLoading(false);
      return;
    }

    setList(data || []);
    setLoading(false);
  };
  // ADD

  const addAnime = async (e) => {
    e.preventDefault();

    if (title.trim() === "") {
      setError("Wajib isi sesuatu!");
      return;
    }

    const { error: dbError } = await supabase.from("animes").insert([
      {
        title,
        rating: parseFloat(rating),
        review,
      },
    ]);

    if (dbError) {
      console.log(dbError);
    }

    setTitle("");
    setRating("");
    setReview("");
    setError("");

    fetchAnimes();
  };

  const deleteAnime = async (id) => {
    await supabase
    .from("animes")
    .delete()
    .eq("id", id);


    fetchAnimes();
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Add Anime</h1>
      <form onSubmit={addAnime}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />
        <input
          type="text"
          placeholder="Review"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      {error && <p>{error}</p>}

      {loading ? (
        <p>Loading ...</p>
      ) : list.length === 0 ? (
        <p>Belum ada Anime</p>
      ) : (
        list.map((item) => (
          <div key={item.id}>
            <span>{item.title}</span>
            <span>{item.rating}</span>
            <span>{item.review}</span>
            <button onClick={() => deleteAnime(item.id)}>Hapus</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AddAnime;
