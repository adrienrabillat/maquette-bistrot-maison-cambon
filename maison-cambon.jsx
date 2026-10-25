import { useState, useEffect, useRef } from "react";

const C = {
  cream: "#FFF9F1",
  white: "#FFFFFF",
  burgundy: "#7B2232",
  burgundyHover: "#943050",
  orange: "#D4862E",
  gold: "#C8A25C",
  textDark: "#2E1A11",
  textMed: "#6B4F42",
  textLight: "#A08979",
  border: "rgba(123,34,50,0.10)",
  stripe: "repeating-linear-gradient(90deg, #7B2232 0px, #7B2232 14px, #D4862E 14px, #D4862E 28px, #FFF5E8 28px, #FFF5E8 42px)",
};

const IMG = {
  hero: "/photos/2025-11-09.webp",
  interior: "/photos/2025-09-20.webp",
  terrace: "/photos/2025-11-21.webp",
  d1: "/photos/2025-12-12.webp",
  d2: "/photos/2025-07-21.webp",
  d3: "/photos/2025-10-24.webp",
  d4: "/photos/2025-09-08.webp",
  d5: "/photos/2025-11-19.webp",
  d6: "/photos/2025-06-18.webp",
  wine: "/photos/2025-09-28.webp",
  brunch: "/photos/unnamed (1).webp",
  // Extra photos for enhanced galerie
  facade: "/photos/2025-07-18.webp",
  terraceParc: "/photos/2025-11-30.webp",
  cocktailAnanas: "/photos/2025-09-14.webp",
  croquettes: "/photos/2025-07-31.webp",
  foieGras: "/photos/2025-12-06.webp",
  interiorDeco: "/photos/2025-09-26.webp",
  waiter: "/photos/2025-06-14.webp",
  terraceSun: "/photos/2025-07-03.webp",
};

