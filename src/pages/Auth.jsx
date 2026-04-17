import { useState } from "react";
import { signIn, signUp } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { useToast } from "../contexts/ToastContexts";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    let result;

    if (isLogin) {
      result = await signIn(email, password);
    } else {
      result = await signUp(email, password);
    }

    setLoading(false);

    if (result?.error) {
      addToast(result.error.message, "error");
      return;
    }

    addToast(isLogin ? "Login berhasil!" : "Cek email untuk verifikasi.", "success");
    if (isLogin) navigate("/dashboard");
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
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-70"
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            )}
            {loading ? "Memproses..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
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
