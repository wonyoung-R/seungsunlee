// Each "slide" is a self-contained page card with its own MiniNav.
// Used both in the grid overview and in the fullscreen focus mode.

const NAV_ITEMS = [
  { key: "home", label: "Home" },
  { key: "about", label: "About" },
  { key: "work", label: "Work" },
  { key: "projects", label: "Projects" },
  { key: "contact", label: "Contact" },
];

// Tiny eyebrow nav inside each card — visual repeat of the site nav,
// clickable to navigate between slides.
const MiniNav = ({ label, active, onGo, dense }) => {
  const fs = dense ? 8 : 9;
  return (
    <div style={{
      display: "flex", justifyContent: "space-between", alignItems: "baseline",
      padding: dense ? "16px 20px" : "22px 28px",
      fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
    }}>
      <div style={{
        fontSize: fs, letterSpacing: 2.2, color: "#1A1814",
        textTransform: "uppercase", fontWeight: 500,
      }}>{label}</div>
      <div style={{ display: "flex", gap: dense ? 14 : 22 }}>
        {NAV_ITEMS.map(n => (
          <button key={n.key}
            onClick={(e) => { e.stopPropagation(); onGo(n.key); }}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: 0,
              fontFamily: "inherit",
              fontSize: fs, letterSpacing: 1.8,
              color: active === n.key ? "#1A1814" : "#9A9486",
              fontWeight: active === n.key ? 500 : 400,
              textTransform: "uppercase",
            }}>{n.label}</button>
        ))}
      </div>
    </div>
  );
};

// Soft museum placeholder
const Photo = ({ tone = 1, label, ratio = "4/3", style }) => {
  // tone 0: very pale, 1: warm beige, 2: gallery white-on-white, 3: dark interior
  const bgs = [
    "linear-gradient(135deg, #F0EBDF 0%, #DDD3BF 100%)",
    "linear-gradient(160deg, #E8DFCC 0%, #C9BCA0 100%)",
    "linear-gradient(135deg, #F5F1E8 0%, #E2DCCC 100%)",
    "linear-gradient(160deg, #6B665C 0%, #3E3A33 100%)",
  ];
  return (
    <div style={{
      ...style,
      aspectRatio: ratio,
      background: bgs[tone] || bgs[0],
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        background: "repeating-linear-gradient(135deg, rgba(0,0,0,0.015) 0 1px, transparent 1px 14px)",
      }} />
      {label && (
        <div style={{
          position: "absolute", left: 16, bottom: 14,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 8,
          color: tone === 3 ? "#D8D2C2" : "#8A8275",
          letterSpacing: 1.5, textTransform: "uppercase",
        }}>{label}</div>
      )}
    </div>
  );
};