const MENU = {
  aujourdhui: [
    { n: "Crème brûlée à la courgette et à la féta", d: "", p: "9.00" },
    { n: "Parmentier de veau", d: "Œuf poché et jus de viande", p: "19.00" },
    { n: "Fondue de poireaux", d: "Gratin de blettes et œuf au plat", p: "17.00" },
    { n: "Côte de bœuf à partager", d: "1,2 kg", p: "72.00" },
    { n: "Chou vanille-fraise", d: "", p: "9.00" },
  ],
  plats: [
    { n: "Poulet rôti", d: "Pommes grenailles, salades", p: "18.00" },
    { n: "Onglet de bœuf", d: "Frites, salade", p: "23.00" },
    { n: "Cheeseburger au Saint-Nectaire", d: "", p: "18.50" },
    { n: "Bacon Burger au Saint-Nectaire", d: "", p: "19.00" },
    { n: "Tartare de bœuf à notre façon", d: "Champignons de Paris frais, tomates séchées, échalote, ciboulette, huile d'olive, copeaux de Cantal, frites et salade", p: "Ardoise" },
    { n: "Entrecôte", d: "+/- 400 gr, pommes grenailles, salade verte", p: "Ardoise" },
    { n: "Pièce de bœuf à partager", d: "Garniture et sauce au choix", p: "Ardoise" },
    { n: "Hot Dog d'effiloché de porc", d: "Sauce barbecue, oignons crispy, brunoise de cornichons, pickles d'oignons rouges, frites", p: "Ardoise" },
    { n: "Fish and Chips", d: "Sauce tartare", p: "19.00" },
    { n: "Pavé de saumon légèrement fumé", d: "Haricots verts frais et sauce vierge du chef", p: "20.40" },
    { n: "Poisson du jour", d: "Selon arrivage", p: "Ardoise" },
    { n: "Gratin de légumes du Soleil", d: "Tomates gratinées à la scarmoza, uniquement salade", p: "17.00" },
  ],
  surLePouce: [
    { n: "Croque-Monsieur", d: "Pain de mie, béchamel, fromage, jambon — frites ou salade", p: "Ardoise" },
    { n: "Croque-Madame", d: "Pain de mie, béchamel, fromage, jambon — frites ou salade", p: "Ardoise" },
    { n: "Wrap Cambon", d: "Poulet rôti, bacon crispy, mayo maison, salade crunchy, tomates — frites ou salade", p: "Ardoise" },
    { n: "Wrap Bien Être", d: "Saumon fumé, avocat et concombre, salade crunchy — frites ou salade", p: "Ardoise" },
  ],
  brunch: [
    { n: "Le Parisien", d: "Café, noisette ou allongé + croissant", p: "4.50" },
    { n: "Les Œufs nature", d: "", p: "8.00" },
    { n: "Les Œufs jambon", d: "", p: "9.00" },
    { n: "Les Œufs fromage", d: "", p: "9.00" },
    { n: "Les Œufs mixte", d: "", p: "10.00" },
    { n: "Les Œufs saumon", d: "", p: "14.00" },
    { n: "La Planche Brunch", d: "Tartines beurre confiture, œuf mayo, croquette d'aligot, pilon de poulet rôti, fromage, fruits, meringue maison — week-end et jours fériés 10h-16h", p: "21.00" },
  ],
  boissons: [
    { n: "Espresso Richard – Perle Noire", d: "", p: "2.60" },
    { n: "Noisette, Allongé, Décaféiné", d: "", p: "2.80" },
    { n: "Café Crème", d: "", p: "5.20" },
    { n: "Cappuccino", d: "", p: "5.70" },
    { n: "Chocolat Chaud Maison", d: "", p: "5.40" },
    { n: "Thés Comptoirs Richard", d: "Ceylan, Darjeeling bio, Earl Grey, fruits rouges, Sencha bio, menthe bio", p: "5.20" },
    { n: "Tisanes Bio", d: "Verveine, camomille, tilleul, menthe poivrée", p: "5.20" },
    { n: "Irish Coffee", d: "Whisky, sucre, café, crème fouettée", p: "12.00" },
    { n: "Coca-Cola, Coca Zero", d: "33cl", p: "5.10" },
    { n: "Jus de fruits Alain Milliat", d: "Abricot, ananas, orange, pommes, tomates, fraises — 20cl", p: "6.80" },
    { n: "Citronnade Maison", d: "30cl", p: "5.70" },
    { n: "Thé glacé maison", d: "Pêche ou hibiscus-menthe — 30cl", p: "5.90" },
    { n: "Vittel, Perrier Fines Bulles", d: "50cl / 75cl", p: "5.00" },
  ],
  apero: [
    { n: "Kir au vin blanc / rouge", d: "14cl, cassis, mûre, pêche, fraise des bois, framboises", p: "5.40" },
    { n: "Kir Royal au Champagne AOC", d: "12cl", p: "14.50" },
    { n: "Champagne AOC coupe", d: "Paul Laurent, Blanc de Blancs — 12cl", p: "14.00" },
    { n: "Prosecco DOC coupe", d: "12cl", p: "10.00" },
    { n: "Ricard", d: "2cl", p: "4.70" },
    { n: "Porto, Martini, Lillet, Campari", d: "", p: "5.50" },
    { n: "Petite Blonde (pression)", d: "", p: "4.90" },
    { n: "Grimbergen Blonde (pression)", d: "", p: "5.10" },
    { n: "1664 Blanche ou Blonde (pression)", d: "", p: "5.10" },
    { n: "Demory IPA (pression)", d: "", p: "5.20" },
    { n: "La Clichoise", d: "Blanche, IPA ou Blonde — 33cl", p: "6.90" },
    { n: "Guinness", d: "", p: "12.00" },
  ],
};

function useInView(t = 0.12) {
  const r = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: t });
    if (r.current) o.observe(r.current);
    return () => o.disconnect();
  }, [t]);
  return [r, v];
}

