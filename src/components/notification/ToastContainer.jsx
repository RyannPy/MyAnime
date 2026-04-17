import Toast from "./Toast";

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-3">
      {toasts.map((t) => (
        <Toast
          key={t.id}
          message={t.message}
          type={t.type}
          onClose={() => removeToast(t.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
