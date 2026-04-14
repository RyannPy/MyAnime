import { useState } from "react";
import { signIn, signUp } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [status, setStatus] = useState({ type: "", message: "" });

  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();

    let result;

    if (isLogin) {
      result = await signIn(email, password);
    } else {
      result = await signUp(email, password);
    }

    if (result?.error) {
      setStatus({ type: "error", message: result.error.message });
      return;
    }

    setStatus({ type: "success", message: isLogin ? "Login berhasil!" : "Cek email untuk verifikasi." });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-4xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-blue-500/80">MyAnime</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">{isLogin ? "Login" : "Register"}</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            {isLogin ? "Masuk untuk mengelola koleksi anime kamu." : "Buat akun untuk mulai menambah anime favorit."}
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleAuth}>
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              placeholder="Minimal 6 karakter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {status.message && (
          <p className={`mt-4 text-center text-sm ${status.type === "error" ? "text-rose-500" : "text-slate-600"}`}>
            {status.message}
          </p>
        )}

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setStatus({ type: "", message: "" });
            }}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            {isLogin ? "Belum punya akun? Register" : "Sudah punya akun? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
