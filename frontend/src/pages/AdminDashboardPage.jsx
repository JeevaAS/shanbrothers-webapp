import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageMeta from "@/components/PageMeta";
import { apiClient, formatApiError } from "@/lib/api";
import { LOGO_URL } from "@/lib/site-data";
import { toast } from "sonner";
import {
  LogOut, Users, Building2, MessageSquare, Trash2, RefreshCcw, ArrowUpRight,
} from "lucide-react";

export default function AdminDashboardPage() {
  const nav = useNavigate();
  const [tab, setTab] = useState("candidates");
  const [stats, setStats] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("sb_user") || "null");

  const logout = () => {
    localStorage.removeItem("sb_token");
    localStorage.removeItem("sb_user");
    nav("/admin/login");
  };

  const load = async () => {
    setLoading(true);
    try {
      const [s, c, e, m] = await Promise.all([
        apiClient.get("/admin/stats"),
        apiClient.get("/admin/candidates"),
        apiClient.get("/admin/employers"),
        apiClient.get("/admin/contacts"),
      ]);
      setStats(s.data);
      setCandidates(c.data);
      setEmployers(e.data);
      setContacts(m.data);
    } catch (err) {
      if (err.response?.status === 401) {
        logout();
        toast.error("Session expired. Please sign in again.");
      } else {
        toast.error(formatApiError(err.response?.data?.detail));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("sb_token")) {
      nav("/admin/login");
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateStatus = async (kind, id, status) => {
    try {
      await apiClient.patch(`/admin/${kind}/${id}`, { status });
      toast.success("Updated");
      load();
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail));
    }
  };

  const remove = async (kind, id) => {
    if (!window.confirm("Delete this record permanently?")) return;
    try {
      await apiClient.delete(`/admin/${kind}/${id}`);
      toast.success("Deleted");
      load();
    } catch (err) {
      toast.error(formatApiError(err.response?.data?.detail));
    }
  };

  const exportCSV = (rows, filename) => {
    if (!rows.length) return toast.info("Nothing to export");
    const keys = Object.keys(rows[0]);
    const csv = [
      keys.join(","),
      ...rows.map((r) => keys.map((k) => JSON.stringify(r[k] ?? "")).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageMeta title="Admin Dashboard | Shan Brothers" />
      <div className="min-h-screen bg-[#F7F7F4] flex">
        {/* Sidebar */}
        <aside data-testid="admin-sidebar" className="hidden lg:flex flex-col w-72 bg-navy text-white p-8 sticky top-0 h-screen">
          <Link to="/" className="flex items-center gap-3 mb-10">
            <img src={LOGO_URL} alt="Shan Brothers" className="h-12 w-12 object-contain bg-white p-1" />
            <div className="leading-tight">
              <p className="font-heading font-black text-sm">SHAN BROTHERS</p>
              <p className="overline text-red-brand text-[0.55rem]">Admin</p>
            </div>
          </Link>

          <nav className="flex flex-col gap-1 flex-1">
            {[
              { id: "candidates", label: "Candidates", icon: Users, count: stats?.candidates?.new },
              { id: "employers", label: "Employers", icon: Building2, count: stats?.employers?.new },
              { id: "contacts", label: "Messages", icon: MessageSquare, count: stats?.contacts?.new },
            ].map((t) => (
              <button
                key={t.id}
                data-testid={`sidebar-${t.id}`}
                onClick={() => setTab(t.id)}
                className={`flex items-center justify-between px-4 py-3 text-sm font-semibold transition ${
                  tab === t.id ? "bg-red-brand text-white" : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="flex items-center gap-3">
                  <t.icon size={18} /> {t.label}
                </span>
                {t.count > 0 && (
                  <span className={`text-xs font-bold px-2 py-0.5 ${tab === t.id ? "bg-white text-red-brand" : "bg-red-brand text-white"}`}>
                    {t.count}
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/10 space-y-3">
            <div className="text-xs text-white/60">
              <p className="font-semibold text-white">{user?.name || "Admin"}</p>
              <p className="truncate">{user?.email}</p>
            </div>
            <button
              data-testid="admin-logout"
              onClick={logout}
              className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-red-brand transition"
            >
              <LogOut size={16} /> Sign out
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          {/* Mobile top bar */}
          <div className="lg:hidden bg-navy text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="Shan Brothers" className="h-10 w-10 object-contain bg-white p-1" />
              <p className="font-heading font-bold">Admin</p>
            </div>
            <button data-testid="admin-logout-mobile" onClick={logout} className="text-sm font-semibold">
              <LogOut size={18} />
            </button>
          </div>

          <div className="p-6 lg:p-12 max-w-7xl">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <span className="overline text-red-brand">Dashboard</span>
                <h1 className="mt-2 font-heading font-black text-3xl lg:text-5xl text-navy tracking-tighter">
                  Welcome back, {user?.name?.split(" ")[0] || "Admin"}.
                </h1>
              </div>
              <button
                data-testid="admin-refresh"
                onClick={load}
                className="btn-outline text-sm px-4 py-2 self-start"
              >
                <RefreshCcw size={14} /> Refresh
              </button>
            </header>

            {/* Stat cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-slate-200 border border-slate-200 mb-10">
              {[
                { label: "Candidate Applications", total: stats?.candidates?.total ?? 0, neu: stats?.candidates?.new ?? 0 },
                { label: "Employer Enquiries", total: stats?.employers?.total ?? 0, neu: stats?.employers?.new ?? 0 },
                { label: "Contact Messages", total: stats?.contacts?.total ?? 0, neu: stats?.contacts?.new ?? 0 },
              ].map((s) => (
                <div key={s.label} className="bg-white p-8">
                  <p className="overline text-red-brand">{s.label}</p>
                  <p className="mt-4 font-heading font-black text-5xl text-navy tracking-tighter">{s.total}</p>
                  <p className="mt-2 text-sm text-slate-500">
                    <span className="text-red-brand font-bold">{s.neu}</span> new · unactioned
                  </p>
                </div>
              ))}
            </div>

            {/* Mobile tab switcher */}
            <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto">
              {["candidates", "employers", "contacts"].map((t) => (
                <button
                  key={t}
                  data-testid={`tab-${t}-mobile`}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 text-sm font-semibold whitespace-nowrap ${tab === t ? "bg-navy text-white" : "bg-white text-navy border border-slate-200"}`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            {tab === "candidates" && (
              <CandidatesTable
                rows={candidates}
                loading={loading}
                onStatus={(id, s) => updateStatus("candidates", id, s)}
                onDelete={(id) => remove("candidates", id)}
                onExport={() => exportCSV(candidates, "candidates.csv")}
              />
            )}
            {tab === "employers" && (
              <EmployersTable
                rows={employers}
                loading={loading}
                onStatus={(id, s) => updateStatus("employers", id, s)}
                onDelete={(id) => remove("employers", id)}
                onExport={() => exportCSV(employers, "employers.csv")}
              />
            )}
            {tab === "contacts" && (
              <ContactsTable
                rows={contacts}
                loading={loading}
                onStatus={(id, s) => updateStatus("contacts", id, s)}
                onDelete={(id) => remove("contacts", id)}
                onExport={() => exportCSV(contacts, "messages.csv")}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}

function StatusBadge({ status }) {
  const map = {
    new: "bg-red-brand text-white",
    contacted: "bg-navy text-white",
    shortlisted: "bg-emerald-600 text-white",
    in_progress: "bg-amber-500 text-white",
    closed: "bg-slate-400 text-white",
    read: "bg-navy text-white",
    responded: "bg-emerald-600 text-white",
  };
  return (
    <span className={`text-[0.65rem] uppercase tracking-wider font-bold px-2 py-1 ${map[status] || "bg-slate-300 text-navy"}`}>
      {status.replace("_", " ")}
    </span>
  );
}

function TableShell({ title, count, onExport, children }) {
  return (
    <div className="bg-white border border-slate-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-5 border-b border-slate-200 gap-3">
        <h2 className="font-heading font-bold text-xl text-navy tracking-tight">
          {title} <span className="text-slate-400 text-sm">({count})</span>
        </h2>
        <button data-testid="export-csv" onClick={onExport} className="text-sm font-semibold text-navy hover:text-red-brand flex items-center gap-2">
          <ArrowUpRight size={16} /> Export CSV
        </button>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

function CandidatesTable({ rows, loading, onStatus, onDelete, onExport }) {
  return (
    <TableShell title="Candidate Applications" count={rows.length} onExport={onExport}>
      <table data-testid="candidates-table" className="w-full text-sm">
        <thead className="bg-[#F7F7F4] text-navy text-xs uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Trade</th>
            <th className="px-4 py-3 text-left">Country</th>
            <th className="px-4 py-3 text-left">Exp</th>
            <th className="px-4 py-3 text-left">Contact</th>
            <th className="px-4 py-3 text-left">Received</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {loading && <tr><td colSpan={8} className="px-4 py-8 text-center text-slate-500">Loading...</td></tr>}
          {!loading && rows.length === 0 && (
            <tr><td colSpan={8} className="px-4 py-8 text-center text-slate-500">No applications yet.</td></tr>
          )}
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50">
              <td className="px-4 py-3 font-semibold text-navy">
                {r.full_name}
                {r.passport_available && <span className="ml-2 text-[0.6rem] text-emerald-600 font-bold">PASSPORT</span>}
              </td>
              <td className="px-4 py-3 text-slate-700">{r.trade}</td>
              <td className="px-4 py-3 text-slate-700">{r.country}</td>
              <td className="px-4 py-3 text-slate-700">{r.experience_years}y</td>
              <td className="px-4 py-3 text-slate-700">
                <div>{r.email}</div><div className="text-slate-500">{r.phone}</div>
              </td>
              <td className="px-4 py-3 text-slate-500 text-xs">{new Date(r.created_at).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <select
                  data-testid={`candidate-status-${r.id}`}
                  value={r.status}
                  onChange={(e) => onStatus(r.id, e.target.value)}
                  className="text-xs border border-slate-200 px-2 py-1"
                >
                  {["new", "contacted", "shortlisted", "closed"].map((s) => <option key={s}>{s}</option>)}
                </select>
                <div className="mt-1"><StatusBadge status={r.status} /></div>
              </td>
              <td className="px-4 py-3">
                <button data-testid={`delete-candidate-${r.id}`} onClick={() => onDelete(r.id)} className="text-slate-400 hover:text-red-brand">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableShell>
  );
}

function EmployersTable({ rows, loading, onStatus, onDelete, onExport }) {
  return (
    <TableShell title="Employer Enquiries" count={rows.length} onExport={onExport}>
      <table data-testid="employers-table" className="w-full text-sm">
        <thead className="bg-[#F7F7F4] text-navy text-xs uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3 text-left">Company</th>
            <th className="px-4 py-3 text-left">Contact</th>
            <th className="px-4 py-3 text-left">Trade</th>
            <th className="px-4 py-3 text-left">Workers</th>
            <th className="px-4 py-3 text-left">Timeline</th>
            <th className="px-4 py-3 text-left">Received</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {loading && <tr><td colSpan={8} className="px-4 py-8 text-center text-slate-500">Loading...</td></tr>}
          {!loading && rows.length === 0 && (
            <tr><td colSpan={8} className="px-4 py-8 text-center text-slate-500">No employer enquiries yet.</td></tr>
          )}
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50">
              <td className="px-4 py-3 font-semibold text-navy">{r.company_name}</td>
              <td className="px-4 py-3 text-slate-700">
                <div>{r.contact_person}</div>
                <div className="text-slate-500">{r.email} · {r.phone}</div>
              </td>
              <td className="px-4 py-3 text-slate-700">{r.trade_needed}</td>
              <td className="px-4 py-3 font-bold text-red-brand">{r.workers_needed}</td>
              <td className="px-4 py-3 text-slate-700 text-xs">{r.deployment_timeline}</td>
              <td className="px-4 py-3 text-slate-500 text-xs">{new Date(r.created_at).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <select
                  data-testid={`employer-status-${r.id}`}
                  value={r.status}
                  onChange={(e) => onStatus(r.id, e.target.value)}
                  className="text-xs border border-slate-200 px-2 py-1"
                >
                  {["new", "contacted", "in_progress", "closed"].map((s) => <option key={s}>{s}</option>)}
                </select>
                <div className="mt-1"><StatusBadge status={r.status} /></div>
              </td>
              <td className="px-4 py-3">
                <button data-testid={`delete-employer-${r.id}`} onClick={() => onDelete(r.id)} className="text-slate-400 hover:text-red-brand">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableShell>
  );
}

function ContactsTable({ rows, loading, onStatus, onDelete, onExport }) {
  return (
    <TableShell title="Contact Messages" count={rows.length} onExport={onExport}>
      <table data-testid="contacts-table" className="w-full text-sm">
        <thead className="bg-[#F7F7F4] text-navy text-xs uppercase tracking-wider">
          <tr>
            <th className="px-4 py-3 text-left">From</th>
            <th className="px-4 py-3 text-left">Subject</th>
            <th className="px-4 py-3 text-left">Message</th>
            <th className="px-4 py-3 text-left">Received</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {loading && <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">Loading...</td></tr>}
          {!loading && rows.length === 0 && (
            <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">No messages yet.</td></tr>
          )}
          {rows.map((r) => (
            <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50 align-top">
              <td className="px-4 py-3 font-semibold text-navy">
                <div>{r.name}</div>
                <div className="text-slate-500 text-xs">{r.email}</div>
                {r.phone && <div className="text-slate-500 text-xs">{r.phone}</div>}
              </td>
              <td className="px-4 py-3 text-slate-700 font-semibold">{r.subject}</td>
              <td className="px-4 py-3 text-slate-600 max-w-md">
                <p className="line-clamp-3">{r.message}</p>
              </td>
              <td className="px-4 py-3 text-slate-500 text-xs">{new Date(r.created_at).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <select
                  data-testid={`contact-status-${r.id}`}
                  value={r.status}
                  onChange={(e) => onStatus(r.id, e.target.value)}
                  className="text-xs border border-slate-200 px-2 py-1"
                >
                  {["new", "read", "responded"].map((s) => <option key={s}>{s}</option>)}
                </select>
                <div className="mt-1"><StatusBadge status={r.status} /></div>
              </td>
              <td className="px-4 py-3">
                <button data-testid={`delete-contact-${r.id}`} onClick={() => onDelete(r.id)} className="text-slate-400 hover:text-red-brand">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableShell>
  );
}
