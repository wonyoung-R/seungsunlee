// Grid layout + PPT-style focus mode (FLIP transition).
// Layout matches the reference image exactly:
//   row 1: Home (full width, large)
//   row 2: About | Work overview
//   row 3: Curating | Docent
//   row 4: Lecture | Projects
//   row 5: Contact (full width)

const GRID_LAYOUT = [
  // [slideKey, gridArea, aspect]
  { key: "home",     area: "1 / 1 / 2 / 3", aspect: "16/9" },
  { key: "about",    area: "2 / 1 / 3 / 2", aspect: "16/10" },
  { key: "work",     area: "2 / 2 / 3 / 3", aspect: "16/10" },
  { key: "curating", area: "3 / 1 / 4 / 2", aspect: "16/9" },
  { key: "docent",   area: "3 / 2 / 4 / 3", aspect: "16/9" },
  { key: "lecture",  area: "4 / 1 / 5 / 2", aspect: "16/9" },
  { key: "projects", area: "4 / 2 / 5 / 3", aspect: "16/9" },
  { key: "contact",  area: "5 / 1 / 6 / 3", aspect: "21/9" },
];

// Map nav-item clicks (Home/About/Work/Projects/Contact) to which card to open
const NAV_TO_SLIDE = {
  home: "home",
  about: "about",
  work: "work",
  projects: "projects",
  contact: "contact",
};

