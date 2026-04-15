import { useEffect, useState } from "react";

const ImageUpload = ({ file, onFileChange, existingUrl }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }

    // if no file but existingUrl provided, show it
    setPreview(existingUrl || null);
  }, [file, existingUrl]);

  return (
    <div>
      <div className="mt-3 flex items-center gap-3">
        <input
          type="file"
          accept="image/*"
          key={file ? file.name : "empty"}
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
          className="text-sm text-slate-700"
        />
        {file && <span className="text-sm text-slate-500">{file.name}</span>}
        {!file && existingUrl && <span className="text-sm text-slate-500">Existing image</span>}
      </div>

      {preview && (
        <div className="mt-3 w-full overflow-hidden rounded-lg border border-slate-200">
          <img src={preview} alt="preview" className="h-40 w-full object-cover" />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
