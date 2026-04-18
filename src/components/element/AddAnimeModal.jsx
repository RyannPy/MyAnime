import AddAnime from "../../features/AddAnime";

const AddAnimeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-4 sm:p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-rose-100 hover:text-rose-600 focus:outline-none"
        >
          ✕
        </button>
        <AddAnime onClose={onClose} />      </div>
    </div>
  );
};

export default AddAnimeModal;
