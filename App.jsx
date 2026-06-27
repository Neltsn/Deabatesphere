import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qkxooyyfyxmclsbgings.supabase.co";
const SUPABASE_KEY = "sb_publishable_Ig9i45PI9-OtRgXWli7SbQ_q-ZKfQpe";
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const load = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};
const save = (key, val) => localStorage.setItem(key, JSON.stringify(val));

const TYPE_META = {
  ARGUMENT:        { label: "Argument",        color: "#4ade80", bg: "#052e16", border: "#166534" },
  CONTRE_ARGUMENT: { label: "Contre-argument", color: "#f87171", bg: "#2d0a0a", border: "#7f1d1d" },
  QUESTION:        { label: "Question",        color: "#facc15", bg: "#1c1600", border: "#854d0e" },
};

const timeAgo = (ts) => {
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}min`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}j`;
};

function TypeBadge({ type }) {
  const m = TYPE_META[type];
  return (
    <span style={{
      fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
      padding: "2px 8px", borderRadius: 4,
      color: m.color, background: m.bg, border: `1px solid ${m.border}`,
      textTransform: "uppercase", fontFamily: "monospace",
    }}>{m.label}</span>
  );
}

function MessageCard({ msg, depth = 0, onReply, currentUser }) {
  const m = TYPE_META[msg.type];
  const isNested = depth > 0;
  return (
    <div style={{
      marginLeft: isNested ? 32 : 0,
      borderLeft: isNested ? `2px solid ${m.border}` : "none",
      paddingLeft: isNested ? 16 : 0,
      marginTop: 12,
    }}>
      <div style={{
        background: "#111", border: `1px solid #222`,
        borderRadius: 10, padding: "14px 16px", transition: "border-color 0.2s",
      }}
        onMouseEnter={e => e.currentTarget.style.borderColor = m.border}
        onMouseLeave={e => e.currentTarget.style.borderColor = "#222"}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <TypeBadge type={msg.type} />
          <span style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 13 }}>{msg.username}</span>
          <span style={{ color: "#475569", fontSize: 12, marginLeft: "auto" }}>{timeAgo(msg.created_at)}</span>
        </div>
        <p style={{ color: "#cbd5e1", fontSize: 15, lineHeight: 1.65, margin: 0 }}>{msg.content}</p>
        {currentUser && (
          <button onClick={() => onReply(msg)} style={{
            marginTop: 10, background: "none", border: "none",
            color: "#475569", fontSize: 12, cursor: "pointer", padding: 0,
          }}>↩ Répondre</button>
        )}
      </div>
    </div>
  );
}

function MessageTree({ messages, parentId = null, depth = 0, onReply, currentUser }) {
  const children = messages.filter(m => m.parent_id === parentId);
  if (!children.length) return null;
  return (
    <>
      {children.map(msg => (
        <div key={msg.id}>
          <MessageCard msg={msg} depth={depth} onReply={onReply} currentUser={currentUser} />
          <MessageTree messages={messages} parentId={msg.id} depth={depth + 1} onReply={onReply} currentUser={currentUser} />
        </div>
      ))}
    </>
  );
}

function ComposeForm({ onSubmit, replyTo, onCancelReply, loading }) {
  const [content, setContent] = useState("");
  const [type, setType] = useState("ARGUMENT");
  const textRef = useRef();

  useEffect(() => { if (replyTo) textRef.current?.focus(); }, [replyTo]);

  const handleSubmit = () => {
    if (!content.trim() || loading) return;
    onSubmit(content.trim(), type);
    setContent("");
  };

  return (
    <div style={{ background: "#0d1117", border: "1px solid #1e293b", borderRadius: 12, padding: 20, marginTop: 24 }}>
      {replyTo && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "#1a1a2e", borderRadius: 8, padding: "8px 14px",
          marginBottom: 12, fontSize: 13, color: "#64748b",
        }}>
          <span>↩ Répondre à <strong style={{ color: "#94a3b8" }}>{replyTo.username}</strong> : « {replyTo.content.slice(0, 60)}{replyTo.content.length > 60 ? "…" : ""} »</span>
          <button onClick={onCancelReply} style={{ background: "none", border: "none", color: "#475569", cursor: "pointer", fontSize: 16 }}>✕</button>
        </div>
      )}
      <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        {Object.entries(TYPE_META).map(([key, m]) => (
          <button key={key} onClick={() => setType(key)} style={{
            padding: "6px 14px", borderRadius: 6, fontSize: 12, fontWeight: 700,
            letterSpacing: "0.06em", cursor: "pointer", fontFamily: "monospace",
            background: type === key ? m.bg : "transparent",
            border: `1px solid ${type === key ? m.border : "#1e293b"}`,
            color: type === key ? m.color : "#475569",
          }}>{m.label}</button>
        ))}
      </div>
      <textarea
        ref={textRef}
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Développez votre point de vue..."
        rows={4}
        style={{
          width: "100%", background: "#111", border: "1px solid #1e293b",
          borderRadius: 8, padding: "12px 14px", color: "#e2e8f0",
          fontSize: 14, lineHeight: 1.6, resize: "vertical", outline: "none",
          fontFamily: "Georgia, serif", boxSizing: "border-box",
        }}
        onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit(); }}
      />
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}>
        <button onClick={handleSubmit} disabled={!content.trim() || loading} style={{
          padding: "10px 22px", borderRadius: 8, fontWeight: 700, fontSize: 13,
          cursor: content.trim() && !loading ? "pointer" : "not-allowed",
          background: content.trim() && !loading ? "#1d4ed8" : "#1e293b",
          color: content.trim() && !loading ? "#fff" : "#475569",
          border: "none",
        }}>
          {loading ? "Envoi…" : "Publier ⌘↵"}
        </button>
      </div>
    </div>
  );
}

