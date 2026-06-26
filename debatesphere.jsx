import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState, useEffect, useRef } from "react";

// ─── TRADUCTIONS ──────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  fr: {
    appSubtitle: "Débat structuré • Analyse IA • Anti-bulle",
    createBtn: "+ Créer un débat",
    searchPlaceholder: "🔍 Rechercher un débat...",
    allCategories: "Tous",
    activeDebates: "Débats actifs",
    participants: "Participants",
    arguments: "Arguments",
    trending: "TENDANCE",
    polarization: "Polarisation",
    backBtn: "← Retour",
    argCount: "arguments",
    avgScore: "Score moyen",
    distribution: "RÉPARTITION",
    positions: "POSITIONS",
    aiQuality: "QUALITÉ IA",
    forA: "POUR A",
    forB: "POUR B",
    choosePosition: "Choisit ta position",
    argPlaceholder: "Ton argument (sois précis, logique et sourcé)...",
    sourcePlaceholder: "📎 Source (optionnelle)...",
    publishBtn: "Publier + Analyser",
    aiNote: "🤖 Ton argument sera automatiquement analysé par Claude",
    emptyDebate: "Débat vide",
    beFirst: "Sois le premier à argumenter !",
    verified: "Vérifié",
    uncertain: "Incertain",
    refuted: "Réfuté",
    analyzeBtn: "🔍 Analyser",
    analyzing: "⏳ Analyse IA...",
    seeAnalysis: "▼ Voir l'analyse IA",
    logic: "Logique",
    relevance: "Pertinence",
    sources: "Sources",
    strengths: "Forces",
    weaknesses: "Faiblesses",
    suggestion: "Suggestion",
    createTitle: "Créer un débat",
    debateSubject: "Sujet du débat",
    positionALabel: "Position A (Pour)",
    positionBLabel: "Position B (Contre)",
    category: "Catégorie",
    launchBtn: "⚖️ Lancer le débat",
    subjectPlaceholder: "Ex : L'énergie nucléaire est-elle une solution verte ?",
    posAPlaceholder: "Ex : Solution climatique indispensable",
    posBPlaceholder: "Ex : Risque inacceptable",
    createdBy: "Créé par Nelveen Tastevin",
    poweredBy: "Analyse IA propulsée par Claude (Anthropic)",
    votes: "votes",
    rep: "Rép.",
    noDebate: "Aucun débat trouvé",
    justNow: "à l'instant",
  },
  en: {
    appSubtitle: "Structured debate • AI analysis • Anti-bubble",
    createBtn: "+ Create a debate",
    searchPlaceholder: "🔍 Search a debate...",
    allCategories: "All",
    activeDebates: "Active debates",
    participants: "Participants",
    arguments: "Arguments",
    trending: "TRENDING",
    polarization: "Polarization",
    backBtn: "← Back",
    argCount: "arguments",
    avgScore: "Average score",
    distribution: "DISTRIBUTION",
    positions: "POSITIONS",
    aiQuality: "AI QUALITY",
    forA: "FOR A",
    forB: "FOR B",
    choosePosition: "Choose your position",
    argPlaceholder: "Your argument (be precise, logical and sourced)...",
    sourcePlaceholder: "📎 Source (optional)...",
    publishBtn: "Publish + Analyze",
    aiNote: "🤖 Your argument will be automatically analyzed by Claude",
    emptyDebate: "Empty debate",
    beFirst: "Be the first to argue!",
    verified: "Verified",
    uncertain: "Uncertain",
    refuted: "Refuted",
    analyzeBtn: "🔍 Analyze",
    analyzing: "⏳ AI Analysis...",
    seeAnalysis: "▼ See AI analysis",
    logic: "Logic",
    relevance: "Relevance",
    sources: "Sources",
    strengths: "Strengths",
    weaknesses: "Weaknesses",
    suggestion: "Suggestion",
    createTitle: "Create a debate",
    debateSubject: "Debate subject",
    positionALabel: "Position A (For)",
    positionBLabel: "Position B (Against)",
    category: "Category",
    launchBtn: "⚖️ Launch debate",
    subjectPlaceholder: "Ex: Is nuclear energy a green solution?",
    posAPlaceholder: "Ex: Indispensable climate solution",
    posBPlaceholder: "Ex: Unacceptable risk",
    createdBy: "Created by Nelveen Tastevin",
    poweredBy: "AI analysis powered by Claude (Anthropic)",
    votes: "votes",
    rep: "Rep.",
    noDebate: "No debate found",
    justNow: "just now",
  },
  es: {
    appSubtitle: "Debate estructurado • Análisis IA • Anti-burbuja",
    createBtn: "+ Crear un debate",
    searchPlaceholder: "🔍 Buscar un debate...",
    allCategories: "Todos",
    activeDebates: "Debates activos",
    participants: "Participantes",
    arguments: "Argumentos",
    trending: "TENDENCIA",
    polarization: "Polarización",
    backBtn: "← Volver",
    argCount: "argumentos",
    avgScore: "Puntuación media",
    distribution: "DISTRIBUCIÓN",
    positions: "POSICIONES",
    aiQuality: "CALIDAD IA",
    forA: "PARA A",
    forB: "PARA B",
    choosePosition: "Elige tu posición",
    argPlaceholder: "Tu argumento (sé preciso, lógico y con fuentes)...",
    sourcePlaceholder: "📎 Fuente (opcional)...",
    publishBtn: "Publicar + Analizar",
    aiNote: "🤖 Tu argumento será analizado automáticamente por Claude",
    emptyDebate: "Debate vacío",
    beFirst: "¡Sé el primero en argumentar!",
    verified: "Verificado",
    uncertain: "Incierto",
    refuted: "Refutado",
    analyzeBtn: "🔍 Analizar",
    analyzing: "⏳ Análisis IA...",
    seeAnalysis: "▼ Ver análisis IA",
    logic: "Lógica",
    relevance: "Relevancia",
    sources: "Fuentes",
    strengths: "Fortalezas",
    weaknesses: "Debilidades",
    suggestion: "Sugerencia",
    createTitle: "Crear un debate",
    debateSubject: "Tema del debate",
    positionALabel: "Posición A (A favor)",
    positionBLabel: "Posición B (En contra)",
    category: "Categoría",
    launchBtn: "⚖️ Lanzar debate",
    subjectPlaceholder: "Ej: ¿Es la energía nuclear una solución verde?",
    posAPlaceholder: "Ej: Solución climática indispensable",
    posBPlaceholder: "Ej: Riesgo inaceptable",
    createdBy: "Creado por Nelveen Tastevin",
    poweredBy: "Análisis IA impulsado por Claude (Anthropic)",
    votes: "votos",
    rep: "Rep.",
    noDebate: "No se encontró ningún debate",
    justNow: "ahora mismo",
  },
  ar: {
    appSubtitle: "نقاش منظم • تحليل ذكاء اصطناعي • مكافحة الفقاعة",
    createBtn: "+ إنشاء نقاش",
    searchPlaceholder: "🔍 البحث عن نقاش...",
    allCategories: "الكل",
    activeDebates: "النقاشات النشطة",
    participants: "المشاركون",
    arguments: "الحجج",
    trending: "رائج",
    polarization: "الاستقطاب",
    backBtn: "→ رجوع",
    argCount: "حجج",
    avgScore: "متوسط النقاط",
    distribution: "التوزيع",
    positions: "المواقف",
    aiQuality: "جودة الذكاء الاصطناعي",
    forA: "لصالح أ",
    forB: "لصالح ب",
    choosePosition: "اختر موقفك",
    argPlaceholder: "حجتك (كن دقيقاً ومنطقياً ومستنداً إلى مصادر)...",
    sourcePlaceholder: "📎 المصدر (اختياري)...",
    publishBtn: "نشر + تحليل",
    aiNote: "🤖 سيتم تحليل حجتك تلقائياً بواسطة Claude",
    emptyDebate: "نقاش فارغ",
    beFirst: "كن أول من يحتج!",
    verified: "موثق",
    uncertain: "غير مؤكد",
    refuted: "مدحوض",
    analyzeBtn: "🔍 تحليل",
    analyzing: "⏳ تحليل ذكاء اصطناعي...",
    seeAnalysis: "▼ عرض تحليل الذكاء الاصطناعي",
    logic: "المنطق",
    relevance: "الصلة",
    sources: "المصادر",
    strengths: "نقاط القوة",
    weaknesses: "نقاط الضعف",
    suggestion: "اقتراح",
    createTitle: "إنشاء نقاش",
    debateSubject: "موضوع النقاش",
    positionALabel: "الموقف أ (مع)",
    positionBLabel: "الموقف ب (ضد)",
    category: "الفئة",
    launchBtn: "⚖️ إطلاق النقاش",
    subjectPlaceholder: "مثال: هل الطاقة النووية حل أخضر؟",
    posAPlaceholder: "مثال: حل مناخي لا غنى عنه",
    posBPlaceholder: "مثال: مخاطر غير مقبولة",
    createdBy: "أنشأه نيلفين تاستفان",
    poweredBy: "تحليل الذكاء الاصطناعي مدعوم بـ Claude (Anthropic)",
    votes: "أصوات",
    rep: "سمعة",
    noDebate: "لم يتم العثور على نقاش",
    justNow: "الآن",
  },
  zh: {
    appSubtitle: "结构化辩论 • AI分析 • 反信息茧房",
    createBtn: "+ 创建辩论",
    searchPlaceholder: "🔍 搜索辩论...",
    allCategories: "全部",
    activeDebates: "活跃辩论",
    participants: "参与者",
    arguments: "论点",
    trending: "热门",
    polarization: "极化度",
    backBtn: "← 返回",
    argCount: "论点",
    avgScore: "平均分",
    distribution: "分布",
    positions: "立场",
    aiQuality: "AI质量",
    forA: "支持A",
    forB: "支持B",
    choosePosition: "选择你的立场",
    argPlaceholder: "你的论点（请精确、逻辑清晰并引用来源）...",
    sourcePlaceholder: "📎 来源（可选）...",
    publishBtn: "发布 + 分析",
    aiNote: "🤖 你的论点将由Claude自动分析",
    emptyDebate: "空辩论",
    beFirst: "成为第一个提出论点的人！",
    verified: "已验证",
    uncertain: "不确定",
    refuted: "已反驳",
    analyzeBtn: "🔍 分析",
    analyzing: "⏳ AI分析中...",
    seeAnalysis: "▼ 查看AI分析",
    logic: "逻辑",
    relevance: "相关性",
    sources: "来源",
    strengths: "优势",
    weaknesses: "劣势",
    suggestion: "建议",
    createTitle: "创建辩论",
    debateSubject: "辩论主题",
    positionALabel: "立场A（支持）",
    positionBLabel: "立场B（反对）",
    category: "类别",
    launchBtn: "⚖️ 发起辩论",
    subjectPlaceholder: "例：核能是绿色解决方案吗？",
    posAPlaceholder: "例：不可或缺的气候解决方案",
    posBPlaceholder: "例：不可接受的风险",
    createdBy: "由 Nelveen Tastevin 创建",
    poweredBy: "AI分析由Claude (Anthropic)驱动",
    votes: "票",
    rep: "声誉",
    noDebate: "未找到辩论",
    justNow: "刚刚",
  }
};