function Fade({ children, delay = 0, style = {}, className = "" }) {
  const [r, v] = useInView();
  return <div ref={r} className={className} style={{ ...style, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s` }}>{children}</div>;
}

function Stripe({ h = 5 }) {
  return <div style={{ height: h, background: C.stripe, width: "100%" }} />;
}

/* ═══ NAV — Logo left, links + réserver right ═══ */
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id) => {
    if (page !== "main") setPage("main");
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, page !== "main" ? 100 : 0);
  };

  const links = [
    { id: "histoire", label: "Notre Histoire" },
    { id: "carte", label: "La Carte" },
    { id: "galerie", label: "Galerie" },
    { id: "infos", label: "Infos Pratiques" },
  ];

  return (
    <>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1002 }}><Stripe h={4} /></div>
      <nav style={{
        position: "fixed", top: 4, left: 0, right: 0, zIndex: 1001,
        background: scrolled ? "rgba(255,249,241,0.97)" : "rgba(255,249,241,0.9)",
        backdropFilter: "blur(14px)",
        borderBottom: `1px solid ${scrolled ? C.border : "transparent"}`,
        transition: "all 0.4s", padding: scrolled ? "8px 0" : "14px 0",
        boxShadow: scrolled ? "0 2px 16px rgba(90,40,20,0.05)" : "none",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Left: Logo only */}
          <div onClick={() => { setPage("main"); window.scrollTo(0, 0); }} style={{ cursor: "pointer" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: C.burgundy, letterSpacing: 3, fontWeight: 700, lineHeight: 1 }}>MAISON CAMBON</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 9.5, color: C.orange, letterSpacing: 2.5, textTransform: "uppercase", fontWeight: 600 }}>Bistrot de Quartier · Depuis 1940</div>
          </div>

          {/* Right: nav links + Réserver */}
          <div className="desk-nav" style={{ display: "flex", gap: 28, alignItems: "center" }}>
            {links.map(l => (
              <button key={l.id} onClick={() => go(l.id)} style={{
                background: "none", border: "none", borderBottom: "2px solid transparent",
                color: C.textMed, fontFamily: "'Cormorant Garamond', serif",
                fontSize: 13, letterSpacing: 1.8, textTransform: "uppercase",
                cursor: "pointer", padding: "4px 0", fontWeight: 600,
                transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.target.style.color = C.burgundy; e.target.style.borderBottomColor = C.burgundy; }}
                onMouseLeave={e => { e.target.style.color = C.textMed; e.target.style.borderBottomColor = "transparent"; }}
              >{l.label}</button>
            ))}
            <button onClick={() => { setPage("reservation"); window.scrollTo(0, 0); }} style={{
              background: C.burgundy, border: "none", borderRadius: 4,
              color: "#fff", fontFamily: "'Cormorant Garamond', serif",
              fontSize: 11, letterSpacing: 2.5, textTransform: "uppercase",
              padding: "9px 20px", cursor: "pointer", fontWeight: 700,
              transition: "all 0.3s",
            }}
              onMouseEnter={e => e.target.style.background = C.burgundyHover}
              onMouseLeave={e => e.target.style.background = C.burgundy}
            >Réserver</button>
          </div>

          {/* Mobile burger */}
          <button onClick={() => setOpen(!open)} className="mob-burger" style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 6 }}>
            <div style={{ width: 20, height: 2, background: C.burgundy, marginBottom: 5, transition: "all 0.3s", transform: open ? "rotate(45deg) translate(4px,4px)" : "none" }} />
            <div style={{ width: 20, height: 2, background: C.burgundy, marginBottom: 5, opacity: open ? 0 : 1, transition: "all 0.3s" }} />
            <div style={{ width: 20, height: 2, background: C.burgundy, transition: "all 0.3s", transform: open ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
          </button>
        </div>

        {open && (
          <div style={{ background: "rgba(255,249,241,0.98)", backdropFilter: "blur(20px)", padding: "12px 28px", borderBottom: `1px solid ${C.border}` }}>
            {links.map(l => (
              <button key={l.id} onClick={() => go(l.id)} style={{
                display: "block", width: "100%", textAlign: "left", background: "none", border: "none",
                color: C.textMed, fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
                letterSpacing: 2, textTransform: "uppercase", fontWeight: 600,
                cursor: "pointer", padding: "13px 0", borderBottom: `1px solid ${C.border}`,
              }}>{l.label}</button>
            ))}
            <button onClick={() => { setPage("reservation"); window.scrollTo(0, 0); setOpen(false); }} style={{
              display: "block", width: "100%", textAlign: "center", marginTop: 12,
              background: C.burgundy, border: "none", borderRadius: 4,
              color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
              letterSpacing: 2, textTransform: "uppercase", padding: "13px", cursor: "pointer", fontWeight: 700,
            }}>Réserver une table</button>
          </div>
        )}
      </nav>
    </>
  );
}

/* ═══ HERO — Ritz style: full-width image with overlay text ═══ */
function Hero({ setPage }) {
  return (
    <section id="hero" style={{ position: "relative", height: "92vh", minHeight: 500, overflow: "hidden" }}>
      <img src={IMG.hero} alt="Maison Cambon" style={{
        position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
        filter: "brightness(0.55)",
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(180deg, rgba(46,26,17,0.2) 0%, rgba(46,26,17,0.1) 40%, rgba(46,26,17,0.55) 100%)",
      }} />
      <div style={{
        position: "relative", zIndex: 1, height: "100%",
        display: "flex", flexDirection: "column", justifyContent: "flex-end",
        maxWidth: 1280, margin: "0 auto", padding: "0 28px 80px",
      }}>
        <div style={{ opacity: 0, animation: "fadeUp 1s ease 0.3s forwards", maxWidth: 620 }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: C.orange,
            letterSpacing: 5, textTransform: "uppercase", marginBottom: 14, fontWeight: 600,
          }}>Bistrot de Quartier · Clichy · Depuis 1940</div>
          <h1 style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px,6vw,72px)",
            color: "#fff", fontWeight: 500, lineHeight: 1.05, marginBottom: 18,
          }}>
            Maison <span style={{ fontStyle: "italic" }}>Cambon</span>
          </h1>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px,2vw,20px)",
            color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: 32, maxWidth: 480,
          }}>
            Terrasse ensoleillée face au parc, cuisine française généreuse et chaleureuse, du petit-déjeuner au dîner — ouvert 7 jours sur 7.
          </p>
          <button onClick={() => document.getElementById("carte")?.scrollIntoView({ behavior: "smooth" })} style={{
            background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: 4,
            color: "#fff", fontFamily: "'Cormorant Garamond', serif",
            fontSize: 13, letterSpacing: 2.5, textTransform: "uppercase",
            padding: "14px 32px", cursor: "pointer", fontWeight: 600,
            backdropFilter: "blur(8px)", transition: "all 0.3s",
          }}
            onMouseEnter={e => e.target.style.background = "rgba(255,255,255,0.2)"}
            onMouseLeave={e => e.target.style.background = "rgba(255,255,255,0.1)"}
          >Découvrir la carte</button>
        </div>
      </div>
    </section>
  );
}

/* ═══ HISTOIRE ═══ */
function Histoire() {
  return (
    <section id="histoire" style={{ background: C.white, padding: "clamp(70px,10vw,130px) 28px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,5vw,80px)", alignItems: "center" }}>
          <Fade>
            <div style={{ position: "relative" }}>
              <div style={{ borderRadius: 8, overflow: "hidden", boxShadow: "0 16px 50px rgba(90,40,20,0.10)" }}>
                <img src={IMG.interior} alt="Intérieur" style={{ width: "100%", height: 460, objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ position: "absolute", top: -10, left: -10, width: 80, height: 80, borderTop: `3px solid ${C.orange}`, borderLeft: `3px solid ${C.orange}`, borderRadius: "8px 0 0 0" }} />
              <div style={{ position: "absolute", bottom: -10, right: -10, width: 80, height: 80, borderBottom: `3px solid ${C.orange}`, borderRight: `3px solid ${C.orange}`, borderRadius: "0 0 8px 0" }} />
            </div>
          </Fade>
          <Fade delay={0.12}>
            <div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: C.orange, letterSpacing: 5, textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>Notre Histoire</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px,4vw,46px)", color: C.textDark, fontWeight: 500, lineHeight: 1.15, marginBottom: 20 }}>
                L'âme d'un <span style={{ fontStyle: "italic", color: C.burgundy }}>bistrot parisien</span>
              </h2>
              <div style={{ width: 45, height: 3, background: C.orange, borderRadius: 2, marginBottom: 24 }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: C.textMed, lineHeight: 1.8, marginBottom: 16 }}>
                Depuis 1940, la Maison Cambon est le cœur battant de Clichy. Installée sur la Place des Martyrs, face au parc verdoyant, notre grande terrasse est devenue l'un des lieux les plus prisés du quartier.
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: C.textMed, lineHeight: 1.8, marginBottom: 28 }}>
                Ici, on célèbre la cuisine française authentique et la générosité. Du petit-déjeuner au dîner, en passant par le brunch du week-end, chaque moment est une invitation au partage.
              </p>
              <div style={{ display: "flex", gap: 0, borderTop: `1px solid ${C.border}` }}>
                {[{ v: "7j/7", l: "Ouvert" }, { v: "120", l: "Places terrasse" }, { v: "1940", l: "Fondation" }].map((s, i) => (
                  <div key={i} style={{ flex: 1, padding: "18px 0", borderRight: i < 2 ? `1px solid ${C.border}` : "none", textAlign: "center" }}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: C.burgundy, fontWeight: 600 }}>{s.v}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11, color: C.textLight, letterSpacing: 2, textTransform: "uppercase", marginTop: 3, fontWeight: 600 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ═══ LA CARTE ═══ */
function Carte() {
  const [tab, setTab] = useState("aujourdhui");
  const tabs = [{ id: "aujourdhui", l: "Aujourd'hui" }, { id: "plats", l: "Nos Plats" }, { id: "surLePouce", l: "Sur le Pouce" }, { id: "brunch", l: "P'tits Déj & Brunch" }, { id: "boissons", l: "Boissons" }, { id: "apero", l: "Apéro & Bières" }];

  return (
    <section id="carte" style={{ background: C.cream, padding: "clamp(70px,10vw,130px) 28px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: C.orange, letterSpacing: 5, textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>Nos Saveurs</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4.5vw,50px)", color: C.textDark, fontWeight: 500 }}>
              La <span style={{ fontStyle: "italic", color: C.burgundy }}>Carte</span>
            </h2>
            <div style={{ width: 45, height: 3, background: C.orange, borderRadius: 2, margin: "16px auto 0" }} />
          </div>
        </Fade>

        <Fade delay={0.08}>
          <div style={{ display: "flex", justifyContent: "center", gap: 7, marginBottom: 36, flexWrap: "wrap" }}>
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                background: tab === t.id ? C.burgundy : "transparent",
                border: `1.5px solid ${tab === t.id ? C.burgundy : C.border}`,
                borderRadius: 32, color: tab === t.id ? "#fff" : C.textMed,
                fontFamily: "'Cormorant Garamond', serif", fontSize: 13, letterSpacing: 1.5,
                textTransform: "uppercase", padding: "8px 20px", cursor: "pointer",
                transition: "all 0.25s", fontWeight: 600,
              }}>{t.l}</button>
            ))}
          </div>
        </Fade>

        <div style={{ height: 3, borderRadius: 2, background: `linear-gradient(90deg, ${C.burgundy}, ${C.orange}, ${C.burgundy})`, opacity: 0.3, marginBottom: 6 }} />

        <div style={{
          background: C.white, borderRadius: 10,
          boxShadow: "0 4px 28px rgba(90,40,20,0.05)",
          padding: "clamp(16px,3vw,36px)", border: `1px solid ${C.border}`,
        }}>
          {MENU[tab].map((item, i) => (
            <div key={`${tab}-${i}`} style={{
              display: "flex", justifyContent: "space-between", alignItems: "flex-start",
              padding: "16px 6px",
              borderBottom: i < MENU[tab].length - 1 ? "1px dashed rgba(123,34,50,0.08)" : "none",
              transition: "background 0.2s", borderRadius: 4,
            }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(123,34,50,0.018)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: C.textDark, fontWeight: 500, marginBottom: item.d ? 3 : 0 }}>{item.n}</div>
                {item.d && <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14.5, color: C.textLight, fontStyle: "italic" }}>{item.d}</div>}
              </div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: C.burgundy, fontWeight: 600, whiteSpace: "nowrap", marginLeft: 16 }}>
                {item.p === "Ardoise" ? "Ardoise" : `${item.p.replace(".", ",")}€`}
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: 20, fontFamily: "'Cormorant Garamond', serif", fontSize: 12.5, color: C.textLight, fontStyle: "italic" }}>
          Prix nets en euros, taxes et service compris · CB à partir de 5€
        </p>
      </div>
    </section>
  );
}

/* ═══ GALERIE ═══ */
function Galerie() {
  const imgs = [
    { s: IMG.d1, l: "Tartare de bœuf" }, { s: IMG.d2, l: "Salade du marché" },
    { s: IMG.interiorDeco, l: "L'intérieur" }, { s: IMG.d3, l: "Planche charcuterie" },
    { s: IMG.cocktailAnanas, l: "Nos cocktails" }, { s: IMG.terraceParc, l: "Terrasse face au parc" },
    { s: IMG.foieGras, l: "Foie gras maison" }, { s: IMG.facade, l: "Maison Cambon" },
  ];

  return (
    <section id="galerie" style={{ background: C.white, padding: "clamp(70px,10vw,130px) 28px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: C.orange, letterSpacing: 5, textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>Nos Instants</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4.5vw,50px)", color: C.textDark, fontWeight: 500 }}>
              <span style={{ fontStyle: "italic", color: C.burgundy }}>Galerie</span>
            </h2>
          </div>
        </Fade>
        <div className="gal-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          {imgs.map((img, i) => (
            <Fade key={i} delay={i * 0.05}>
              <div style={{
                position: "relative", overflow: "hidden", borderRadius: 6, cursor: "pointer",
                aspectRatio: (i === 0 || i === 2) ? "3/4" : "1/1",
                gridRow: (i === 0 || i === 2) ? "span 2" : undefined,
              }}
                onMouseEnter={e => { e.currentTarget.querySelector("img").style.transform = "scale(1.05)"; e.currentTarget.querySelector(".go").style.opacity = 1; }}
                onMouseLeave={e => { e.currentTarget.querySelector("img").style.transform = "scale(1)"; e.currentTarget.querySelector(".go").style.opacity = 0; }}
              >
                <img src={img.s} alt={img.l} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", display: "block" }} />
                <div className="go" style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(180deg, transparent 55%, rgba(123,34,50,0.65) 100%)",
                  display: "flex", alignItems: "flex-end", padding: 14,
                  opacity: 0, transition: "opacity 0.35s",
                }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13, color: "#fff", letterSpacing: 2, textTransform: "uppercase", fontWeight: 600 }}>{img.l}</span>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ INFOS PRATIQUES (replaces old contact+horaires — no doublons) ═══ */
function Infos() {
  return (
    <section id="infos" style={{ background: C.cream, padding: "clamp(70px,10vw,110px) 28px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Fade>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: C.orange, letterSpacing: 5, textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>Informations</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px,4vw,46px)", color: C.textDark, fontWeight: 500 }}>
              Infos <span style={{ fontStyle: "italic", color: C.burgundy }}>pratiques</span>
            </h2>
          </div>
        </Fade>

        <Fade delay={0.08}>
          <div className="info-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {/* Left — address + hours */}
            <div style={{ background: C.white, borderRadius: 10, border: `1px solid ${C.border}`, padding: 30 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, color: C.textDark, marginBottom: 20, fontWeight: 500 }}>Nous trouver</div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: C.textMed, lineHeight: 1.9, marginBottom: 24 }}>
                60 Boulevard Jean Jaurès<br />1 Place des Martyrs de l'Occupation Allemande<br />92110 Clichy
              </div>
              <div style={{ height: 1, background: C.border, marginBottom: 20 }} />
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: C.textDark, marginBottom: 14, fontWeight: 500 }}>Horaires</div>
              {[
                { m: "Service continu", t: "7h00 – 1h00, 7j/7" },
                { m: "Petit-déjeuner", t: "7h – 11h30" },
                { m: "Déjeuner", t: "12h – 14h30" },
                { m: "Dîner", t: "19h – 22h30" },
                { m: "Brunch (sam. & dim.)", t: "10h – 16h" },
              ].map((s, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: i < 4 ? `1px solid ${C.border}` : "none" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14.5, color: C.textMed }}>{s.m}</span>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14.5, color: C.burgundy, fontWeight: 600 }}>{s.t}</span>
                </div>
              ))}
            </div>

            {/* Right — contact + map */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ background: C.white, borderRadius: 10, border: `1px solid ${C.border}`, padding: 30 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, color: C.textDark, marginBottom: 16, fontWeight: 500 }}>Contact</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: C.textMed, lineHeight: 2 }}>
                  Tél. <span style={{ color: C.burgundy, fontWeight: 600 }}>01 41 34 30 43</span><br />
                  <a href="https://www.instagram.com/maison_cambon/" target="_blank" rel="noopener noreferrer" style={{ color: C.textMed, textDecoration: "none", transition: "color 0.3s" }} onMouseEnter={e => e.target.style.color = C.burgundy} onMouseLeave={e => e.target.style.color = C.textMed}>Instagram: @maison_cambon</a>
                </div>
              </div>
              <div style={{ flex: 1, minHeight: 200, borderRadius: 10, overflow: "hidden", border: `1px solid ${C.border}` }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2622.5!2d2.3063!3d48.9028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDjCsDU0JzEwLjEiTiAywrAxOCcyMi43IkU!5e0!3m2!1sfr!2sfr!4v1"
                  width="100%" height="100%" style={{ border: 0, display: "block" }} loading="lazy" title="Map" />
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
function Footer({ setPage }) {
  const go = (id) => {
    setPage("main");
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
  };
  return (
    <footer>
      <Stripe h={5} />
      <div style={{ background: C.burgundy, padding: "44px 28px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, color: "#fff", letterSpacing: 3, fontWeight: 600, marginBottom: 4 }}>MAISON CAMBON</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 10, color: C.orange, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 12 }}>Bistrot de Quartier · Depuis 1940</div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>60 Bd Jean Jaurès · 92110 Clichy<br />01 41 34 30 43</p>
          </div>
          <div style={{ display: "flex", gap: 44 }}>
            {[
              { t: "Plan du site", ls: [{ l: "Notre Histoire", id: "histoire" }, { l: "La Carte", id: "carte" }, { l: "Galerie", id: "galerie" }, { l: "Réserver", id: null }] },
              { t: "Suivez-nous", ls: [{ l: "Instagram", href: "https://www.instagram.com/maison_cambon/" }, { l: "Facebook", href: "https://www.facebook.com/635938636274518/" }] },
            ].map((col, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 10.5, color: C.orange, letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 12, fontWeight: 600 }}>{col.t}</div>
                {col.ls.map((link, j) => (
                  <div key={j} style={{ marginBottom: 5 }}>
                    {link.href ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" style={{
                        fontFamily: "'Cormorant Garamond', serif", fontSize: 13.5,
                        color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.3s",
                      }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}>{link.l}</a>
                    ) : (
                      <button onClick={() => link.id ? go(link.id) : link.l === "Réserver" ? (setPage("reservation"), window.scrollTo(0, 0)) : null} style={{
                        background: "none", border: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: 13.5,
                        color: "rgba(255,255,255,0.55)", cursor: "pointer", padding: 0, transition: "color 0.3s",
                      }} onMouseEnter={e => e.target.style.color = "#fff"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}>{link.l}</button>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 900, margin: "28px auto 0", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 16, textAlign: "center" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 11.5, color: "rgba(255,255,255,0.35)" }}>© 2026 Maison Cambon — Tous droits réservés</span>
        </div>
      </div>
    </footer>
  );
}

/* ═══ RESERVATION PAGE ═══ */
function ReservationPage({ setPage }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "", guests: "2", message: "" });
  const [done, setDone] = useState(false);
  const minDate = new Date().toISOString().split("T")[0];
  const times = ["12:00","12:15","12:30","12:45","13:00","13:15","13:30","19:00","19:15","19:30","19:45","20:00","20:15","20:30","20:45","21:00","21:15","21:30"];
  const ok = form.name && form.email && form.date && form.time;

  const inp = {
    width: "100%", background: C.white, border: `1.5px solid rgba(123,34,50,0.14)`, borderRadius: 5,
    color: C.textDark, fontFamily: "'Cormorant Garamond', serif", fontSize: 16,
    padding: "12px 15px", outline: "none", transition: "border-color 0.3s", boxSizing: "border-box",
  };
  const lab = {
    fontFamily: "'Cormorant Garamond', serif", fontSize: 11.5, color: C.burgundy,
    letterSpacing: 2.5, textTransform: "uppercase", marginBottom: 6, display: "block", fontWeight: 700,
  };

  if (done) {
    return (
      <div style={{ paddingTop: 90, minHeight: "100vh", background: C.cream }}>
        <div style={{ maxWidth: 500, margin: "0 auto", padding: "80px 28px", textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(123,34,50,0.08)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px", fontSize: 28, color: C.burgundy }}>✓</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, color: C.textDark, fontWeight: 500, marginBottom: 14 }}>
            Merci, <span style={{ fontStyle: "italic", color: C.burgundy }}>{form.name}</span>
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 17, color: C.textMed, lineHeight: 1.7, marginBottom: 10 }}>
            Votre table pour <strong style={{ color: C.burgundy }}>{form.guests} {parseInt(form.guests) > 1 ? "personnes" : "personne"}</strong> le{" "}
            <strong style={{ color: C.burgundy }}>{new Date(form.date).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</strong>{" "}
            à <strong style={{ color: C.burgundy }}>{form.time}</strong> est confirmée.
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: C.textLight, fontStyle: "italic" }}>Un email de confirmation vous sera envoyé.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 28, flexWrap: "wrap" }}>
            <button onClick={() => { setDone(false); setForm({ name: "", email: "", phone: "", date: "", time: "", guests: "2", message: "" }); }} style={{
              background: "transparent", border: `2px solid ${C.burgundy}`, borderRadius: 4,
              color: C.burgundy, fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: 2,
              textTransform: "uppercase", padding: "10px 28px", cursor: "pointer", fontWeight: 700,
            }}>Nouvelle réservation</button>
            <button onClick={() => setPage("main")} style={{
              background: C.burgundy, border: "none", borderRadius: 4,
              color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 12, letterSpacing: 2,
              textTransform: "uppercase", padding: "10px 28px", cursor: "pointer", fontWeight: 700,
            }}>Retour à l'accueil</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: 70, minHeight: "100vh", background: C.cream }}>
      {/* Hero banner */}
      <div style={{ position: "relative", height: 260, overflow: "hidden" }}>
        <img src={IMG.d6} alt="Réserver" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5)" }} />
        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", padding: "0 28px" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 12, color: C.orange, letterSpacing: 5, textTransform: "uppercase", marginBottom: 10, fontWeight: 600 }}>Maison Cambon</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px,5vw,48px)", color: "#fff", fontWeight: 500 }}>
            Réserver une <span style={{ fontStyle: "italic" }}>table</span>
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 620, margin: "0 auto", padding: "44px 28px 80px" }}>
        <button onClick={() => setPage("main")} style={{
          background: "none", border: "none", color: C.textLight, fontFamily: "'Cormorant Garamond', serif",
          fontSize: 14, cursor: "pointer", padding: "0 0 20px", display: "flex", alignItems: "center", gap: 6, fontWeight: 600,
        }}>← Retour à l'accueil</button>

        <div style={{
          background: C.white, borderRadius: 10, border: `1px solid ${C.border}`,
          padding: "clamp(24px,4vw,40px)", boxShadow: "0 6px 30px rgba(90,40,20,0.05)",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${C.burgundy}, ${C.orange})` }} />

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12, marginTop: 6 }}>
            <div><label style={lab}>Nom *</label><input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Votre nom" style={inp} onFocus={e => e.target.style.borderColor = C.burgundy} onBlur={e => e.target.style.borderColor = "rgba(123,34,50,0.14)"} /></div>
            <div><label style={lab}>Téléphone</label><input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} placeholder="06 00 00 00 00" style={inp} onFocus={e => e.target.style.borderColor = C.burgundy} onBlur={e => e.target.style.borderColor = "rgba(123,34,50,0.14)"} /></div>
          </div>
          <div style={{ marginBottom: 12 }}><label style={lab}>Email *</label><input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="votre@email.com" type="email" style={inp} onFocus={e => e.target.style.borderColor = C.burgundy} onBlur={e => e.target.style.borderColor = "rgba(123,34,50,0.14)"} /></div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div><label style={lab}>Date *</label><input type="date" min={minDate} value={form.date} onChange={e => setForm({...form, date: e.target.value})} style={inp} onFocus={e => e.target.style.borderColor = C.burgundy} onBlur={e => e.target.style.borderColor = "rgba(123,34,50,0.14)"} /></div>
            <div><label style={lab}>Convives *</label><select value={form.guests} onChange={e => setForm({...form, guests: e.target.value})} style={{...inp, cursor: "pointer"}}>{[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n > 1 ? "personnes" : "personne"}</option>)}</select></div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={lab}>Heure *</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(64px, 1fr))", gap: 6 }}>
              {times.map(t => (
                <button key={t} onClick={() => setForm({...form, time: t})} style={{
                  background: form.time === t ? C.burgundy : "rgba(123,34,50,0.03)",
                  border: `1.5px solid ${form.time === t ? C.burgundy : "rgba(123,34,50,0.10)"}`,
                  borderRadius: 4, color: form.time === t ? "#fff" : C.textMed,
                  fontFamily: "'Cormorant Garamond', serif", fontSize: 13.5,
                  padding: "7px 2px", cursor: "pointer", transition: "all 0.2s", fontWeight: 600,
                }}>{t}</button>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 18 }}><label style={lab}>Message</label><textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})} placeholder="Allergies, occasion spéciale..." rows={3} style={{...inp, resize: "vertical"}} onFocus={e => e.target.style.borderColor = C.burgundy} onBlur={e => e.target.style.borderColor = "rgba(123,34,50,0.14)"} /></div>
          <button onClick={() => ok && setDone(true)} style={{
            width: "100%", background: C.burgundy, border: "none", borderRadius: 5,
            color: "#fff", fontFamily: "'Cormorant Garamond', serif", fontSize: 14, letterSpacing: 2.5,
            textTransform: "uppercase", padding: "14px", cursor: ok ? "pointer" : "default", fontWeight: 700,
            transition: "all 0.3s", opacity: ok ? 1 : 0.45,
            boxShadow: "0 4px 14px rgba(123,34,50,0.22)",
          }}
            onMouseEnter={e => { if (ok) { e.target.style.background = C.burgundyHover; e.target.style.transform = "translateY(-1px)"; }}}
            onMouseLeave={e => { e.target.style.background = C.burgundy; e.target.style.transform = "translateY(0)"; }}
          >Confirmer la réservation</button>
        </div>
      </div>
    </div>
  );
}

/* ═══ MAIN APP ═══ */
export default function MaisonCambon() {
  const [page, setPage] = useState("main");

  return (
    <div style={{ background: C.cream, minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        *{margin:0;padding:0;box-sizing:border-box;}
        ::selection{background:rgba(123,34,50,0.12);color:${C.burgundy};}
        input::placeholder,textarea::placeholder{color:${C.textLight};}
        html{scroll-behavior:smooth;}
        @media(max-width:860px){
          .desk-nav{display:none!important;}
          .mob-burger{display:block!important;}
          .grid-2,.info-grid{grid-template-columns:1fr!important;}
          .gal-grid{grid-template-columns:1fr 1fr!important;}
          .hero-grid{grid-template-columns:1fr!important;}
        }
        @media(max-width:500px){
          .gal-grid{grid-template-columns:1fr!important;}
        }
      `}</style>

      <Nav page={page} setPage={setPage} />

      {page === "main" ? (
        <>
          <Hero setPage={setPage} />
          <Histoire />
          <Carte />
          <Galerie />
          <Infos />
        </>
      ) : (
        <ReservationPage setPage={setPage} />
      )}

      <Footer setPage={setPage} />
    </div>
  );
}