function RoomPage({ room, currentUser, onBack }) {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [replyTo, setReplyTo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages").select("*")
        .eq("room_id", room.id)
        .order("created_at", { ascending: true });
      if (data) setMessages(data);
      setFetching(false);
    };
    fetchMessages();

    const channel = supabase.channel(`room-${room.id}`)
      .on("postgres_changes", {
        event: "INSERT", schema: "public", table: "messages",
        filter: `room_id=eq.${room.id}`,
      }, payload => setMessages(prev => [...prev, payload.new]))
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [room.id]);

  const handlePost = async (content, type) => {
    if (!currentUser) return;
    setLoading(true);
    await supabase.from("messages").insert({
      room_id: room.id, username: currentUser,
      content, type, parent_id: replyTo?.id ?? null,
    });
    setReplyTo(null);
    setLoading(false);
  };

  const filtered = filter === "ALL" ? messages : messages.filter(m => m.type === filter);
  const rootMsgs = filtered.filter(m => !m.parent_id);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <button onClick={onBack} style={{
          background: "none", border: "1px solid #1e293b", borderRadius: 6,
          color: "#64748b", padding: "6px 14px", fontSize: 13, cursor: "pointer", marginBottom: 20,
        }}>← Salles</button>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#f1f5f9", marginBottom: 8, fontFamily: "Georgia, serif", lineHeight: 1.3 }}>
          {room.title}
        </h1>
        {room.description && <p style={{ color: "#64748b", fontSize: 14 }}>{room.description}</p>}
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {[["ALL","Tous"],["ARGUMENT","Arguments"],["CONTRE_ARGUMENT","Contre-arguments"],["QUESTION","Questions"]].map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)} style={{
            padding: "6px 14px", borderRadius: 6, fontSize: 12, cursor: "pointer",
            fontWeight: filter === key ? 700 : 400,
            background: filter === key ? "#1e293b" : "transparent",
            border: `1px solid ${filter === key ? "#334155" : "#1e293b"}`,
            color: filter === key ? "#e2e8f0" : "#475569",
          }}>{label}</button>
        ))}
        <span style={{ marginLeft: "auto", color: "#334155", fontSize: 12, alignSelf: "center" }}>
          {messages.length} message{messages.length !== 1 ? "s" : ""}
        </span>
      </div>

      {fetching ? (
        <div style={{ textAlign: "center", color: "#334155", padding: "48px 0" }}>Chargement…</div>
      ) : rootMsgs.length === 0 ? (
        <div style={{ textAlign: "center", color: "#334155", padding: "48px 0", fontSize: 14 }}>
          Aucun message. Lancez le débat !
        </div>
      ) : (
        rootMsgs.map(msg => (
          <div key={msg.id}>
            <MessageCard msg={msg} depth={0} onReply={setReplyTo} currentUser={currentUser} />
            {filter === "ALL" && <MessageTree messages={messages} parentId={msg.id} depth={1} onReply={setReplyTo} currentUser={currentUser} />}
          </div>
        ))
      )}

      {currentUser ? (
        <ComposeForm onSubmit={handlePost} replyTo={replyTo} onCancelReply={() => setReplyTo(null)} loading={loading} />
      ) : (
        <div style={{ marginTop: 24, textAlign: "center", color: "#475569", fontSize: 14, padding: 20, border: "1px dashed #1e293b", borderRadius: 10 }}>
          Connectez-vous pour participer au débat
        </div>
      )}
    </div>
  );
}

