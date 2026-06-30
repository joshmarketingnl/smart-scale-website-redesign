(() => {
  const qs = (s, ctx = document) => ctx.querySelector(s);
  const qsa = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let chatStarted = false;
  // Speech-bubble icon used on the chat launcher (pre-load button + n8n toggle), so both look identical.
  const CHAT_ICON_URI = "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%20fill='none'%20stroke='%230d0b06'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'%3E%3Cpath%20d='M21%2011.5a8.38%208.38%200%200%201-.9%203.8%208.5%208.5%200%200%201-7.6%204.7%208.38%208.38%200%200%201-3.8-.9L3%2021l1.9-5.7a8.38%208.38%200%200%201-.9-3.8%208.5%208.5%200%200%201%204.7-7.6%208.38%208.38%200%200%201%203.8-.9h.5a8.48%208.48%200%200%201%208%208v.5z'/%3E%3C/svg%3E";
  const setInlineStyles = (el, styles) => {
    if (!el || !styles) return;
    Object.entries(styles).forEach(([key, val]) => {
      el.style[key] = val;
    });
  };

  const forceLeftAlign = (root = document) => {
    const headerSelectors = [".jm-header", ".n8n-chat__header", ".n8n-chat__panel header", ".cs-header", ".cs-title"];
    headerSelectors.forEach((sel) => {
      qsa(sel, root).forEach((el) =>
        setInlineStyles(el, {
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          textAlign: "left",
          gap: "8px",
        })
      );
    });
    qsa(".n8n-chat__messages, .cs-messages", root).forEach((el) =>
      setInlineStyles(el, { alignItems: "flex-start", textAlign: "left" })
    );
    qsa(
      ".n8n-chat__message, .n8n-chat__message--bot, .n8n-chat__message--assistant, .n8n-chat__message--user, .cs-message, .cs-message--assistant, .cs-message--user",
      root
    ).forEach((el) =>
      setInlineStyles(el, { alignItems: "flex-start", justifyContent: "flex-start", textAlign: "left" })
    );
  };

  const forceYellowButtons = (root = document) => {
    const yellowSelectors = [
      ".jm-chat-launcher",
      ".jm-button",
      ".n8n-chat__toggle",
      ".n8n-chat__footer button[type='submit']",
      ".n8n-chat__quick-replies button",
      ".n8n-chat__cta button",
      ".cs-launcher",
      ".cs-button",
      ".cs-button-primary",
      ".cs-chat-button",
      ".cs-submit-button",
    ];
    yellowSelectors.forEach((sel) => {
      qsa(sel, root).forEach((el) =>
        setInlineStyles(el, {
          background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
          color: "#0d0b06",
          borderColor: "var(--accent)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        })
      );
    });
  };

  const enforceChatUI = () => {
    forceLeftAlign(document);
    forceYellowButtons(document);
    const rispose = qs("cs-widget, .cs-widget");
    if (rispose?.shadowRoot) {
      forceLeftAlign(rispose.shadowRoot);
      forceYellowButtons(rispose.shadowRoot);
    }
  };

  function initNav() {
    const toggle = qs(".nav-toggle");
    const menu = qs(".nav-links");
    const demoItem = qs(".nav-item-demo");
    const demoSub = qs(".nav-submenu");
    let hideTimer;
    if (!toggle || !menu) return;
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      menu.classList.toggle("open");
    });
    qsa(".nav-links a").forEach((link) =>
      link.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );

    if (demoItem && demoSub) {
      const demoLink = demoItem.querySelector("a");
      const open = () => {
        clearTimeout(hideTimer);
        demoItem.classList.add("open");
      };
      const close = () => {
        hideTimer = setTimeout(() => demoItem.classList.remove("open"), 180);
      };
      demoItem.addEventListener("mouseenter", open);
      demoItem.addEventListener("mouseleave", close);
      demoSub.addEventListener("mouseenter", open);
      demoSub.addEventListener("mouseleave", close);
      // Desktop hover handles open; on mobile submenu is always visible, so no toggle logic needed.
    }
  }

  function initSmoothScroll() {
    qsa('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const targetId = anchor.getAttribute("href").slice(1);
        const target = targetId ? qs(`#${targetId}`) : null;
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
        }
      });
    });
  }

  function initReveal() {
    if (prefersReducedMotion) {
      qsa("[data-reveal]").forEach((el) => el.classList.add("revealed"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    qsa("[data-reveal]").forEach((el) => observer.observe(el));
  }

  function initAccordion() {
    qsa("[data-accordion]").forEach((item) => {
      const btn = qs(".faq-question", item);
      const ans = qs(".faq-answer", item);
      if (!btn || !ans) return;
      btn.addEventListener("click", () => {
        const open = item.classList.contains("active");
        qsa("[data-accordion]").forEach((el) => el.classList.remove("active"));
        if (!open) item.classList.add("active");
      });
    });
  }

  function initParallax() {
    const el = qs("[data-parallax]");
    if (!el || prefersReducedMotion) return;
    const strength = 14;
    document.addEventListener("pointermove", (evt) => {
      const { innerWidth, innerHeight } = window;
      const x = (evt.clientX / innerWidth - 0.5) * strength;
      const y = (evt.clientY / innerHeight - 0.5) * strength;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  function initTypewriter() {
    const target = qs("[data-typewriter]");
    if (!target) return;
    const rawText = target.dataset.typewriterText || target.textContent || "";
    const fullText = rawText.replace(/\r?\n/g, "\n").trim();
    if (!fullText) return;
    if (prefersReducedMotion) {
      target.innerHTML = fullText.replace(/\n/g, "<br>");
      return;
    }
    target.setAttribute("aria-live", "polite");
    target.classList.add("typewriter");
    target.textContent = "";
    const ghost = document.createElement("span");
    ghost.className = "typewriter-ghost";
    ghost.textContent = fullText;
    ghost.setAttribute("aria-hidden", "true");
    const live = document.createElement("span");
    live.className = "typewriter-live";
    target.append(ghost, live);
    const typeDelay = 61.56;
    const blankPause = 0;
    const cycleDelay = 5000;

    const runCycle = () => {
      live.classList.remove("typewriter-done");
      let index = 0;
      const step = () => {
        if (index <= fullText.length) {
          live.textContent = fullText.slice(0, index);
          index++;
          setTimeout(step, typeDelay);
        } else {
          live.classList.add("typewriter-done");
          setTimeout(() => {
            live.textContent = "";
            live.classList.remove("typewriter-done");
            setTimeout(runCycle, blankPause);
          }, cycleDelay);
        }
      };
      step();
    };
    runCycle();
  }

  async function initRealChat() {
    const mode = document.body.dataset.chatMode;
    if (mode === "rispose") return;
    const path = location.pathname.replace(/\/+$/, "") || "/";
    const imagesBase = location.protocol === "file:" ? "images" : "/images";
    const configMap = {
      shopify: {
        webhookUrl: "https://n8n.srv1160115.hstgr.cloud/webhook/c38073cd-b1c3-401f-ba69-abd8db13d5b1/chat",
        primary: "#fbbf24",
        secondary: "#f59e0b",
        headerName: "Kast-bot",
        headerSubtitle: "Persoonlijk advies dat bij jou KAST",
        profileUrl: "https://i.postimg.cc/DztW036D/ffedaa1c-4e42-4c2e-9cb2-f2b835d4d59e-1.png",
        welcome: "Yo! Welkom bij Kosso Nutrition - hier draait alles om groei, discipline en kwaliteit. Hoe kan ik je helpen?",
      },
      garage: {
        webhookUrl: "https://n8n.srv1160115.hstgr.cloud/webhook/f68007c2-4b6a-4e91-b1ae-d36ae45158a9/chat",
        primary: "#E53E3E",
        secondary: "#C53030",
        headerName: "Mike",
        headerSubtitle: "Uw digitale monteur",
        profileUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
        welcome: "Welkom bij DrivePro! Mijn naam is Mike. Vragen over een APK, onderhoud of reparatie? Ik help je direct!",
      },
      schoonheid: {
        webhookUrl: "https://n8n.srv1160115.hstgr.cloud/webhook/aeb6b74d-d188-42b1-a024-8bd4a81c7671/chat",
        primary: "#D4AFB9",
        secondary: "#b899a2",
        headerName: "Chloé",
        headerSubtitle: "Uw beauty adviseur",
        profileUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
        welcome: "Hallo! Ik ben Chloé van LUMINA. Ik help je graag met het vinden van de perfecte behandeling of het boeken van een afspraak.",
      },
      default: {
        webhookUrl: "https://n8n.srv1160115.hstgr.cloud/webhook/dfbbd7ea-36bc-4d39-a70d-b2e867823f4f/chat",
        primary: "#fbbf24",
        secondary: "#f59e0b",
        headerName: "Joshua",
        headerSubtitle: "Stel gerust uw vragen",
        profileUrl: `${imagesBase}/joshua-profiel-48.jpg`,
        profileUrl2x: `${imagesBase}/joshua-profiel-96.jpg`,
        welcome: "Hallo, mijn naam is Joshua. Hoe kan ik u helpen?\n\nIk kan u helpen door vragen te beantwoorden over Smart-Scale of zelfs een afspraak voor u in te plannen!",
      },
    };

    const selected =
      path.includes("garage") ? configMap.garage :
      path.includes("schoonheid") ? configMap.schoonheid :
      path.includes("shopify") ? configMap.shopify :
      configMap.default;

    if (!selected) return;

    if (!document.getElementById("n8n-chat-style")) {
      const link = document.createElement("link");
      link.id = "n8n-chat-style";
      link.rel = "stylesheet";
      link.href = "https://cdn.jsdelivr.net/npm/@n8n/chat/dist/style.css";
      document.head.appendChild(link);
    }

    const style = document.createElement("style");
    style.id = "n8n-chat-custom-style";
    style.textContent = `
      :root { --jm-primary: ${selected.primary}; --jm-primary-dark: ${selected.secondary}; }
      /* Never clip the launcher button so it stays a full circle. */
      .chat-window-wrapper, .n8n-chat, .chat-window-toggle, .n8n-chat__toggle { overflow: visible !important; }
      /* Hide n8n's default icon and render one consistent, fully-round speech-bubble launcher. */
      .n8n-chat__toggle, .chat-window-toggle {
        position: relative !important;
        width: 62px !important;
        height: 62px !important;
        border: 1px solid ${selected.primary} !important;
        border-radius: 50% !important;
        background-image: url("${CHAT_ICON_URI}"), linear-gradient(135deg, ${selected.primary}, ${selected.secondary}) !important;
        background-repeat: no-repeat, no-repeat !important;
        background-position: center, center !important;
        background-size: 28px 28px, auto !important;
        box-shadow: 0 16px 40px rgba(0,0,0,0.35) !important;
      }
      .n8n-chat__toggle > *, .chat-window-toggle > * { visibility: hidden !important; }
      .n8n-chat__panel header { background: #fbbf24 !important; color: #000000 !important; }
      .n8n-chat__footer button[type="submit"] { background: ${selected.primary} !important; border-color: ${selected.primary} !important; color: #fff !important; }
    `;
    document.head.appendChild(style);

    const { createChat } = await import("https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js");
    createChat({ webhookUrl: selected.webhookUrl, useShadowDom: false });

    // Apply custom header/profile/welcome similar to dist build
    const applyHeader = () => {
      const headerSelectors = [
        ".n8n-chat__header",
        ".chat-header",
        ".chat-heading",
        ".n8n-chat__panel header",
        ".widget-header",
        ".chat-widget-header",
      ];
      for (const sel of headerSelectors) {
        const el = qs(sel);
        if (!el) continue;
        const container = el.classList.contains("chat-header") ? el : el.closest(".chat-header");
        const isCard = Boolean(container && container.closest(".card"));
        const textColor = isCard ? "#ffffff" : "#000000";
        const objectPosition = selected.headerName === "Mike" ? "right center" : "center";
        const srcset = selected.profileUrl2x
          ? `${selected.profileUrl} 1x, ${selected.profileUrl2x} 2x`
          : "";
        const srcsetAttr = srcset ? `srcset="${srcset}"` : "";
        el.innerHTML = `
          <div class="jm-header" style="display:flex;align-items:center;gap:8px;justify-content:flex-start;text-align:left;color:${textColor} !important;">
            <img class="jm-header__img" src="${selected.profileUrl}" ${srcsetAttr} alt="${selected.headerName}" width="48" height="48" loading="lazy" decoding="async" style="width:48px;height:48px;border-radius:50%;object-fit:cover;object-position:${objectPosition};border:1px solid rgba(255,255,255,0.08);">
            <div style="color:${textColor} !important;font-weight:600;font-size:18px;line-height:1.2;">
              ${selected.headerName}
              <div style="color:${textColor} !important;font-size:13px;font-weight:400;margin-top:2px;line-height:1.2;">
                ${selected.headerSubtitle}
              </div>
            </div>
          </div>
        `;
        setInlineStyles(el, {
          background: "#fbbf24",
          color: textColor,
        });
        if (container) {
          const containerStyles = {
            background: isCard ? "transparent" : "#fbbf24",
            color: isCard ? "#fff" : "#000000",
          };
          if (isCard) containerStyles.paddingBottom = "20px";
          setInlineStyles(container, containerStyles);
        }
        // Remove default subtitle paragraphs like "Start a chat..."
        qsa("p", el.parentElement || el).forEach((p) => p.remove());
      }
      qsa(".card .chat-header, .card .chat-heading").forEach((cardHeader) =>
        setInlineStyles(cardHeader, { background: "transparent", color: "#fff", paddingBottom: "20px" })
      );
    };

    const applyWelcome = () => {
      const bubbles = qsa(".chat-message, .message, .bot-message, .n8n-chat__message, .bot, .message--bot");
      if (!bubbles.length) return;
      const primary = bubbles.find((b) => {
        const text = (b.textContent || "").trim();
        return !text || /hallo|welkom|hi|hey/i.test(text) || text.length < 200;
      }) || bubbles[0];
      const welcome = selected.welcome || primary.textContent || "";
      primary.textContent = welcome;
      bubbles.forEach((b) => {
        const text = (b.textContent || "").trim();
        if (b !== primary && (/my name is|how can i help/i.test(text) || text.length === 0)) {
          b.remove();
        }
      });
    };

    const recolor = () => {
      const toggle = qs(".n8n-chat__toggle") || qs(".chat-window-toggle");
      if (toggle) {
        toggle.style.background = "linear-gradient(135deg, var(--accent), var(--accent-2))";
        toggle.style.border = "1px solid var(--accent)";
        toggle.style.boxShadow = "0 10px 30px rgba(0,0,0,0.25)";
        toggle.style.color = "#0d0b06";
        toggle.classList.add("jm-cta-yellow");
      }
      qsa(".n8n-chat__panel header, .chat-header, .chat-heading, .chat-widget-header, .widget-header").forEach((heading) => {
        heading.style.background = "#fbbf24";
        heading.style.color = "#000000";
      });
      const sendBtn =
        qs(".n8n-chat__footer button[type='submit']") ||
        qs(".chat-input-send-button") ||
        qs(".chat-inputs-controls button");
      if (sendBtn) {
        sendBtn.classList.add("jm-cta-yellow");
        sendBtn.style.background = "var(--accent)";
        sendBtn.style.borderColor = "var(--accent)";
        sendBtn.style.color = "#0d0b06";
      }
      qsa(".n8n-chat__toggle, .chat-window-toggle").forEach((el) => el.classList.add("jm-cta-yellow"));
      qsa(".n8n-chat__quick-replies button, .n8n-chat__cta button, .chat-inputs-controls button, .chat-input-send-button").forEach((el) =>
        el.classList.add("jm-cta-yellow")
      );
    };

    const alignAndColor = () => {
      enforceChatUI();
    };

    const tryApply = () => {
      applyHeader();
      applyWelcome();
      recolor();
      alignAndColor();
    };

    setTimeout(tryApply, 400);
    setTimeout(tryApply, 1000);
    setTimeout(tryApply, 2000);
  }

  function hideRisposeFooter() {
    const widget = qs("cs-widget, .cs-widget");
    if (!widget) return false;
    const tryHideBySelector = (root) => {
      if (!root?.querySelectorAll) return false;
      const candidates = root.querySelectorAll(".text-xs.text-stone-500.border-t, .border-t.border-stone-200");
      const footer =
        candidates[0] ||
        Array.from(root.querySelectorAll("*")).find((el) => (el.textContent || "").toLowerCase().includes("powered by rispose"));
      if (footer) {
        footer.style.display = "none";
        footer.setAttribute("data-hidden", "true");
        return true;
      }
      return false;
    };

    const hiddenInLightDom = tryHideBySelector(widget);
    const hiddenInShadow = widget.shadowRoot ? tryHideBySelector(widget.shadowRoot) : false;

    if (hiddenInLightDom || hiddenInShadow) {
      enforceChatUI();
      return true;
    }

    widget.style.overflow = "hidden";
    widget.style.clipPath = "inset(0 0 28px 0)";
    widget.dataset.risposeFooterCropped = "true";
    enforceChatUI();
    return true;
  }

  function createChatLauncher(onClick) {
    if (qs("#jm-chat-launcher")) return qs("#jm-chat-launcher");
    const launcher = document.createElement("button");
    launcher.id = "jm-chat-launcher";
    launcher.className = "jm-chat-launcher";
    launcher.type = "button";
    launcher.setAttribute("aria-label", "Open chat");
    setInlineStyles(launcher, {
      position: "fixed",
      right: "22px",
      bottom: "22px",
      width: "62px",
      height: "62px",
      borderRadius: "50%",
      border: "1px solid var(--accent)",
      backgroundImage: `url("${CHAT_ICON_URI}"), linear-gradient(135deg, var(--accent), var(--accent-2))`,
      backgroundRepeat: "no-repeat, no-repeat",
      backgroundPosition: "center, center",
      backgroundSize: "28px 28px, auto",
      boxShadow: "0 16px 40px rgba(0, 0, 0, 0.35)",
      cursor: "pointer",
      zIndex: "40",
    });
    if (onClick) launcher.addEventListener("click", onClick);
    document.body.appendChild(launcher);
    return launcher;
  }

  function scheduleChatInit() {
    let launcher = null;
    const startChat = () => {
      if (chatStarted) return;
      chatStarted = true;
      if (launcher) {
        launcher.setAttribute("aria-busy", "true");
        launcher.style.opacity = "0.7";
      }
      initRealChat();
      let tries = 0;
      const timer = setInterval(() => {
        const toggle = qs(".n8n-chat__toggle") || qs(".chat-window-toggle");
        if (toggle) {
          if (launcher) launcher.remove();
          toggle.click();
          clearInterval(timer);
          return;
        }
        if (tries > 20) {
          if (launcher) {
            launcher.removeAttribute("aria-busy");
            launcher.style.opacity = "1";
          }
          chatStarted = false;
          clearInterval(timer);
        }
        tries++;
      }, 250);
    };
    launcher = createChatLauncher(startChat);
  }

  // Homepage scroll storytelling (GSAP + ScrollTrigger). Only runs on pages that
  // load GSAP and contain the relevant sections, so other pages are unaffected.
  function initHomeMotion() {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    if (!gsap) return;

    // Reduced motion: keep everything visible and static, no pinning or scrubbing.
    if (prefersReducedMotion) {
      qsa(".voice-step").forEach((s) => s.classList.add("is-active"));
      return;
    }
    if (!ScrollTrigger) return;
    gsap.registerPlugin(ScrollTrigger);

    // --- 1. Voicebot sticky stage: premium AI voice-processing visual ---
    const stage = qs(".voice-stage");
    if (stage) {
      const inPaths = qsa(".vc-in", stage);
      const outPath = qs(".vc-out", stage);
      const glow = qs(".vc-glow", stage);
      const coreRing = qs(".vc-ring-core", stage);
      const coreDot = qs(".vc-core-dot", stage);
      const orbitNodes = qsa(".vc-node", stage);
      const dataPts = qsa(".vc-data circle", stage);
      const cards = qsa(".vc-card", stage);
      const steps = qsa(".voice-step", stage);

      // Where each data point starts along the incoming wave (SVG coords, core at 250,240).
      const dataStart = [
        { x: 32, y: 240 }, { x: 78, y: 212 }, { x: 120, y: 268 }, { x: 162, y: 226 },
      ];

      const prepDraw = (path) => {
        if (!path || typeof path.getTotalLength !== "function") return;
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      };

      const mm = gsap.matchMedia();

      // Desktop: pinned, scrubbed 5-phase storytelling.
      mm.add("(min-width: 901px)", () => {
        inPaths.forEach(prepDraw);
        prepDraw(outPath);
        // Resting state still reads as a present AI core (calm, not empty).
        gsap.set(glow, { opacity: 0.26, scale: 0.94 });
        gsap.set(coreRing, { scale: 0.95, opacity: 0.6 });
        gsap.set(coreDot, { scale: 0.92, opacity: 0.9 });
        gsap.set(orbitNodes, { opacity: 0.45 });
        dataPts.forEach((d, i) => gsap.set(d, { attr: { cx: dataStart[i].x, cy: dataStart[i].y }, opacity: 0 }));
        gsap.set(cards, { opacity: 0, y: 8 });

        const tl = gsap.timeline({
          defaults: { ease: "power1.inOut" },
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=3000",
            scrub: 1,
            pin: ".voice-sticky",
            anticipatePin: 1,
          },
        });

        // Phase 1 - inkomende voice wave tekent zich.
        tl.to(inPaths, { strokeDashoffset: 0, duration: 1, stagger: 0.2 }, 0)
          .to(cards[0], { opacity: 1, y: 0, duration: 0.5 }, 0.55);
        // Phase 2 - datapunten bewegen rustig naar de core.
        tl.to(dataPts, { opacity: 1, duration: 0.3, stagger: 0.12 }, 1.15)
          .to(dataPts, { attr: { cx: 250, cy: 240 }, duration: 1, stagger: 0.12, ease: "power2.in" }, 1.15)
          .to(dataPts, { opacity: 0, duration: 0.25, stagger: 0.12 }, 2.0)
          .to(orbitNodes, { opacity: 1, duration: 0.5, stagger: 0.06 }, 1.8)
          .to(cards[1], { opacity: 1, y: 0, duration: 0.5 }, 1.7);
        // Phase 3 - core licht subtiel op.
        tl.to(glow, { opacity: 0.5, scale: 1.04, duration: 0.7 }, 2.3)
          .to(coreRing, { scale: 1.06, opacity: 0.8, duration: 0.7 }, 2.3)
          .to(coreDot, { scale: 1.1, opacity: 1, duration: 0.7 }, 2.3);
        // Phase 4 - antwoord-wave komt terug uit de core.
        tl.to(outPath, { strokeDashoffset: 0, duration: 1 }, 2.9)
          .to(cards[2], { opacity: 1, y: 0, duration: 0.5 }, 3.2);
        // Phase 5 - alles komt tot rust, laatste actiecard verschijnt.
        tl.to(glow, { opacity: 0.38, scale: 1, duration: 0.6 }, 3.7)
          .to(coreRing, { scale: 1, duration: 0.6 }, 3.7)
          .to(cards[3], { opacity: 1, y: 0, duration: 0.5 }, 3.7);

        // Highlight the matching text step per scroll progress.
        const stepTrigger = ScrollTrigger.create({
          trigger: stage,
          start: "top top",
          end: "+=3000",
          onUpdate: (self) => {
            const i = Math.min(steps.length - 1, Math.floor(self.progress * steps.length));
            steps.forEach((s, idx) => s.classList.toggle("is-active", idx === i));
          },
        });

        return () => {
          stepTrigger.kill();
          steps.forEach((s) => s.classList.remove("is-active"));
        };
      });

      // Mobile/tablet: no pin. Show a complete, calm static visual; highlight all steps.
      mm.add("(max-width: 900px)", () => {
        gsap.set(glow, { opacity: 0.4 });
        gsap.set(coreRing, { opacity: 0.65 });
        gsap.set(coreDot, { opacity: 1 });
        gsap.set(orbitNodes, { opacity: 1 });
        gsap.set(dataPts, { opacity: 0 });
        gsap.set(cards, { opacity: 1, y: 0 });
        steps.forEach((s) => s.classList.add("is-active"));
        return () => steps.forEach((s) => s.classList.remove("is-active"));
      });
    }

    // --- 2. Websites self-build ---
    const build = qs(".build-browser");
    if (build) {
      const layers = qsa("[data-build]", build);
      gsap.set(layers, { opacity: 0, y: 16 });
      gsap.timeline({
        scrollTrigger: { trigger: ".websites-stage", start: "top 72%", end: "center 55%", scrub: 1 },
      }).to(layers, { opacity: 1, y: 0, stagger: 0.5, duration: 1 });
    }

    // --- 3. Automations golden line ---
    const flow = qs(".flow");
    if (flow) {
      const draw = qs(".flow-line__draw", flow);
      if (draw && typeof draw.getTotalLength === "function") {
        const len = draw.getTotalLength();
        gsap.set(draw, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(draw, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: flow, start: "top 75%", end: "bottom 80%", scrub: 1 },
        });
      }
      const cards = qsa(".flow-card", flow);
      gsap.set(cards, { opacity: 0, y: 22 });
      ScrollTrigger.batch(cards, {
        start: "top 85%",
        onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, overwrite: true }),
      });
    }

    // --- Generic fade-ins for remaining sections ---
    const fades = qsa("[data-fade]").filter((el) => !el.closest(".flow"));
    if (fades.length) {
      gsap.set(fades, { opacity: 0, y: 20 });
      ScrollTrigger.batch(fades, {
        start: "top 88%",
        onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, overwrite: true }),
      });
    }

    ScrollTrigger.refresh();
  }

  function init() {
    initNav();
    initSmoothScroll();
    initReveal();
    initTypewriter();
    initAccordion();
    initParallax();
    initHomeMotion();
    scheduleChatInit();
    let tries = 0;
    const footerTimer = setInterval(() => {
      if (hideRisposeFooter() || tries > 25) clearInterval(footerTimer);
      tries++;
    }, 300);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
