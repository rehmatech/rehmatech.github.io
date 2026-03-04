import { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';

const LOGO_B64 = "data:image/png;base64,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";

const COLORS = {
  charcoal: "#1a1a1a",
  charcoalLight: "#242424",
  charcoalMid: "#2e2e2e",
  red: "#e02020",
  redDark: "#b01818",
  redGlow: "rgba(224, 32, 32, 0.15)",
  white: "#f5f5f5",
  gray: "#999999",
  grayLight: "#cccccc",
};

const NAV_LINKS = ["Home", "Services", "About", "Contact"];

const SERVICES = [
  {
    icon: "🧱",
    title: "Drupal Development",
    desc: "Enterprise-grade CMS solutions built on Drupal — scalable, secure, and tailored to your content needs.",
  },
  {
    icon: "💻",
    title: "App Development",
    desc: "Full-stack web applications engineered for performance, reliability, and seamless user experience.",
  },
  {
    icon: "📱",
    title: "Mobile App Development",
    desc: "Native and cross-platform mobile apps that deliver smooth, engaging experiences on iOS and Android.",
  },
  {
    icon: "🎨",
    title: "UI/UX Design",
    desc: "Intuitive, visually compelling interfaces designed with purpose — where aesthetics meet usability.",
  },
  {
    icon: "🦋",
    title: "Flutter Development",
    desc: "Beautiful, natively compiled apps from a single codebase using Google's Flutter framework.",
  },
];

const STATS = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "5+", label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled || menuOpen ? "rgba(20,20,20,0.98)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${COLORS.charcoalMid}` : "none",
        transition: "all 0.4s ease",
        padding: "0 5%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 70, width: "100%",
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={LOGO_B64} alt="Rehmat Technologies Logo" style={{ height: 48, width: "auto" }} />
        </div>

        <div className="desktop-nav" style={{ display: "flex", gap: 36 }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                color: active === link ? COLORS.red : COLORS.grayLight,
                fontFamily: "Verdana, Geneva, sans-serif", fontSize: 13, letterSpacing: 2,
                textTransform: "uppercase", transition: "color 0.2s",
                padding: "4px 0",
                borderBottom: active === link ? `2px solid ${COLORS.red}` : "2px solid transparent",
              }}
            >{link}</button>
          ))}
        </div>

        <button className="desktop-cta" onClick={() => scrollTo("Contact")}
          style={{
            background: COLORS.red, color: "#fff", border: "none",
            padding: "10px 24px", fontFamily: "Verdana, Geneva, sans-serif",
            fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase",
            cursor: "pointer", fontWeight: 700,
            clipPath: "polygon(0 0, 92% 0, 100% 20%, 100% 100%, 8% 100%, 0 80%)",
            transition: "background 0.2s",
          }}
          onMouseEnter={e => e.target.style.background = COLORS.redDark}
          onMouseLeave={e => e.target.style.background = COLORS.red}
        >
          Get In Touch
        </button>

        <button className="mobile-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: "none", border: "none", cursor: "pointer",
            padding: 8, display: "none", flexDirection: "column",
            gap: 5, alignItems: "center", justifyContent: "center",
          }}>
          <span style={{ display: "block", width: 24, height: 2, background: menuOpen ? COLORS.red : COLORS.white, transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }}/>
          <span style={{ display: "block", width: 24, height: 2, background: menuOpen ? COLORS.red : COLORS.white, transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }}/>
          <span style={{ display: "block", width: 24, height: 2, background: menuOpen ? COLORS.red : COLORS.white, transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }}/>
        </button>
      </nav>

      <div style={{
        position: "fixed", top: 70, left: 0, right: 0, zIndex: 99,
        background: "rgba(20,20,20,0.98)",
        borderBottom: menuOpen ? `1px solid ${COLORS.charcoalMid}` : "none",
        padding: menuOpen ? "24px 5% 32px" : "0 5%",
        maxHeight: menuOpen ? 400 : 0,
        overflow: "hidden",
        transition: "all 0.35s ease",
        display: "flex", flexDirection: "column", gap: 8,
      }}>
        {NAV_LINKS.map(link => (
          <button key={link} onClick={() => scrollTo(link)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: active === link ? COLORS.red : COLORS.grayLight,
              fontFamily: "Verdana, Geneva, sans-serif", fontSize: 15,
              letterSpacing: 2, textTransform: "uppercase",
              padding: "12px 0", textAlign: "left",
              borderBottom: `1px solid ${COLORS.charcoalMid}`,
              width: "100%",
            }}
          >{link}</button>
        ))}
        <button onClick={() => scrollTo("Contact")}
          style={{
            background: COLORS.red, color: "#fff", border: "none",
            padding: "14px", fontFamily: "Verdana, Geneva, sans-serif",
            fontSize: 13, letterSpacing: 2, textTransform: "uppercase",
            cursor: "pointer", fontWeight: 700, marginTop: 8,
          }}
        >
          Get In Touch
        </button>
      </div>
    </>
  );
}