const LANG_FLAGS = { fr: "🇫🇷", en: "🇬🇧", es: "🇪🇸", ar: "🇸🇦", zh: "🇨🇳" };
const LANG_NAMES = { fr: "Français", en: "English", es: "Español", ar: "العربية", zh: "中文" };

// ─── DONNÉES INITIALES ────────────────────────────────────────────────────────
const INITIAL_DEBATES = [
  {
    id: 1, title: "Intelligence Artificielle : Progrès ou Danger ?",
    category: "Science & Tech", positionA: "Progrès indispensable", positionB: "Danger existentiel",
    participants: 2847, ratioA: 58, polarization: 74, trending: true,
    arguments: [
      { id: 1, position: "A", user: "NeuroBrain42", avatar: "N", rep: 94,
        content: "L'IA diagnostique des cancers avec 97% de précision vs 89% pour les radiologues humains. Des milliers de vies sauvées chaque année.",
        source: "Nature Medicine, 2023", votes: 234, verif: "verified", score: 88, timestamp: "il y a 2h" },
      { id: 2, position: "B", user: "CriticalMind", avatar: "C", rep: 87,
        content: "OpenAI, DeepMind et des centaines de chercheurs ont signé une lettre appelant à un moratoire. Quand les créateurs eux-mêmes ont peur, c'est un signal fort.",
        source: "Open Letter on AI Risk, 2023", votes: 198, verif: "verified", score: 82, timestamp: "il y a 3h" },
    ]
  },
  {
    id: 2, title: "Capitalisme vs Socialisme",
    category: "Politique", positionA: "Le capitalisme libère", positionB: "Le socialisme protège",
    participants: 5124, ratioA: 44, polarization: 92, trending: true,
    arguments: [
      { id: 5, position: "A", user: "LibertéÉco", avatar: "L", rep: 78,
        content: "La Corée du Sud vs Corée du Nord : même peuple, 70 ans d'écart. Le PIB/hab sud-coréen est 25x supérieur. La différence ? Le système économique.",
        source: "World Bank Data, 2023", votes: 412, verif: "verified", score: 87, timestamp: "il y a 1h" },
      { id: 6, position: "B", user: "SolidaritéNow", avatar: "S", rep: 85,
        content: "Les pays nordiques combinent économie de marché et protection sociale forte. Résultat : #1 mondial du bonheur, inégalités faibles.",
        source: "World Happiness Report, 2023", votes: 389, verif: "verified", score: 89, timestamp: "il y a 2h" },
    ]
  },
  {
    id: 3, title: "Énergie nucléaire : Solution verte ou risque majeur ?",
    category: "Environnement", positionA: "Solution climatique", positionB: "Risque inacceptable",
    participants: 1893, ratioA: 61, polarization: 68, trending: false, arguments: []
  },
  {
    id: 4, title: "Peine de mort : Pour ou Contre ?",
    category: "Éthique", positionA: "Justice absolue", positionB: "Droit inviolable à la vie",
    participants: 3201, ratioA: 31, polarization: 88, trending: false, arguments: []
  },
  {
    id: 5, title: "Libre arbitre vs Déterminisme",
    category: "Philosophie", positionA: "Nous sommes libres", positionB: "Tout est déterminé",
    participants: 1104, ratioA: 52, polarization: 55, trending: false, arguments: []
  }
];