const App = () => {
  const [focused, setFocused] = React.useState(null);
  const cardRefs = React.useRef({});
  const [transition, setTransition] = React.useState(null); // {key, fromRect, phase: 'opening'|'open'|'closing'}

  const openSlide = (key) => {
    if (transition) return;
    if (focused === key) return;
    const el = cardRefs.current[key];
    const fromRect = el ? el.getBoundingClientRect() : null;
    setTransition({ key, fromRect, phase: "opening" });
    setFocused(key);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setTransition(t => t ? { ...t, phase: "open" } : null));
    });
    setTimeout(() => setTransition(null), 700);
  };

  const closeSlide = () => {
    if (!focused) return;
    const key = focused;
    const el = cardRefs.current[key];
    const toRect = el ? el.getBoundingClientRect() : null;
    setTransition({ key, fromRect: toRect, phase: "closing" });
    setTimeout(() => {
      setFocused(null);
      setTransition(null);
    }, 600);
  };

  // Esc to close
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeSlide();
      if (focused && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
        const order = GRID_LAYOUT.map(g => g.key);
        const i = order.indexOf(focused);
        const next = e.key === "ArrowRight" ? order[(i + 1) % order.length] : order[(i - 1 + order.length) % order.length];
        // close-then-open with brief delay
        closeSlide();
        setTimeout(() => openSlide(next), 620);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focused]);

  const handleNav = (navKey) => {
    const slideKey = NAV_TO_SLIDE[navKey] || navKey;
    if (focused) {
      // already in focus mode: cross-fade to new slide
      closeSlide();
      setTimeout(() => openSlide(slideKey), 620);
    } else {
      openSlide(slideKey);
    }
  };

  // Landing mode: only Home visible, fills viewport, no scroll.
  // Click Home or any nav item to expand into the grid view.
  const [landed, setLanded] = React.useState(false);

  const handleNavLanding = (navKey) => {
    setLanded(true);
    // Defer so Grid can render and measure refs before we open the focus overlay
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const slideKey = NAV_TO_SLIDE[navKey] || navKey;
        if (slideKey === "home") return; // already showing home; just reveal grid
        openSlide(slideKey);
      });
    });
  };

  if (!landed) {
    return (
      <div style={{
        height: "100vh", width: "100vw", overflow: "hidden",
        background: "#EDEAE2", padding: "clamp(16px, 2.5vw, 36px)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div
          onClick={() => setLanded(true)}
          style={{
            width: "100%", height: "100%",
            maxWidth: 1480,
            background: "#FFFFFF",
            cursor: "pointer",
            overflow: "hidden",
            boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
            animation: "landingFade 1200ms cubic-bezier(0.22,0.61,0.36,1)",
          }}
        >
          <SLIDE_REGISTRY.home onGo={handleNavLanding} dense={false} focused={true} />
        </div>
        <style>{`
          @keyframes landingFade {
            from { opacity: 0; transform: scale(0.985); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#EDEAE2", padding: "clamp(16px, 2.5vw, 36px)" }}>
      <Grid cardRefs={cardRefs} onOpen={openSlide} onNav={handleNav} focusedKey={focused} />
      <FocusOverlay
        focused={focused}
        transition={transition}
        onClose={closeSlide}
        onNav={handleNav}
      />
    </div>
  );
};

// ----- Grid of all 8 slide cards -----
const Grid = ({ cardRefs, onOpen, onNav, focusedKey }) => {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "clamp(8px, 1vw, 14px)",
      maxWidth: 1480, margin: "0 auto",
    }} data-grid>
      {GRID_LAYOUT.map(({ key, area, aspect }) => {
        const Slide = SLIDE_REGISTRY[key];
        const isHidden = focusedKey === key;
        return (
          <div
            key={key}
            ref={(el) => { cardRefs.current[key] = el; }}
            onClick={() => onOpen(key)}
            style={{
              gridArea: area,
              aspectRatio: aspect,
              background: "#FFFFFF",
              cursor: "pointer",
              overflow: "hidden",
              boxShadow: "0 1px 0 rgba(0,0,0,0.04)",
              opacity: isHidden ? 0 : 1,
              transition: "opacity 280ms ease 280ms, transform 600ms cubic-bezier(0.22,0.61,0.36,1)",
              transform: isHidden ? "scale(0.98)" : "scale(1)",
              position: "relative",
            }}
            onMouseEnter={(e) => { if (!isHidden) e.currentTarget.style.transform = "scale(1.005)"; }}
            onMouseLeave={(e) => { if (!isHidden) e.currentTarget.style.transform = "scale(1)"; }}
          >
            <Slide onGo={(navKey) => { onNav(navKey); }} dense focused={false} />
          </div>
        );
      })}
    </div>
  );
};

// ----- Fullscreen focus overlay with FLIP-style scale transition -----
const FocusOverlay = ({ focused, transition, onClose, onNav }) => {
  if (!focused && !transition) return null;
  const key = focused || transition?.key;
  const Slide = SLIDE_REGISTRY[key];
  const phase = transition?.phase;
  const fromRect = transition?.fromRect;

  // FLIP: compute the inverse transform from the card's start position
  // to the fullscreen target.
  const overlayStyle = (() => {
    const target = { x: 0, y: 0, w: window.innerWidth, h: window.innerHeight };
    if (phase === "opening" && fromRect) {
      const sx = fromRect.width / target.w;
      const sy = fromRect.height / target.h;
      const tx = fromRect.left;
      const ty = fromRect.top;
      return {
        transform: `translate(${tx}px, ${ty}px) scale(${sx}, ${sy})`,
        transformOrigin: "top left",
        transition: "none",
      };
    }
    if (phase === "closing" && fromRect) {
      const sx = fromRect.width / target.w;
      const sy = fromRect.height / target.h;
      const tx = fromRect.left;
      const ty = fromRect.top;
      return {
        transform: `translate(${tx}px, ${ty}px) scale(${sx}, ${sy})`,
        transformOrigin: "top left",
        transition: "transform 600ms cubic-bezier(0.22,0.61,0.36,1), opacity 400ms ease 250ms",
        opacity: 0,
      };
    }
    return {
      transform: "translate(0, 0) scale(1, 1)",
      transformOrigin: "top left",
      transition: "transform 700ms cubic-bezier(0.22,0.61,0.36,1)",
    };
  })();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "#1A1814",
          opacity: phase === "open" ? 0.4 : 0,
          transition: "opacity 600ms ease",
          zIndex: 90,
        }}
      />
      {/* Slide */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 100,
        pointerEvents: phase === "open" ? "auto" : "auto",
        ...overlayStyle,
      }}>
        <div style={{
          width: "100vw", height: "100vh",
          background: "#FFFFFF",
          overflow: "hidden",
          position: "relative",
        }}>
          <Slide
            onGo={(navKey) => onNav(navKey)}
            dense={false}
            focused={true}
          />
          {/* close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 22, right: 24,
              background: "none", border: "1px solid #1A1814",
              width: 36, height: 36, borderRadius: "50%",
              cursor: "pointer", padding: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Inter', sans-serif", fontSize: 14, color: "#1A1814",
              opacity: phase === "open" ? 1 : 0,
              transition: "opacity 400ms ease 300ms",
              zIndex: 10,
            }}
            aria-label="Close"
          >×</button>
          {/* slide indicator */}
          <div style={{
            position: "absolute", left: 24, bottom: 18,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10, color: "#9A9486", letterSpacing: 1.5,
            opacity: phase === "open" ? 1 : 0,
            transition: "opacity 400ms ease 300ms",
          }}>
            {String(GRID_LAYOUT.findIndex(g => g.key === key) + 1).padStart(2, "0")} / {String(GRID_LAYOUT.length).padStart(2, "0")} · ESC
          </div>
        </div>
      </div>
    </>
  );
};

window.App = App;