function HomePage({ currentUser, onEnter }) {
  const [rooms, setRooms] = useState([]);
  const [msgCounts, setMsgCounts] = useState({});
  const [creating, setCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: r } = await supabase.from("rooms").select("*").order("created_at", { ascending: false });
      const { data: m } = await supabase.from("messages").select("id, room_id");
      if (r) setRooms(r);
      if (m) {
        const counts = {};
        m.forEach(msg => { counts[msg.room_id] = (counts[msg.room_id] || 0) + 1; });
        setMsgCounts(counts);
      }
      setFetching(false);
    };
    fetchData();
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) return;
    const { data } = await supabase.from("rooms").insert({ title: title.trim(), description: desc.trim() }).select().single();
    if (data) { setRooms(prev => [data, ...prev]); onEnter(data); }
    setTitle(""); setDesc(""); setCreating(false);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: "#f1f5f9", fontFamily: "Georgia, serif" }}>Salles de débat</h1>
          <p style={{ color: "#475569", fontSize: 14, marginTop: 4 }}>{rooms.length} salle{rooms.length !== 1 ? "s" : ""}</p>
        </div>
        {currentUser && (
          <button onClick={() => setCreating(!creating)} style={{
            padding: "10px 20px", background: "#1d4ed8", border: "none",
            borderRadius: 8, color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
          }}>+ Créer une salle</button>
        )}
      </div>

      {creating && (
        <div style={{ background: "#0d1117", border: "1px solid #1e293b", borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h3 style={{ color: "#e2e8f0", fontWeight: 700, marginBottom: 16, fontSize: 16 }}>Nouvelle salle</h3>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Sujet du débat…" autoFocus
            style={{ width: "100%", background: "#111", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 14px", color: "#e2e8f0", fontSize: 14, marginBottom: 10, outline: "none", boxSizing: "border-box" }}
            onKeyDown={e => e.key === "Enter" && handleCreate()}
          />
          <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="Description optionnelle…"
            style={{ width: "100%", background: "#111", border: "1px solid #1e293b", borderRadius: 8, padding: "10px 14px", color: "#e2e8f0", fontSize: 14, marginBottom: 14, outline: "none", boxSizing: "border-box" }}
          />
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button onClick={() => setCreating(false)} style={{ padding: "8px 16px", background: "none", border: "1px solid #1e293b", borderRadius: 6, color: "#475569", cursor: "pointer", fontSize: 13 }}>Annuler</button>
            <button onClick={handleCreate} disabled={!title.trim()} style={{ padding: "8px 16px", background: title.trim() ? "#1d4ed8" : "#1e293b", border: "none", borderRadius: 6, color: title.trim() ? "#fff" : "#475569", cursor: title.trim() ? "pointer" : "not-allowed", fontWeight: 700, fontSize: 13 }}>Créer</button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {fetching ? (
          <div style={{ textAlign: "center", color: "#334155", padding: "64px 0" }}>Chargement…</div>
        ) : rooms.length === 0 ? (
          <div style={{ textAlign: "center", color: "#334155", padding: "64px 0", fontSize: 15 }}>Aucune salle. Créez la première !</div>
        ) : rooms.map(room => {
          const count = msgCounts[room.id] || 0;
          return (
            <div key={room.id} onClick={() => onEnter(room)} style={{
              background: "#0d1117", border: "1px solid #1e293b", borderRadius: 12,
              padding: "18px 20px", cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#334155"; e.currentTarget.style.background = "#111"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e293b"; e.currentTarget.style.background = "#0d1117"; }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <h2 style={{ color: "#f1f5f9", fontSize: 17, fontWeight: 700, margin: 0, fontFamily: "Georgia, serif", flex: 1, paddingRight: 16 }}>
                  {room.title}
                </h2>
                <span style={{ fontSize: 11, color: "#334155", whiteSpace: "nowrap" }}>{timeAgo(room.created_at)}</span>
              </div>
              {room.description && <p style={{ color: "#475569", fontSize: 13, margin: "6px 0 0" }}>{room.description}</p>}
              <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 12, color: "#334155" }}>💬 {count} message{count !== 1 ? "s" : ""}</span>
                <span style={{ fontSize: 12, color: "#1d4ed8", fontWeight: 600 }}>Rejoindre →</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LoginOverlay({ onLogin }) {
  const [name, setName] = useState("");
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
      display: "flex", alignItems: "center", justifyContent: "center",
      backdropFilter: "blur(8px)", zIndex: 100,
    }}>
      <div style={{
        background: "#0d1117", border: "1px solid #1e293b", borderRadius: 16,
        padding: "40px 36px", width: "90%", maxWidth: 380, textAlign: "center",
      }}>
        <div style={{ fontSize: 32, marginBottom: 12 }}>⚡</div>
        <h2 style={{ color: "#f1f5f9", fontSize: 22, fontWeight: 800, fontFamily: "Georgia, serif", marginBottom: 6 }}>
          Debate Rooms
        </h2>
        <p style={{ color: "#475569", fontSize: 14, marginBottom: 28 }}>Choisissez un pseudonyme pour participer</p>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Votre pseudonyme…" autoFocus
          style={{
            width: "100%", background: "#111", border: "1px solid #1e293b",
            borderRadius: 8, padding: "12px 16px", color: "#e2e8f0",
            fontSize: 15, marginBottom: 14, outline: "none", boxSizing: "border-box", textAlign: "center",
          }}
          onKeyDown={e => e.key === "Enter" && name.trim() && onLogin(name.trim())}
        />
        <button onClick={() => name.trim() && onLogin(name.trim())} disabled={!name.trim()} style={{
          width: "100%", padding: "12px", background: name.trim() ? "#1d4ed8" : "#1e293b",
          border: "none", borderRadius: 8, color: name.trim() ? "#fff" : "#475569",
          fontWeight: 700, fontSize: 15, cursor: name.trim() ? "pointer" : "not-allowed",
        }}>Entrer</button>
        <button onClick={() => onLogin(null)} style={{ marginTop: 12, background: "none", border: "none", color: "#334155", fontSize: 12, cursor: "pointer" }}>
          Continuer en observateur
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => load("dr_user", null));
  const [currentRoom, setCurrentRoom] = useState(null);
  const [showLogin, setShowLogin] = useState(!load("dr_user", null));

  useEffect(() => { save("dr_user", currentUser); }, [currentUser]);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080c12; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0d1117; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 3px; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#080c12", color: "#e2e8f0", fontFamily: "Georgia, serif", display: "flex", flexDirection: "column" }}>
        {/* Topbar */}
        <div style={{
          borderBottom: "1px solid #0f172a", padding: "14px 0",
          background: "rgba(8,12,18,0.95)", backdropFilter: "blur(10px)",
          position: "sticky", top: 0, zIndex: 50,
        }}>
          <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span onClick={() => setCurrentRoom(null)} style={{
              fontWeight: 800, fontSize: 17, color: "#f1f5f9", cursor: "pointer",
            }}>⚡ Debate Rooms</span>
            {currentUser ? (
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 13, color: "#475569" }}>
                  connecté comme <strong style={{ color: "#94a3b8" }}>{currentUser}</strong>
                </span>
                <button onClick={() => { setCurrentUser(null); setShowLogin(true); }} style={{
                  background: "none", border: "1px solid #1e293b", borderRadius: 6,
                  color: "#475569", padding: "4px 10px", fontSize: 11, cursor: "pointer",
                }}>Changer</button>
              </div>
            ) : (
              <button onClick={() => setShowLogin(true)} style={{
                padding: "6px 14px", background: "#1d4ed8", border: "none",
                borderRadius: 6, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer",
              }}>Se connecter</button>
            )}
          </div>
        </div>

        {/* Main */}
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 20px 40px", flex: 1, width: "100%" }}>
          {currentRoom ? (
            <RoomPage room={currentRoom} currentUser={currentUser} onBack={() => setCurrentRoom(null)} />
          ) : (
            <HomePage currentUser={currentUser} onEnter={setCurrentRoom} />
          )}
        </div>

        {/* Footer */}
        <div style={{ borderTop: "1px solid #0f172a", padding: "18px 20px", textAlign: "center" }}>
          <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#334155", fontFamily: "monospace" }}>
            created by <span style={{ color: "#475569" }}>Nelveen Tastevin</span>
          </span>
        </div>
      </div>

      {showLogin && <LoginOverlay onLogin={name => { setCurrentUser(name); setShowLogin(false); }} />}
    </>
  );
}