const CATEGORY_COLORS = {
  "Science & Tech": "#3B82F6", "Politique": "#8B5CF6",
  "Environnement": "#10B981", "Éthique": "#F59E0B", "Philosophie": "#EC4899"
};

async function analyzeArgument(content, position, debateTitle, positionLabel, lang) {
  const langMap = { fr: "français", en: "English", es: "español", ar: "العربية", zh: "中文" };
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-6", max_tokens: 1000,
      messages: [{ role: "user", content: `Analyze this argument in the context of a debate. Reply in ${langMap[lang] || "English"}.
Debate: "${debateTitle}" | Position: "${positionLabel}" | Argument: "${content}"
Reply ONLY in valid JSON (no markdown):
{"score":<0-100>,"logique":<0-100>,"pertinence":<0-100>,"sources":<0-100>,"verif":"<verified|uncertain|false>","verdict":"<1 line>","forces":["<strength>"],"faiblesses":["<weakness>"],"suggestion":"<tip>"}` }]
    })
  });
  const data = await response.json();
  return JSON.parse(data.content[0].text.replace(/```json|```/g, "").trim());
}

// ─── COMPOSANTS ───────────────────────────────────────────────────────────────
function PolarizationBar({ value, t }) {
  const color = value > 80 ? "#EF4444" : value > 60 ? "#F59E0B" : "#10B981";
  return (
    <div style={{ marginTop: 4 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#6B7280", marginBottom: 3 }}>
        <span>{t.polarization}</span><span style={{ color, fontWeight: 700 }}>{value}%</span>
      </div>
      <div style={{ height: 3, background: "#1F2937", borderRadius: 2, overflow: "hidden" }}>
        <div style={{ width: `${value}%`, height: "100%", background: color, borderRadius: 2 }} />
      </div>
    </div>
  );
}

function VerifBadge({ status, t }) {
  const cfg = {
    verified: { icon: "✓", label: t.verified, bg: "#064E3B", color: "#34D399" },
    uncertain: { icon: "⚠", label: t.uncertain, bg: "#451A03", color: "#FBBF24" },
    false: { icon: "✗", label: t.refuted, bg: "#450A0A", color: "#F87171" }
  };
  const c = cfg[status] || cfg.uncertain;
  return <span style={{ padding: "2px 7px", borderRadius: 4, background: c.bg, color: c.color, fontSize: 10, fontWeight: 700 }}>{c.icon} {c.label}</span>;
}

function ScoreRing({ score, size = 44 }) {
  const r = (size - 6) / 2, circ = 2 * Math.PI * r, dash = (score / 100) * circ;
  const color = score >= 80 ? "#34D399" : score >= 60 ? "#FBBF24" : "#F87171";
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#1F2937" strokeWidth={3} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={3} strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color }}>{score}</div>
    </div>
  );
}

function ArgumentCard({ arg, isNew, onAnalyze, t }) {
  const isA = arg.position === "A";
  const accent = isA ? "#3B82F6" : "#F59E0B";
  const [expanded, setExpanded] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const handleAnalyze = async () => { setAnalyzing(true); await onAnalyze(arg.id); setAnalyzing(false); setExpanded(true); };
  return (
    <div style={{ background: "#111318", border: `1px solid ${isNew ? accent : "#1F2937"}`, borderLeft: `3px solid ${accent}`, borderRadius: 8, padding: "12px 14px", marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: `${accent}22`, border: `2px solid ${accent}`, display: "flex", alignItems: "center", justifyContent: "center", color: accent, fontWeight: 800, fontSize: 13, flexShrink: 0 }}>{arg.avatar}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
            <span style={{ color: "#F9FAFB", fontWeight: 700, fontSize: 13 }}>{arg.user}</span>
            <span style={{ color: "#6B7280", fontSize: 11 }}>{t.rep} {arg.rep}</span>
            <VerifBadge status={arg.verif} t={t} />
            <span style={{ color: "#4B5563", fontSize: 11, marginLeft: "auto" }}>{arg.timestamp}</span>
          </div>
          <p style={{ color: "#D1D5DB", fontSize: 13, lineHeight: 1.6, margin: "0 0 8px" }}>{arg.content}</p>
          {arg.source && <div style={{ fontSize: 11, color: "#6B7280", fontStyle: "italic", marginBottom: 8 }}>📎 {arg.source}</div>}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <ScoreRing score={arg.score} size={38} />
            <span style={{ fontSize: 12, color: "#6B7280" }}>▲ {arg.votes} {t.votes}</span>
            <button onClick={handleAnalyze} disabled={analyzing} style={{ marginLeft: "auto", padding: "4px 10px", borderRadius: 6, border: `1px solid ${accent}44`, background: `${accent}11`, color: accent, fontSize: 11, cursor: "pointer", fontWeight: 600, opacity: analyzing ? 0.6 : 1 }}>
              {analyzing ? t.analyzing : t.analyzeBtn}
            </button>
          </div>
          {arg.analysis && expanded && (
            <div style={{ marginTop: 10, padding: 12, background: "#0D0D0F", border: "1px solid #1F2937", borderRadius: 8 }}>
              <div style={{ display: "flex", gap: 16, marginBottom: 8, flexWrap: "wrap" }}>
                {[[t.logic, arg.analysis.logique, "#3B82F6"], [t.relevance, arg.analysis.pertinence, "#8B5CF6"], [t.sources, arg.analysis.sources, "#10B981"]].map(([label, val, clr]) => (
                  <div key={label} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: "#6B7280", marginBottom: 3 }}>{label}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, color: clr }}>{val}</div>
                  </div>
                ))}
              </div>
              <p style={{ color: "#9CA3AF", fontSize: 12, margin: "0 0 6px", fontStyle: "italic" }}>"{arg.analysis.verdict}"</p>
              {arg.analysis.forces?.map((f, i) => <div key={i} style={{ fontSize: 11, color: "#34D399" }}>✓ {f}</div>)}
              {arg.analysis.faiblesses?.map((f, i) => <div key={i} style={{ fontSize: 11, color: "#F87171" }}>✗ {f}</div>)}
              {arg.analysis.suggestion && <div style={{ fontSize: 11, color: "#FBBF24", marginTop: 4 }}>💡 {arg.analysis.suggestion}</div>}
            </div>
          )}
          {arg.analysis && !expanded && <button onClick={() => setExpanded(true)} style={{ marginTop: 8, background: "none", border: "none", color: "#6B7280", fontSize: 11, cursor: "pointer" }}>{t.seeAnalysis}</button>}
        </div>
      </div>
    </div>
  );
}