// ----- Hero -----
const SlideHome = ({ onGo, dense, focused }) => {
  const [bullet, setBullet] = React.useState(1);
  React.useEffect(() => {
    if (!focused) return;
    const id = setInterval(() => setBullet(b => (b % 3) + 1), 4200);
    return () => clearInterval(id);
  }, [focused]);
  const titleSize = focused ? "clamp(40px, 5vw, 80px)" : "clamp(20px, 2.6vw, 48px)";
  const bodySize = focused ? "clamp(13px, 1vw, 16px)" : "clamp(10px, 0.9vw, 13px)";
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#FAFAF7" }}>
      <MiniNav label="Your Name" active="home" onGo={onGo} dense={dense} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: 0 }}>
        <div style={{ position: "relative", overflow: "hidden" }}>
          <Photo tone={2} ratio="auto" style={{ position: "absolute", inset: 0, aspectRatio: "auto" }} label="GALLERY · 01" />
          {/* sculpture silhouette */}
          <div style={{
            position: "absolute", left: "12%", bottom: "8%",
            width: "26%", aspectRatio: "0.78",
            background: "radial-gradient(ellipse at 35% 30%, #C9BFA8, #8A7F66)",
            borderRadius: "48% 52% 50% 50% / 60% 60% 40% 40%",
            opacity: 0.92,
          }} />
          {/* canvas */}
          <div style={{
            position: "absolute", right: "20%", top: "18%",
            width: "22%", aspectRatio: "0.5",
            background: "linear-gradient(180deg, #E8E4D8 0%, #C2BCAB 100%)",
            border: "1px solid rgba(0,0,0,0.06)",
          }} />
        </div>
        <div style={{
          padding: focused ? "10vh 8vw 4vh 6vw" : "8% 8% 6% 7%",
          display: "flex", flexDirection: "column", justifyContent: "center", position: "relative",
        }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', 'Noto Serif KR', serif",
            fontWeight: 400, fontSize: titleSize,
            lineHeight: 1.08, letterSpacing: -0.5,
            color: "#1A1814", margin: 0,
          }}>
            Curating meaningful<br/>experiences.
          </h1>
          <p style={{
            margin: focused ? "32px 0 0" : "16px 0 0",
            fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
            fontSize: bodySize, lineHeight: 1.7, color: "#5A5448",
            maxWidth: "70%",
          }}>
            Through curation, interpretation,<br/>and conversations about art.
          </p>
          <div style={{
            position: "absolute", right: focused ? "8vw" : "8%", top: "50%",
            transform: "translateY(-50%)",
            display: "flex", flexDirection: "column", gap: focused ? 22 : 14,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: focused ? 12 : 9, color: "#9A9486", letterSpacing: 1,
          }}>
            {[1,2,3].map(n => (
              <div key={n} style={{ display: "flex", alignItems: "center", gap: 10, opacity: bullet === n ? 1 : 0.45, transition: "opacity 600ms ease" }}>
                <span style={{
                  width: focused ? 5 : 3, height: focused ? 5 : 3, borderRadius: "50%",
                  background: bullet === n ? "#1A1814" : "transparent",
                  border: bullet === n ? "none" : "1px solid #9A9486",
                  transition: "background 600ms ease",
                }} />
                <span>0{n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ----- About (이승선 — upgraded) -----
const SlideAbout = ({ onGo, dense, focused }) => {
  const titleSize = focused ? "clamp(28px, 2.6vw, 44px)" : "clamp(13px, 1.3vw, 22px)";
  const bodySize = focused ? "clamp(13px, 0.92vw, 16px)" : "clamp(9px, 0.78vw, 12px)";
  const labelSize = focused ? 10 : 7;
  const factSize = focused ? "clamp(12px, 0.85vw, 14px)" : "clamp(8px, 0.7vw, 11px)";
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#F5F2EB" }}>
      <MiniNav label="About" active="about" onGo={onGo} dense={dense} />
      <div style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: focused ? "0.85fr 1.1fr 0.7fr" : "0.85fr 1.1fr 0.7fr",
        gap: focused ? 56 : 18,
        padding: focused ? "5vh 7vw 4vh" : "3% 5% 3.5%",
        minHeight: 0,
      }}>
        {/* Column 1 — portrait + signature */}
        <div style={{ display: "flex", flexDirection: "column", gap: focused ? 18 : 6 }}>
          <Photo tone={2} ratio="3/4" style={{ width: "100%" }} label="PORTRAIT · 2024" />
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
            fontSize: focused ? "clamp(14px, 1vw, 17px)" : "clamp(9px, 0.78vw, 12px)",
            color: "#7A7466", lineHeight: 1.5,
          }}>
            “A docent is not a translator,<br/>but a companion in looking.”
          </div>
        </div>

        {/* Column 2 — name, title, bio */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: labelSize, letterSpacing: 2.5, color: "#9A9486",
            textTransform: "uppercase", marginBottom: focused ? 14 : 4,
          }}>
            Docent · Curator · Art Advisor
          </div>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', 'Noto Serif KR', serif",
            fontWeight: 400, fontSize: titleSize,
            lineHeight: 1.15, color: "#1A1814", margin: 0,
            letterSpacing: -0.3,
          }}>
            이승선<br/>
            <span style={{ fontStyle: "italic", color: "#5A5448" }}>Seungseon Lee</span>
          </h2>
          <div style={{
            width: focused ? 36 : 18, height: 1, background: "#1A1814",
            margin: focused ? "22px 0 22px" : "8px 0 8px",
          }} />
          <p style={{
            margin: 0,
            fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
            fontSize: bodySize, lineHeight: 1.8, color: "#3A3530",
          }}>
            한 점의 그림 앞에 오래 머무는 일을 가장 소중히 합니다. 정해진 해설을 전하기보다, 관람자의 시선과 침묵에 응답하는 도슨트로 활동합니다.
          </p>
          <p style={{
            margin: focused ? "14px 0 0" : "6px 0 0",
            fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
            fontSize: bodySize, lineHeight: 1.8, color: "#3A3530",
          }}>
            국립현대미술관, 서울시립미술관, 그리고 다수의 사립 갤러리에서 전시 해설과 큐레이션, 컬렉터 자문을 이어오고 있습니다.
          </p>
        </div>

        {/* Column 3 — facts / index */}
        <div style={{
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          gap: focused ? 16 : 4,
          fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
        }}>
          {[
            ["Based in", "Seoul, KR"],
            ["Active since", "2019"],
            ["Focus", "Modern · Contemporary"],
            ["Languages", "Korean · English"],
            ["Affiliations", "한국도슨트협회"],
          ].map(([k, v], i) => (
            <div key={i} style={{
              borderTop: "1px solid #D8D2C2",
              paddingTop: focused ? 10 : 3,
              display: "flex", flexDirection: "column",
              gap: focused ? 4 : 1,
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: labelSize, color: "#9A9486", letterSpacing: 1.5,
                textTransform: "uppercase",
              }}>{k}</div>
              <div style={{ fontSize: factSize, color: "#1A1814" }}>{v}</div>
            </div>
          ))}
          {focused && (
            <button
              onClick={(e) => { e.stopPropagation(); onGo("contact"); }}
              style={{
                marginTop: 14,
                background: "none", border: "1px solid #1A1814",
                padding: "10px 14px", cursor: "pointer",
                fontFamily: "'Inter', sans-serif",
                fontSize: 10, letterSpacing: 1.8, textTransform: "uppercase",
                color: "#1A1814", textAlign: "left",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
              <span>편지 쓰기</span><span>→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ----- Work overview (3 categories) -----
const SlideWork = ({ onGo, dense, focused }) => {
  const items = [
    { n: "01", t: "Curating", body: "Exhibition planning and curation that brings ideas to life.", tone: 0, label: "INSTALL" },
    { n: "02", t: "Docent", body: "Interpreting art and creating meaningful experiences.", tone: 2, label: "WALK · BY" },
    { n: "03", t: "Lecture", body: "Sharing knowledge and inspiration through lectures and talks.", tone: 1, label: "DESK" },
  ];
  const titleSize = focused ? "clamp(22px, 1.8vw, 32px)" : "clamp(11px, 1vw, 16px)";
  const bodySize = focused ? "clamp(13px, 0.95vw, 15px)" : "clamp(8px, 0.7vw, 11px)";
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#FAFAF7" }}>
      <MiniNav label="Work" active="work" onGo={onGo} dense={dense} />
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: focused ? 40 : 16, padding: focused ? "4vh 6vw" : "3% 5%", minHeight: 0 }}>
        {items.map(it => (
          <div key={it.n} style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: focused ? 11 : 8, color: "#9A9486", letterSpacing: 1.5, marginBottom: focused ? 14 : 6 }}>{it.n}</div>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', 'Noto Serif KR', serif",
              fontWeight: 400, fontSize: titleSize,
              color: "#1A1814", margin: 0,
            }}>{it.t}</h3>
            <Photo tone={it.tone} ratio="4/3" style={{ marginTop: focused ? 24 : 10 }} label={it.label} />
            <p style={{
              margin: focused ? "20px 0 0" : "8px 0 0",
              fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
              fontSize: bodySize, lineHeight: 1.65, color: "#5A5448",
            }}>{it.body}</p>
            {it.n === "03" && (
              <div style={{
                marginTop: focused ? 28 : 10,
                paddingTop: focused ? 18 : 6, borderTop: "1px solid #E5DFD2",
                display: "flex", flexDirection: "column", gap: focused ? 10 : 4,
                fontFamily: "'Inter', sans-serif",
                fontSize: focused ? 12 : 8, color: "#5A5448", letterSpacing: 1, textTransform: "uppercase",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Signature Lecture</span><span>→</span></div>
                <div style={{ display: "flex", justifyContent: "space-between" }}><span>Talk</span><span>→</span></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ----- Single feature panel (Curating / Docent / Lecture) -----
const FeaturePanel = ({ kind, onGo, dense, focused }) => {
  const data = {
    curating: {
      title: "Curating",
      tone: 0, label: "EXHIBITION",
      body: "I curate exhibitions with a focus on thoughtful narratives and meaningful conversations between artists, works, and audiences.",
      cta: "→",
    },
    docent: {
      title: "Docent",
      tone: 2, label: "FIGURE · WALK",
      body: "I guide audiences through art with clarity and empathy, making each experience personal and resonant.",
      cta: null,
    },
    lecture: {
      title: "Lecture",
      tone: 3, label: "AUDITORIUM",
      body: null,
      cta: null,
      twoCol: true,
    },
    projects: {
      title: "Curation",
      tone: 1, label: "EXHIBITION VIEW",
      body: "A selection of curated exhibitions and projects.",
      cta: "View Projects →",
      label2: "Projects",
    },
  }[kind];
  const headerLabel = data.label2 || "Work";
  const titleSize = focused ? "clamp(40px, 4vw, 64px)" : "clamp(14px, 1.4vw, 22px)";
  const bodySize = focused ? "clamp(13px, 0.95vw, 15px)" : "clamp(9px, 0.78vw, 12px)";
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#FAFAF7" }}>
      <MiniNav label={headerLabel} active={kind === "projects" ? "projects" : "work"} onGo={onGo} dense={dense} />
      <div style={{ padding: focused ? "0 7vw" : "0 5%" }}>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', 'Noto Serif KR', serif",
          fontWeight: 400, fontSize: titleSize,
          color: "#1A1814", margin: 0,
        }}>{data.title}</h2>
      </div>
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: data.twoCol ? "1.4fr 1fr" : "1.2fr 1fr", gap: focused ? 56 : 18, padding: focused ? "4vh 7vw 6vh" : "3% 5% 4%", minHeight: 0 }}>
        <Photo tone={data.tone} ratio="4/3" style={{ width: "100%", alignSelf: "center" }} label={data.label} />
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          {data.twoCol ? (
            <div style={{ display: "flex", flexDirection: "column", gap: focused ? 36 : 10 }}>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: focused ? "clamp(20px, 1.6vw, 28px)" : "clamp(11px, 0.95vw, 14px)", color: "#1A1814" }}>Signature Lecture</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: bodySize, color: "#7A7466", marginTop: focused ? 8 : 3, lineHeight: 1.65 }}>In-depth lectures on specific themes and artists.</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: bodySize, color: "#9A9486", marginTop: focused ? 8 : 3 }}>→</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: focused ? "clamp(20px, 1.6vw, 28px)" : "clamp(11px, 0.95vw, 14px)", color: "#1A1814" }}>Talk</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: bodySize, color: "#7A7466", marginTop: focused ? 8 : 3, lineHeight: 1.65 }}>Guest talks and conversations on art, culture, and ideas.</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: bodySize, color: "#9A9486", marginTop: focused ? 8 : 3 }}>→</div>
              </div>
            </div>
          ) : (
            <>
              {data.body && (
                <p style={{
                  margin: 0,
                  fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
                  fontSize: bodySize, lineHeight: 1.85, color: "#5A5448",
                  maxWidth: "30ch",
                }}>{data.body}</p>
              )}
              {data.cta && (
                <div style={{
                  marginTop: focused ? 36 : 10,
                  fontFamily: "'Inter', sans-serif",
                  fontSize: bodySize, color: "#1A1814", letterSpacing: 1,
                }}>{data.cta}</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ----- Contact -----
const SlideContact = ({ onGo, dense, focused }) => {
  const titleSize = focused ? "clamp(28px, 2.6vw, 42px)" : "clamp(11px, 1.1vw, 18px)";
  const bodySize = focused ? "clamp(13px, 0.95vw, 15px)" : "clamp(9px, 0.78vw, 12px)";
  return (
    <div style={{ height: "100%", display: "flex", background: "#FAFAF7" }}>
      <div style={{ flex: 1, position: "relative", overflow: "hidden", background: "#EDE8DC" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(120deg, #F2EEE2 0%, #D9D2BF 100%)",
        }} />
        {/* vase + branch */}
        <div style={{
          position: "absolute", left: "42%", bottom: "12%",
          width: focused ? 80 : 36, height: focused ? 110 : 50,
          background: "linear-gradient(180deg, rgba(255,255,255,0.5) 0%, rgba(180,170,150,0.3) 100%)",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: "8% 8% 4% 4% / 12% 12% 6% 6%",
        }} />
        <div style={{
          position: "absolute", left: "48%", bottom: focused ? "32%" : "26%",
          width: 1, height: focused ? "32%" : "26%",
          background: "linear-gradient(180deg, transparent, #6B6451)",
          transform: "rotate(-5deg)",
          transformOrigin: "bottom",
        }} />
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <MiniNav label="Contact" active="contact" onGo={onGo} dense={dense} />
        <div style={{ flex: 1, padding: focused ? "8vh 7vw" : "5% 6%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', 'Noto Serif KR', serif",
            fontWeight: 400, fontSize: titleSize,
            lineHeight: 1.25, color: "#1A1814", margin: 0,
          }}>For inquiries and collaborations,<br/>please get in touch.</h2>
          <div style={{
            fontFamily: "'Inter', 'Noto Sans KR', sans-serif",
            fontSize: bodySize, color: "#1A1814", lineHeight: 2,
            textAlign: "right",
          }}>
            info@yourname.com<br/>
            <span style={{ color: "#7A7466" }}>@yourname</span>
          </div>
        </div>
        <div style={{
          padding: focused ? "20px 7vw" : "8px 6%",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: focused ? 10 : 7, color: "#B0A998", letterSpacing: 1.5,
        }}>© YOUR NAME · ALL RIGHTS RESERVED</div>
      </div>
    </div>
  );
};

// Wraps each kind with a stable component reference
const SLIDE_REGISTRY = {
  home: SlideHome,
  about: SlideAbout,
  work: SlideWork,
  curating: (p) => <FeaturePanel {...p} kind="curating" />,
  docent: (p) => <FeaturePanel {...p} kind="docent" />,
  lecture: (p) => <FeaturePanel {...p} kind="lecture" />,
  projects: (p) => <FeaturePanel {...p} kind="projects" />,
  contact: SlideContact,
};

window.SLIDE_REGISTRY = SLIDE_REGISTRY;
window.NAV_ITEMS = NAV_ITEMS;
