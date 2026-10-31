import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import { apiClient, formatApiError } from "@/lib/api";
import { LOGO_URL } from "@/lib/site-data";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export default function AdminLoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const { data } = await apiClient.post("/auth/login", { email, password });
      localStorage.setItem("sb_token", data.access_token);
      localStorage.setItem("sb_user", JSON.stringify(data.user));
      toast.success("Signed in");
      nav("/admin");
    } catch (err) {
      const msg = formatApiError(err.response?.data?.detail) || "Login failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageMeta title="Admin Login | Shan Brothers" />
      <div className="min-h-screen bg-[#F7F7F4] flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center justify-center gap-3 mb-8">
            <img src={LOGO_URL} alt="Shan Brothers" className="h-28 w-28 object-contain" width="256" height="256" decoding="async" />
          </Link>
          <div className="bg-white p-10 border border-slate-200">
            <div className="flex items-center gap-3 mb-8">
              <Lock size={20} className="text-red-brand" />
              <span className="overline text-red-brand">Admin Portal</span>
            </div>
            <h1 className="font-heading font-black text-3xl text-navy tracking-tighter">
              Sign in
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              For internal use only. Manage candidate & employer submissions.
            </p>

            <form onSubmit={submit} data-testid="admin-login-form" className="mt-8 space-y-6">
              <label className="block">
                <span className="block text-xs font-bold text-navy uppercase tracking-widest mb-1">Email</span>
                <input
                  data-testid="admin-email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-brand"
                  placeholder="admin@shanbrothers.sg"
                />
              </label>
              <label className="block">
                <span className="block text-xs font-bold text-navy uppercase tracking-widest mb-1">Password</span>
                <input
                  data-testid="admin-password"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-brand"
                  placeholder="••••••••"
                />
              </label>
              {error && (
                <p data-testid="admin-login-error" className="text-sm text-red-brand bg-red-50 border-l-2 border-red-brand px-3 py-2">
                  {error}
                </p>
              )}
              <button
                type="submit"
                data-testid="admin-login-submit"
                disabled={loading}
                className="btn-primary w-full justify-center"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
          <Link to="/" className="block text-center mt-6 text-sm text-slate-600 hover:text-red-brand">
            ← Back to website
          </Link>
        </div>
        <style>{`
          .input-brand {
            width: 100%; border: none; border-bottom: 2px solid #E2E8F0;
            background: transparent; padding: 0.75rem 0; font-size: 1rem;
            color: #0B1F4D; outline: none; transition: border-color 0.2s;
          }
          .input-brand:focus { border-color: #C8102E; }
        `}</style>
      </div>
    </>
  );
}