function DebateCard({ debate, onClick, t }) {
  const catColor = CATEGORY_COLORS[debate.category] || "#6B7280";
  return (
    <div onClick={onClick} style={{ background: "#111318", border: "1px solid #1F2937", borderRadius: 12, padding: "16px 18px", cursor: "pointer", transition: "all 0.2s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "#374151"; e.currentTarget.style.transform = "translateY(-1px)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "#1F2937"; e.currentTarget.style.transform = "none"; }}>
      {debate.trending && <div style={{ fontSize: 10, color: "#F59E0B", fontWeight: 700, marginBottom: 6 }}>🔥 {t.trending}</div>}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: catColor, background: `${catColor}18`, padding: "2px 8px", borderRadius: 4 }}>{debate.category}</span>
        <span style={{ fontSize: 11, color: "#4B5563" }}>👥 {debate.participants.toLocaleString()}</span>
      </div>
      <h3 style={{ color: "#F9FAFB", fontSize: 15, fontWeight: 700, margin: "0 0 12px", lineHeight: 1.4 }}>{debate.title}</h3>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10 }}>
        <span style={{ fontSize: 11, color: "#3B82F6", background: "#1E3A5F22", padding: "2px 8px", borderRadius: 4, flex: 1, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{debate.positionA}</span>
        <span style={{ color: "#4B5563", fontSize: 12 }}>VS</span>
        <span style={{ fontSize: 11, color: "#F59E0B", background: "#78350F22", padding: "2px 8px", borderRadius: 4, flex: 1, textAlign: "center", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{debate.positionB}</span>
      </div>
      <div style={{ height: 6, borderRadius: 3, background: "#1F2937", overflow: "hidden" }}>
        <div style={{ width: `${debate.ratioA}%`, height: "100%", background: "linear-gradient(90deg, #3B82F6, #6366F1)", borderRadius: 3 }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "#6B7280", marginTop: 4 }}>
        <span style={{ color: "#3B82F6" }}>{debate.ratioA}% A</span>
        <span style={{ color: "#F59E0B" }}>{100 - debate.ratioA}% B</span>
      </div>
      <PolarizationBar value={debate.polarization} t={t} />
    </div>
  );
}

function DebateRoom({ debate, onBack, t, lang }) {
  const [args, setArgs] = useState(debate.arguments);
  const [position, setPosition] = useState("A");
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [newArgId, setNewArgId] = useState(null);
  const chatRef = useRef(null);
  const argsA = args.filter(a => a.position === "A");
  const argsB = args.filter(a => a.position === "B");
  const avgScore = args.length ? Math.round(args.reduce((s, a) => s + a.score, 0) / args.length) : 0;

  useEffect(() => { if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; }, [args]);

  const handleAnalyze = async (argId) => {
    const arg = args.find(a => a.id === argId);
    if (!arg || arg.analysis) return;
    try {
      const posLabel = arg.position === "A" ? debate.positionA : debate.positionB;
      const result = await analyzeArgument(arg.content, arg.position, debate.title, posLabel, lang);
      setArgs(prev => prev.map(a => a.id === argId ? { ...a, analysis: result, score: result.score, verif: result.verif } : a));
    } catch (e) { console.error(e); }
  };

  const handleSubmit = async () => {
    if (!content.trim() || submitting) return;
    setSubmitting(true);
    const newArg = { id: Date.now(), position, user: "Vous", avatar: "V", rep: 50, content: content.trim(), source: source.trim() || null, votes: 0, verif: "uncertain", score: 50, timestamp: t.justNow, analysis: null };
    setArgs(prev => [...prev, newArg]);
    setNewArgId(newArg.id);
    setContent(""); setSource("");
    try {
      const posLabel = position === "A" ? debate.positionA : debate.positionB;
      const result = await analyzeArgument(newArg.content, position, debate.title, posLabel, lang);
      setArgs(prev => prev.map(a => a.id === newArg.id ? { ...a, analysis: result, score: result.score, verif: result.verif } : a));
    } catch (e) { console.error(e); }
    setSubmitting(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#0D0D0F" }}>
      <div style={{ borderBottom: "1px solid #1F2937", padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, background: "#0D0D0F", flexShrink: 0 }}>
        <button onClick={onBack} style={{ background: "none", border: "1px solid #374151", color: "#9CA3AF", padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontSize: 12 }}>{t.backBtn}</button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ color: "#F9FAFB", margin: 0, fontSize: 15, fontWeight: 800, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{debate.title}</h2>
          <div style={{ display: "flex", gap: 16, marginTop: 4, fontSize: 11, color: "#6B7280" }}>
            <span>👥 {debate.participants.toLocaleString()}</span>
            <span>💬 {args.length} {t.argCount}</span>
            <span>⚡ {t.avgScore}: <span style={{ color: "#FBBF24", fontWeight: 700 }}>{avgScore}</span></span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        <div style={{ width: 200, borderRight: "1px solid #1F2937", padding: 16, overflowY: "auto", flexShrink: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>{t.distribution}</div>
            <div style={{ height: 8, borderRadius: 4, background: "#1F2937", overflow: "hidden", marginBottom: 6 }}>
              <div style={{ width: `${argsA.length / Math.max(args.length, 1) * 100}%`, height: "100%", background: "linear-gradient(90deg, #3B82F6, #6366F1)" }} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>{t.positions}</div>
            {[["A", debate.positionA, argsA.length, "#3B82F6", t.forA], ["B", debate.positionB, argsB.length, "#F59E0B", t.forB]].map(([pos, label, count, color, forLabel]) => (
              <div key={pos} style={{ background: "#0D1117", borderRadius: 8, padding: 10, border: "1px solid #1F2937", marginBottom: 8 }}>
                <div style={{ fontSize: 10, color, fontWeight: 700, marginBottom: 4 }}>{forLabel}</div>
                <div style={{ color: "#9CA3AF", fontSize: 11, lineHeight: 1.4 }}>{label}</div>
                <div style={{ fontSize: 18, color, fontWeight: 800, marginTop: 6 }}>{count}</div>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#6B7280", fontWeight: 700, marginBottom: 8, letterSpacing: 1 }}>{t.aiQuality}</div>
            <ScoreRing score={avgScore} size={56} />
          </div>
        </div>
        <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
          {args.length === 0 && (
            <div style={{ textAlign: "center", color: "#4B5563", padding: 40 }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>⚖️</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: "#6B7280" }}>{t.emptyDebate}</div>
              <div style={{ fontSize: 13 }}>{t.beFirst}</div>
            </div>
          )}
          {args.map(arg => <ArgumentCard key={arg.id} arg={arg} isNew={arg.id === newArgId} onAnalyze={handleAnalyze} t={t} />)}
        </div>
      </div>
      <div style={{ borderTop: "1px solid #1F2937", padding: "14px 20px", background: "#0D0D0F", flexShrink: 0 }}>
        <div style={{ fontSize: 11, color: "#6B7280", marginBottom: 8 }}>{t.choosePosition}</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          {[["A", debate.positionA, "#1D4ED8", "#1E3A5F", "#3B82F6"], ["B", debate.positionB, "#D97706", "#451A03", "#F59E0B"]].map(([pos, label, bg, bgLight, color]) => (
            <button key={pos} onClick={() => setPosition(pos)} style={{ flex: 1, padding: "8px 0", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, background: position === pos ? bgLight : "#1F2937", color: position === pos ? color : "#6B7280", boxShadow: position === pos ? `0 0 0 1px ${color}` : "none" }}>⬤ {label}</button>
          ))}
        </div>
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder={t.argPlaceholder}
          style={{ width: "100%", background: "#111318", border: "1px solid #374151", borderRadius: 8, color: "#F9FAFB", padding: "10px 12px", fontSize: 13, resize: "vertical", minHeight: 70, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
        <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center" }}>
          <input value={source} onChange={e => setSource(e.target.value)} placeholder={t.sourcePlaceholder}
            style={{ flex: 1, background: "#111318", border: "1px solid #374151", borderRadius: 8, color: "#9CA3AF", padding: "8px 12px", fontSize: 12, outline: "none", fontFamily: "inherit" }} />
          <button onClick={handleSubmit} disabled={!content.trim() || submitting} style={{ padding: "8px 18px", borderRadius: 8, border: "none", cursor: "pointer", background: position === "A" ? "#1D4ED8" : "#D97706", color: "#fff", fontWeight: 700, fontSize: 13, opacity: !content.trim() || submitting ? 0.5 : 1 }}>
            {submitting ? "⏳" : t.publishBtn}
          </button>
        </div>
        <div style={{ fontSize: 10, color: "#4B5563", marginTop: 6 }}>{t.aiNote}</div>
      </div>
    </div>
  );
}

function CreateDebate({ onBack, onCreate, t }) {
  const [form, setForm] = useState({ title: "", category: "Politique", positionA: "", positionB: "" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div style={{ maxWidth: 560, margin: "0 auto", padding: 24 }}>
      <button onClick={onBack} style={{ background: "none", border: "1px solid #374151", color: "#9CA3AF", padding: "6px 12px", borderRadius: 6, cursor: "pointer", fontSize: 12, marginBottom: 24 }}>{t.backBtn}</button>
      <h2 style={{ color: "#F9FAFB", fontWeight: 800, fontSize: 22, marginBottom: 24 }}>{t.createTitle}</h2>
      {[[t.debateSubject, "title", t.subjectPlaceholder], [t.positionALabel, "positionA", t.posAPlaceholder], [t.positionBLabel, "positionB", t.posBPlaceholder]].map(([label, key, ph]) => (
        <div key={key} style={{ marginBottom: 16 }}>
          <label style={{ display: "block", color: "#9CA3AF", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{label}</label>
          <input value={form[key]} onChange={e => set(key, e.target.value)} placeholder={ph}
            style={{ width: "100%", background: "#111318", border: "1px solid #374151", borderRadius: 8, color: "#F9FAFB", padding: "10px 14px", fontSize: 13, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} />
        </div>
      ))}
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: "block", color: "#9CA3AF", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{t.category}</label>
        <select value={form.category} onChange={e => set("category", e.target.value)}
          style={{ width: "100%", background: "#111318", border: "1px solid #374151", borderRadius: 8, color: "#F9FAFB", padding: "10px 14px", fontSize: 13, outline: "none", fontFamily: "inherit" }}>
          {Object.keys(CATEGORY_COLORS).map(c => <option key={c}>{c}</option>)}
        </select>
      </div>
      <button onClick={() => form.title && form.positionA && form.positionB && onCreate({ ...form, id: Date.now(), participants: 1, ratioA: 50, polarization: 0, trending: false, arguments: [] })}
        disabled={!form.title || !form.positionA || !form.positionB}
        style={{ width: "100%", padding: "12px 0", borderRadius: 10, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", color: "#fff", fontWeight: 800, fontSize: 15, opacity: (!form.title || !form.positionA || !form.positionB) ? 0.5 : 1 }}>
        {t.launchBtn}
      </button>
    </div>
  );
}

// ─── APP PRINCIPALE ───────────────────────────────────────────────────────────
export default function DebateSphere() {
  const [view, setView] = useState("home");
  const [debates, setDebates] = useState(INITIAL_DEBATES);
  const [activeDebate, setActiveDebate] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("Tous");
  const [lang, setLang] = useState("fr");
  const [showLangMenu, setShowLangMenu] = useState(false);

  const t = TRANSLATIONS[lang];
  const filtered = debates.filter(d => (filterCat === t.allCategories || filterCat === "Tous" || d.category === filterCat) && d.title.toLowerCase().includes(search.toLowerCase()));

  const openDebate = (d) => { setActiveDebate(d); setView("debate"); };
  const createDebate = (d) => { setDebates(prev => [d, ...prev]); setActiveDebate(d); setView("debate"); };

  if (view === "debate" && activeDebate) return <DebateRoom debate={activeDebate} onBack={() => setView("home")} t={t} lang={lang} />;
  if (view === "create") return <CreateDebate onBack={() => setView("home")} onCreate={createDebate} t={t} />;

  return (
    <div style={{ minHeight: "100vh", background: "#0D0D0F", color: "#F9FAFB", fontFamily: "'Inter', system-ui, sans-serif" }}>
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0D0D0F; } ::-webkit-scrollbar-thumb { background: #374151; border-radius: 3px; } textarea, input, select { color-scheme: dark; }`}</style>

      {/* Header */}
      <div style={{ borderBottom: "1px solid #1F2937", padding: "14px 24px", display: "flex", alignItems: "center", gap: 16, position: "sticky", top: 0, background: "#0D0D0F", zIndex: 10 }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 20, background: "linear-gradient(135deg, #3B82F6, #8B5CF6, #F59E0B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>⚖ DebateSphere</div>
          <div style={{ fontSize: 10, color: "#4B5563", marginTop: 1 }}>{t.appSubtitle}</div>
        </div>
        <div style={{ flex: 1 }} />

        {/* Sélecteur de langue */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setShowLangMenu(!showLangMenu)} style={{ background: "#111318", border: "1px solid #374151", color: "#F9FAFB", padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
            {LANG_FLAGS[lang]} {LANG_NAMES[lang]} ▾
          </button>
          {showLangMenu && (
            <div style={{ position: "absolute", right: 0, top: "110%", background: "#111318", border: "1px solid #374151", borderRadius: 8, overflow: "hidden", zIndex: 100, minWidth: 140 }}>
              {Object.entries(LANG_FLAGS).map(([code, flag]) => (
                <button key={code} onClick={() => { setLang(code); setShowLangMenu(false); }} style={{ display: "block", width: "100%", padding: "8px 14px", background: lang === code ? "#1F2937" : "none", border: "none", color: "#F9FAFB", cursor: "pointer", fontSize: 13, textAlign: "left" }}>
                  {flag} {LANG_NAMES[code]}
                </button>
              ))}
            </div>
          )}
        </div>

        <button onClick={() => setView("create")} style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #3B82F6, #8B5CF6)", color: "#fff", fontWeight: 700, fontSize: 13 }}>
          {t.createBtn}
        </button>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "24px 20px" }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder={t.searchPlaceholder}
          style={{ width: "100%", background: "#111318", border: "1px solid #374151", borderRadius: 10, color: "#F9FAFB", padding: "12px 16px", fontSize: 14, outline: "none", fontFamily: "inherit", marginBottom: 16 }} />

        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {[t.allCategories, ...Object.keys(CATEGORY_COLORS)].map(cat => (
            <button key={cat} onClick={() => setFilterCat(cat)} style={{ padding: "5px 12px", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, background: filterCat === cat ? (CATEGORY_COLORS[cat] || "#3B82F6") : "#1F2937", color: filterCat === cat ? "#fff" : "#9CA3AF" }}>{cat}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28 }}>
          {[[t.activeDebates, debates.length, "⚖️"], [t.participants, debates.reduce((s, d) => s + d.participants, 0).toLocaleString(), "👥"], [t.arguments, debates.reduce((s, d) => s + d.arguments.length, 0), "💬"]].map(([label, val, icon]) => (
            <div key={label} style={{ background: "#111318", border: "1px solid #1F2937", borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
              <div style={{ fontSize: 20 }}>{icon}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: "#F9FAFB", margin: "4px 0 2px" }}>{val}</div>
              <div style={{ fontSize: 11, color: "#6B7280" }}>{label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {filtered.map(d => <DebateCard key={d.id} debate={d} onClick={() => openDebate(d)} t={t} />)}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: 48, color: "#4B5563" }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
            <div>{t.noDebate}</div>
          </div>
        )}

        {/* Signature */}
        <div style={{ textAlign: "center", marginTop: 40, paddingTop: 24, borderTop: "1px solid #1F2937" }}>
          <div style={{ fontSize: 13, fontWeight: 700, background: "linear-gradient(135deg, #3B82F6, #8B5CF6, #F59E0B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 4 }}>
            {t.createdBy}
          </div>
          <div style={{ fontSize: 11, color: "#374151" }}>{t.poweredBy}</div>
        </div>
      </div>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<DebateSphere />);