function Hero({ setActive }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <section id="home" style={{
      minHeight: "100vh", background: COLORS.charcoal,
      display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
      padding: "100px 5% 60px",
    }}>
      {/* Background grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(${COLORS.charcoalMid} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.charcoalMid} 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        opacity: 0.4,
      }} />
      {/* Red diagonal accent */}
      <div style={{
        position: "absolute", right: -80, top: "10%",
        width: 400, height: 700,
        background: `linear-gradient(135deg, ${COLORS.red} 0%, transparent 70%)`,
        opacity: 0.08,
        transform: "rotate(-15deg)",
      }} />
      <div style={{
        position: "absolute", right: "8%", top: "20%",
        width: 3, height: "60%",
        background: `linear-gradient(to bottom, transparent, ${COLORS.red}, transparent)`,
        opacity: 0.5,
      }} />

      <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{
          display: "inline-block",
          background: COLORS.redGlow,
          border: `1px solid ${COLORS.red}`,
          color: COLORS.red, padding: "6px 16px",
          fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
          fontFamily: "Verdana, Geneva, sans-serif", marginBottom: 32,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          IT Services & Digital Solutions
        </div>

        <h1 style={{
          fontFamily: "Verdana, Geneva, sans-serif",
          fontSize: "clamp(36px, 6vw, 78px)",
          fontWeight: 900, lineHeight: 1.05,
          color: COLORS.white, margin: "0 0 12px",
          maxWidth: 800,
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease 0.1s",
        }}>
          Engineering
          <br />
          <span style={{ color: COLORS.red }}>Digital</span> Excellence
        </h1>

        <p style={{
          fontFamily: "Verdana, Geneva, sans-serif",
          fontSize: "clamp(15px, 2vw, 19px)",
          color: COLORS.gray, maxWidth: 560,
          lineHeight: 1.7, margin: "0 0 48px",
          fontStyle: "italic",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease 0.2s",
        }}>
          "Transforming Ideas into Powerful Digital Realities — Building the Web, Apps & Experiences of Tomorrow."
        </p>

        <div style={{
          display: "flex", gap: 16, flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(30px)",
          transition: "all 0.7s ease 0.3s",
        }}>
          <button onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: COLORS.red, color: "#fff", border: "none",
              padding: "16px 36px", fontFamily: "Verdana, Geneva, sans-serif",
              fontSize: 14, letterSpacing: 2, textTransform: "uppercase",
              cursor: "pointer", fontWeight: 700,
              clipPath: "polygon(0 0, 94% 0, 100% 25%, 100% 100%, 6% 100%, 0 75%)",
              transition: "background 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { e.target.style.background = COLORS.redDark; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.background = COLORS.red; e.target.style.transform = "translateY(0)"; }}
          >
            Our Services
          </button>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "transparent", color: COLORS.white,
              border: `1px solid ${COLORS.charcoalMid}`,
              padding: "16px 36px", fontFamily: "Verdana, Geneva, sans-serif",
              fontSize: 14, letterSpacing: 2, textTransform: "uppercase",
              cursor: "pointer", fontWeight: 700,
              transition: "border-color 0.2s, color 0.2s, transform 0.2s",
            }}
            onMouseEnter={e => { e.target.style.borderColor = COLORS.red; e.target.style.color = COLORS.red; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.borderColor = COLORS.charcoalMid; e.target.style.color = COLORS.white; e.target.style.transform = "translateY(0)"; }}
          >
            Start a Project
          </button>
        </div>

        {/* Stats */}
        <div className="hero-stats" style={{
          display: "flex", gap: "clamp(24px, 5vw, 60px)", marginTop: 72, flexWrap: "wrap",
          opacity: loaded ? 1 : 0, transition: "all 0.7s ease 0.5s",
        }}>
          {STATS.map((s, i) => (
            <div key={i}>
              <div style={{ color: COLORS.red, fontFamily: "Verdana, Geneva, sans-serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 900 }}>{s.value}</div>
              <div style={{ color: COLORS.gray, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: 0.5,
      }}>
        <div style={{ color: COLORS.gray, fontSize: 10, letterSpacing: 3, textTransform: "uppercase" }}>Scroll</div>
        <div style={{
          width: 1, height: 40,
          background: `linear-gradient(to bottom, ${COLORS.red}, transparent)`,
          animation: "pulse 2s infinite",
        }} />
      </div>
    </section>
  );
}

function Services() {
  const [ref, inView] = useInView();
  return (
    <section id="services" ref={ref} style={{
      background: COLORS.charcoalLight,
      padding: "100px 5%",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", left: -100, top: "30%",
        width: 300, height: 300, borderRadius: "50%",
        background: COLORS.redGlow, filter: "blur(80px)",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: 64 }}>
          <div style={{
            color: COLORS.red, fontSize: 11, letterSpacing: 4,
            textTransform: "uppercase", fontFamily: "Verdana, Geneva, sans-serif",
            marginBottom: 16,
            opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)",
            transition: "all 0.6s ease",
          }}>What We Do</div>
          <h2 style={{
            fontFamily: "Verdana, Geneva, sans-serif", fontSize: "clamp(28px, 4.5vw, 50px)",
            fontWeight: 900, color: COLORS.white, margin: 0,
            opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)",
            transition: "all 0.6s ease 0.1s",
          }}>
            Our <span style={{ color: COLORS.red }}>Services</span>
          </h2>
        </div>

        <div className="services-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 24,
        }}>
          {SERVICES.map((svc, i) => (
            <div key={i}
              style={{
                background: COLORS.charcoalMid,
                border: `1px solid #333`,
                padding: "36px 32px",
                position: "relative", overflow: "hidden",
                cursor: "default",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.6s ease ${0.1 + i * 0.1}s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = COLORS.red;
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 16px 40px ${COLORS.redGlow}`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "#333";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, width: 3, height: "100%",
                background: COLORS.red, opacity: 0.6,
              }} />
              <div style={{ fontSize: 36, marginBottom: 20 }}>{svc.icon}</div>
              <h3 style={{
                fontFamily: "Verdana, Geneva, sans-serif", color: COLORS.white,
                fontSize: 20, fontWeight: 700, margin: "0 0 14px",
              }}>{svc.title}</h3>
              <p style={{
                color: COLORS.gray, fontSize: 14, lineHeight: 1.7, margin: 0,
              }}>{svc.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const [ref, inView] = useInView();
  return (
    <section id="about" ref={ref} style={{
      background: COLORS.charcoal,
      padding: "100px 5%",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", right: -80, bottom: "10%",
        width: 400, height: 400,
        background: COLORS.redGlow, filter: "blur(100px)",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div className="about-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px, 8vw, 100px)",
          alignItems: "center",
        }}>
          {/* Left: Visual */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-40px)",
            transition: "all 0.7s ease",
          }}>
            <div style={{
              position: "relative",
              background: COLORS.charcoalMid,
              border: `1px solid #333`,
              padding: 48,
              clipPath: "polygon(0 0, 92% 0, 100% 8%, 100% 100%, 8% 100%, 0 92%)",
            }}>
              <div style={{
                position: "absolute", top: 0, right: 0,
                width: 80, height: 80,
                background: COLORS.red, opacity: 0.15,
                clipPath: "polygon(100% 0, 0 0, 100% 100%)",
              }} />
              <div style={{ color: COLORS.red, fontSize: 48, marginBottom: 20 }}>⚙️</div>
              <div style={{ color: COLORS.white, fontFamily: "Verdana, Geneva, sans-serif", fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, lineHeight: 1.1 }}>
                Built on<br /><span style={{ color: COLORS.red }}>Trust &</span><br />Expertise
              </div>
              <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 12 }}>
                {["Client-First Approach", "Cutting-Edge Tech Stack", "On-Time Delivery"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 8, height: 8, background: COLORS.red, transform: "rotate(45deg)", flexShrink: 0 }} />
                    <span style={{ color: COLORS.grayLight, fontSize: 14 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Text */}
          <div style={{
            opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(40px)",
            transition: "all 0.7s ease 0.15s",
          }}>
            <div style={{ color: COLORS.red, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", fontFamily: "Verdana, Geneva, sans-serif", marginBottom: 16 }}>
              Who We Are
            </div>
            <h2 style={{
              fontFamily: "Verdana, Geneva, sans-serif", fontSize: "clamp(24px, 3.5vw, 42px)",
              fontWeight: 900, color: COLORS.white, margin: "0 0 24px", lineHeight: 1.15,
            }}>
              About <span style={{ color: COLORS.red }}>Rehmat Technologies</span>
            </h2>
            <p style={{ color: COLORS.gray, fontSize: 15, lineHeight: 1.8, margin: "0 0 20px" }}>
              Rehmat Technologies is a forward-thinking IT services firm founded by <strong style={{ color: COLORS.grayLight }}>Manjit</strong>, based in Mohali, India. We specialize in crafting robust digital solutions — from enterprise Drupal platforms to sleek Flutter mobile apps.
            </p>
            <p style={{ color: COLORS.gray, fontSize: 15, lineHeight: 1.8, margin: "0 0 36px" }}>
              We believe great software is born from deep understanding, sharp execution, and relentless attention to quality. Every project we take on is a commitment to excellence and long-term partnership.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Web & Mobile Expertise", pct: 95 },
                { label: "UI/UX Design", pct: 88 },
                { label: "Client Retention", pct: 97 },
              ].map((skill, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ color: COLORS.grayLight, fontSize: 13 }}>{skill.label}</span>
                    <span style={{ color: COLORS.red, fontSize: 13, fontWeight: 700 }}>{skill.pct}%</span>
                  </div>
                  <div style={{ height: 4, background: COLORS.charcoalMid, borderRadius: 2, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", background: `linear-gradient(to right, ${COLORS.red}, ${COLORS.redDark})`,
                      width: inView ? `${skill.pct}%` : "0%",
                      transition: `width 1s ease ${0.4 + i * 0.15}s`,
                      borderRadius: 2,
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [ref, inView] = useInView();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
  if (form.name && form.email && form.message) {

    emailjs.send(
      "service_memh8h6",       // ← replace with your Service ID
      "template_w63h5wl",      // ← replace with your Template ID
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
      },
      "QvhBz6z_5nJkyNgva"        // ← replace with your Public Key
    )
    .then(() => {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setForm({ name: "", email: "", message: "" });
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      alert("Something went wrong. Please try again.");
    });
  }
};

  const inputStyle = {
    width: "100%", background: COLORS.charcoalMid,
    border: `1px solid #444`, color: COLORS.white,
    padding: "14px 16px", fontFamily: "Verdana, Geneva, sans-serif", fontSize: 14,
    outline: "none", boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" ref={ref} style={{
      background: COLORS.charcoalLight,
      padding: "100px 5%",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", left: "40%", top: "20%",
        width: 500, height: 500,
        background: COLORS.redGlow, filter: "blur(120px)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{
            color: COLORS.red, fontSize: 11, letterSpacing: 4,
            textTransform: "uppercase", fontFamily: "Verdana, Geneva, sans-serif", marginBottom: 16,
            opacity: inView ? 1 : 0, transition: "all 0.6s ease",
          }}>Reach Out</div>
          <h2 style={{
            fontFamily: "Verdana, Geneva, sans-serif", fontSize: "clamp(28px, 4.5vw, 50px)",
            fontWeight: 900, color: COLORS.white, margin: 0,
            opacity: inView ? 1 : 0, transition: "all 0.6s ease 0.1s",
          }}>
            Let's <span style={{ color: COLORS.red }}>Work Together</span>
          </h2>
        </div>

        <div className="contact-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48,
          opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(30px)",
          transition: "all 0.7s ease 0.2s",
        }}>
          {/* Contact Info */}
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <h3 style={{ fontFamily: "Verdana, Geneva, sans-serif", color: COLORS.white, fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>
                Rehmat Technologies
              </h3>
              <p style={{ color: COLORS.gray, fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                Ready to build something great? Drop us a message and let's discuss your project.
              </p>
            </div>
            {[
              { icon: "📧", label: "Email", value: "rehmatech@gmail.com" },
              { icon: "📍", label: "Location", value: "Mohali, India" },
              { icon: "🌐", label: "Serving", value: "Global Clients" },
            ].map((info, i) => (
              <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{
                  width: 44, height: 44, background: COLORS.charcoalMid,
                  border: `1px solid #444`, display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 18, flexShrink: 0,
                }}>{info.icon}</div>
                <div>
                  <div style={{ color: COLORS.red, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{info.label}</div>
                  <div style={{ color: COLORS.grayLight, fontSize: 14 }}>{info.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div style={{
            background: COLORS.charcoalMid, border: `1px solid #333`,
            padding: 40,
            clipPath: "polygon(0 0, 97% 0, 100% 3%, 100% 100%, 3% 100%, 0 97%)",
          }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                <h3 style={{ color: COLORS.white, fontFamily: "Verdana, Geneva, sans-serif", fontSize: 22 }}>Message Sent!</h3>
                <p style={{ color: COLORS.gray, fontSize: 14 }}>We'll get back to you shortly.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <label style={{ color: COLORS.gray, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Your Name</label>
                  <input
                    style={inputStyle}
                    placeholder="John Doe"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    onFocus={e => e.target.style.borderColor = COLORS.red}
                    onBlur={e => e.target.style.borderColor = "#444"}
                  />
                </div>
                <div>
                  <label style={{ color: COLORS.gray, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email Address</label>
                  <input
                    style={inputStyle}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    onFocus={e => e.target.style.borderColor = COLORS.red}
                    onBlur={e => e.target.style.borderColor = "#444"}
                  />
                </div>
                <div>
                  <label style={{ color: COLORS.gray, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Message</label>
                  <textarea
                    style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
                    placeholder="Tell us about your project..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={e => e.target.style.borderColor = COLORS.red}
                    onBlur={e => e.target.style.borderColor = "#444"}
                  />
                </div>
                <button onClick={handleSubmit}
                  style={{
                    background: COLORS.red, color: "#fff", border: "none",
                    padding: "16px", fontFamily: "Verdana, Geneva, sans-serif",
                    fontSize: 14, letterSpacing: 2, textTransform: "uppercase",
                    cursor: "pointer", fontWeight: 700, width: "100%",
                    clipPath: "polygon(0 0, 96% 0, 100% 20%, 100% 100%, 4% 100%, 0 80%)",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.target.style.background = COLORS.redDark}
                  onMouseLeave={e => e.target.style.background = COLORS.red}
                >
                  Send Message →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      background: "#111", borderTop: `1px solid #222`,
      padding: "32px 5%",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 16,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <svg width="40" height="36" viewBox="0 0 80 72" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="80" height="72" rx="10" fill="#1a1a1a"/>
          <rect x="0" y="0" width="80" height="72" rx="10" fill="none" stroke="#e02020" strokeWidth="1.2" opacity="0.35"/>
          <text x="5" y="47" fill="#e02020" fontSize="27" fontWeight="900" fontFamily="monospace">&lt;</text>
          <text x="30" y="47" fill="#ffffff" fontSize="24" fontWeight="900" fontFamily="Verdana, Geneva, sans-serif">R</text>
          <text x="46" y="47" fill="#e02020" fontSize="27" fontWeight="900" fontFamily="monospace">/&gt;</text>
          <rect x="0" y="61" width="80" height="6" fill="#e02020"/>
          <rect x="0" y="67" width="80" height="5" fill="#b01010" opacity="0.4"/>
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 900, fontFamily: "Verdana, Geneva, sans-serif", color: COLORS.grayLight, letterSpacing: 1, lineHeight: 1 }}>Rehmat</div>
          <div style={{ fontSize: 9, fontFamily: "monospace", color: COLORS.red, letterSpacing: 2, fontWeight: 700 }}>{"// Technologies"}</div>
        </div>
      </div>
      <div style={{ color: COLORS.gray, fontSize: 12 }}>
        © {new Date().getFullYear()} Rehmat Technologies. All rights reserved.
      </div>
      <div style={{ color: COLORS.gray, fontSize: 12 }}>
        Mohali, India · <a href="mailto:rehmatech@gmail.com" style={{ color: COLORS.red, textDecoration: "none" }}>rehmatech@gmail.com</a>
      </div>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const sections = ["home", "services", "about", "contact"];
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setActive(id.charAt(0).toUpperCase() + id.slice(1));
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "Verdana, Geneva, sans-serif", background: COLORS.charcoal, width: "100%", minHeight: "100vh" }}>
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        *:focus { outline: 2px solid #e02020; outline-offset: 2px; }
        *:focus:not(:focus-visible) { outline: none; }
        *:focus-visible { outline: 2px solid #e02020; outline-offset: 2px; }
        button:focus { outline: 2px solid #e02020; outline-offset: 2px; }
        input:focus, textarea:focus { outline: none; }
        a:focus { outline: 2px solid #e02020; outline-offset: 2px; }
        html, body, #root { width: 100%; min-height: 100vh; overflow-x: hidden; scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        @keyframes pulse { 0%, 100% { opacity: 0.5; transform: scaleY(1); } 50% { opacity: 1; transform: scaleY(1.1); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.red}; border-radius: 3px; }
        section { width: 100%; }
        nav { width: 100%; }
        footer { width: 100%; }

        /* ── Tablet (768px – 1024px) ── */
        @media (max-width: 1024px) {
          .desktop-nav { gap: 20px !important; }
        }

        /* ── Mobile (max 768px) ── */
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .desktop-cta { display: none !important; }
          .mobile-menu-btn { display: flex !important; }

          /* Hero */
          #home { padding: 90px 6% 50px !important; }
          #home h1 { font-size: 36px !important; }
          #home .hero-buttons { flex-direction: column !important; }
          #home .hero-buttons button { width: 100% !important; text-align: center !important; }
          #home .hero-stats { gap: 24px !important; flex-wrap: wrap !important; }

          /* Services */
          #services { padding: 70px 6% !important; }
          #services .services-grid { grid-template-columns: 1fr !important; }

          /* About */
          #about { padding: 70px 6% !important; }
          #about .about-grid { grid-template-columns: 1fr !important; }

          /* Contact */
          #contact { padding: 70px 6% !important; }
          #contact .contact-grid { grid-template-columns: 1fr !important; }

          /* Footer */
          footer { flex-direction: column !important; text-align: center !important; align-items: center !important; padding: 24px 6% !important; gap: 12px !important; }
        }

        /* ── Small mobile (max 480px) ── */
        @media (max-width: 480px) {
          #home h1 { font-size: 30px !important; }
          #home .hero-stats { gap: 16px !important; }
          #home .hero-stats > div { min-width: 40% !important; }
        }
      `}</style>
      <Navbar active={active} setActive={setActive} />
      <Hero setActive={setActive} />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
