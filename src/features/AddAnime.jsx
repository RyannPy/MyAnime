import { useState, useEffect } from "react";
import {
  getAnimes,
  createAnime,
  updateAnime,
  deleteAnimeById,
} from "../services/animeServices";

const AddAnime = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [list, setList] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editRating, setEditRating] = useState("");
  const [editReview, setEditReview] = useState("");

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

    const { data, error } = await getAnimes();

    if (error) {
      console.log(error);
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

    const { error } = await createAnime({
      title,
      rating: parseFloat(rating),
      review
    })

    if (error) {
      console.log(error);
    }

    setTitle("");
    setRating("");
    setReview("");
    setError("");

    fetchAnimes();
  };

  const editAnime = (item) => {
    setEditId(item.id);
    setEditTitle(item.title);
    setEditRating(item.rating);
    setEditReview(item.review);
  };

  const saveEdit = async () => {
    const { error } = await updateAnime(editId, {
      title: editTitle,
      rating: parseFloat(editRating),
      review: editReview
    });

    if (error) {
      console.log(error);
      return;
    }

    setEditId(null);
    setEditTitle("");
    setEditRating("");
    setEditReview("");

    fetchAnimes();
  };

  const deleteAnime = async (id) => {
    await deleteAnimeById(id);
    fetchAnimes();
  };

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
            {editId === item.id ? (
              <>
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  type="number"
                  value={editRating}
                  onChange={(e) => setEditRating(e.target.value)}
                />
                <input
                  value={editReview}
                  onChange={(e) => setEditReview(e.target.value)}
                />
                <button onClick={() => setEditId(null)}>Cancel</button>
                <button onClick={() => saveEdit()}>Save</button>
              </>
            ) : (
              <>
                <span>{item.title}</span>
                <span>{item.rating}</span>
                <span>{item.review}</span>
                <button onClick={() => editAnime(item)}>Edit</button>
                <button onClick={() => deleteAnime(item.id)}>Hapus</button>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AddAnime;
