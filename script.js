const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

const revealTargets = document.querySelectorAll("[data-reveal]");
const terminal = document.querySelector("[data-terminal]");
const terminalOutput = document.getElementById("terminalOutput");
const runDeck = document.getElementById("runDeck");
const metricList = document.getElementById("metricList");
const tagGrid = document.getElementById("tagGrid");
const sparkline = document.getElementById("sparkline");
const sparklineWrap = document.querySelector(".sparkline");
const playbackProgress = document.getElementById("playbackProgress");
const playbackNodes = document.querySelectorAll(".playback-node");
const runId = document.getElementById("runId");
const runEpoch = document.getElementById("runEpoch");
const runFocus = document.getElementById("runFocus");
const evalTag = document.getElementById("evalTag");
const runButtons = document.querySelectorAll("[data-run]");
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          entry.target
            .querySelectorAll(".metric-bar")
            .forEach((bar) => bar.classList.add("is-visible"));
          entry.target
            .querySelectorAll(".sparkline")
            .forEach((chart) => chart.classList.add("is-visible"));
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealTargets.forEach((target) => observer.observe(target));
} else {
  revealTargets.forEach((target) => {
    target.classList.add("is-visible");
    target
      .querySelectorAll(".metric-bar")
      .forEach((bar) => bar.classList.add("is-visible"));
    target
      .querySelectorAll(".sparkline")
      .forEach((chart) => chart.classList.add("is-visible"));
  });
}

const runPresets = {
  experience: {
    id: "RUN-EX-042",
    epoch: "Mar 2024",
    focus: "Delivery",
    evalTag: "ops-ready",
    playback: 0.8,
    terminal: [
      "boot: vwp-model-card v1.0",
      "mode: experience_run",
      "objective: ship end-to-end systems with auditability",
      "latest: Gioia Beauty booking backend (Firebase)",
      "previous: Klimakampen Lambda flows | Auditdata IOTA storage",
      "signal: stakeholder alignment stable",
    ],
    cards: [
      {
        metaLeft: "Gioia Beauty · Piacenza",
        metaRight: "Mar 2024",
        title: "Freelance Full Stack Developer",
        bullets: [
          "Delivered booking solution from requirements to deployment and handover.",
          "Built Firebase backend for appointments, availability, and services.",
          "Shipped auth, validation, and operational logging for reliability.",
        ],
      },
      {
        metaLeft: "Klimakampen · Copenhagen",
        metaRight: "Aug–Oct 2023",
        title: "Software Developer Intern",
        bullets: [
          "Supported a production React Native app with backend data flows.",
          "Built AWS Lambda + DynamoDB services with validation and error handling.",
        ],
      },
      {
        metaLeft: "Auditdata · Copenhagen",
        metaRight: "Jan–Jun 2022",
        title: "Software Developer Intern",
        bullets: [
          "Implemented calibration storage on IOTA for tamper-evident records.",
          "Designed ingestion + retrieval flows and a React inspection UI.",
        ],
      },
    ],
    metrics: [
      { name: "End-to-end delivery", value: 0.9 },
      { name: "Operational readiness", value: 0.86 },
      { name: "Stakeholder comms", value: 0.88 },
    ],
    tags: [
      "Firebase",
      "AWS Lambda",
      "DynamoDB",
      "React Native",
      "IOTA",
      "React",
    ],
    spark: [0.25, 0.35, 0.48, 0.52, 0.6, 0.64, 0.7, 0.76, 0.82, 0.9],
  },
  education: {
    id: "RUN-ED-031",
    epoch: "Jun 2026",
    focus: "Research",
    evalTag: "in-progress",
    playback: 1,
    terminal: [
      "mode: education_run",
      "trajectory: systems + security + RL",
      "MSc Computer Science — Roskilde University (Expected Jun 2026)",
      "Supplementary IT security — Copenhagen School of Design and Tech",
      "Bachelor of Web Development + AP Degree in CS",
      "signal: coursework aligned with audit-friendly AI systems",
    ],
    cards: [
      {
        metaLeft: "Roskilde University",
        metaRight: "Aug 2024 – Jun 2026",
        title: "MSc Computer Science",
        body: "Reinforcement learning, reproducible experimentation, and system accountability.",
      },
      {
        metaLeft: "Copenhagen School of Design and Tech",
        metaRight: "Jan–Jul 2024",
        title: "IT Security Coursework",
        body: "Security fundamentals, privacy-first design, and responsible delivery.",
      },
      {
        metaLeft: "Copenhagen School of Design and Tech",
        metaRight: "2018–2024",
        title: "AP Degree + Bachelor (Web Development)",
        body: "Full-stack delivery, production workflows, and product-ready handover.",
      },
    ],
    metrics: [
      { name: "Systems depth", value: 0.84 },
      { name: "Security focus", value: 0.82 },
      { name: "Research clarity", value: 0.8 },
    ],
    tags: ["Computer Science", "Security", "Product Delivery", "Research"],
    spark: [0.18, 0.28, 0.38, 0.5, 0.62, 0.66, 0.7, 0.74, 0.78, 0.82],
  },
  projects: {
    id: "RUN-PR-119",
    epoch: "2024",
    focus: "Reproducibility",
    evalTag: "deterministic",
    playback: 0.8,
    terminal: [
      "mode: project_run",
      "thesis: RL Agent for Weiss Schwarz",
      "env: deterministic simulator + fixed action space",
      "tooling: reproducible runs, evaluation scripts, debug utilities",
      "side quests: Pokémon Showdown PPO, DDS Secure Chat (E2EE)",
      "signal: experiments traceable & repeatable",
    ],
    cards: [
      {
        metaLeft: "MSc Thesis",
        metaRight: "2024–2026",
        title: "RL Agent for Weiss Schwarz",
        bullets: [
          "Reproducible training runs with evaluation and debugging workflows.",
          "Deterministic environment for traceability across experiments.",
        ],
      },
      {
        metaLeft: "Weiss Schwarz Simulator",
        metaRight: "Rust · Python",
        title: "RL-first deterministic simulator",
        bullets: [
          "Rust core advances state until decision points.",
          "Fixed action space with legality masking + versioned encodings.",
        ],
      },
      {
        metaLeft: "Pokémon Showdown Gen 9 Doubles",
        metaRight: "Python",
        title: "PPO agent tooling",
        bullets: [
          "Structured config, evaluation scripts, and training inspection tools.",
          "Repo organization built for iterative experimentation.",
        ],
      },
      {
        metaLeft: "DDS Secure Chat",
        metaRight: "React · Supabase",
        title: "E2EE prototype",
        bullets: [
          "Signal Protocol messaging with auth + conversation lifecycle flows.",
          "Documented security assumptions and verification gaps.",
        ],
      },
    ],
    metrics: [
      { name: "Reproducibility", value: 0.95 },
      { name: "Determinism", value: 0.9 },
      { name: "Tooling maturity", value: 0.86 },
    ],
    tags: ["Rust", "PyTorch", "SB3", "Signal Protocol", "Supabase"],
    spark: [0.2, 0.32, 0.45, 0.6, 0.68, 0.74, 0.8, 0.86, 0.9, 0.95],
  },
  skills: {
    id: "RUN-SK-508",
    epoch: "2026",
    focus: "Reliability",
    evalTag: "steady",
    playback: 1,
    terminal: [
      "mode: skill_profile",
      "shipping: scoping → data modeling → deployment → handover",
      "backend: REST APIs, auth, validation, idempotent jobs",
      "data: Postgres, migrations, structured logging, debugging",
      "security: least privilege, secrets handling, privacy by design",
      "extras: PADI Divemaster | Danish native | English fluent",
    ],
    cards: [
      {
        metaLeft: "Core Skills",
        metaRight: "Full-stack",
        title: "End-to-end delivery",
        bullets: [
          "Scoping, data modeling, implementation, deployment, handover.",
          "Integrations with auth, validation, and operational clarity.",
        ],
      },
      {
        metaLeft: "Tech Stack",
        metaRight: "Daily drivers",
        title: "Languages + frameworks",
        bullets: [
          "Python, TypeScript, JavaScript, SQL, HTML, CSS.",
          "React, Next.js, React Native, Node.js, PyTorch.",
        ],
      },
      {
        metaLeft: "Platforms",
        metaRight: "Ops",
        title: "Data + DevOps",
        bullets: [
          "PostgreSQL, Supabase, Firebase, GitHub Actions, Docker.",
          "AWS basics, Linux fundamentals, secrets management.",
        ],
      },
    ],
    metrics: [
      { name: "Backend reliability", value: 0.88 },
      { name: "Security mindset", value: 0.86 },
      { name: "AI engineering habits", value: 0.84 },
    ],
    tags: ["PostgreSQL", "Supabase", "Firebase", "Docker", "CI", "Rust"],
    spark: [0.3, 0.38, 0.46, 0.54, 0.6, 0.66, 0.72, 0.78, 0.84, 0.9],
  },
};

let terminalTimers = [];
let terminalHasRun = false;

const clearTerminalTimers = () => {
  terminalTimers.forEach((timer) => clearTimeout(timer));
  terminalTimers = [];
};

const schedule = (fn, delay) => {
  const id = setTimeout(fn, delay);
  terminalTimers.push(id);
};

const renderTerminalInstant = (lines) => {
  if (!terminalOutput) return;
  terminalOutput.innerHTML = lines
    .map((line) => `<span class="terminal-line">${line}</span>`)
    .join("");
  terminalHasRun = true;
};

const typeTerminal = (lines) => {
  if (!terminalOutput) return;
  clearTerminalTimers();
  terminalOutput.innerHTML = "";
  let lineIndex = 0;
  const cursor = document.createElement("span");
  cursor.className = "terminal-cursor";

  const typeLine = () => {
    if (lineIndex >= lines.length) {
      terminalOutput.appendChild(cursor);
      terminalHasRun = true;
      return;
    }

    const lineText = lines[lineIndex];
    const lineEl = document.createElement("span");
    lineEl.className = "terminal-line";
    terminalOutput.appendChild(lineEl);

    let charIndex = 0;
    const tick = () => {
      if (charIndex < lineText.length) {
        lineEl.textContent += lineText.charAt(charIndex);
        charIndex += 1;
        terminalOutput.appendChild(cursor);
        schedule(tick, 14);
      } else {
        lineIndex += 1;
        schedule(typeLine, 90);
      }
    };

    tick();
  };

  typeLine();
};

const renderCards = (cards) => {
  if (!runDeck) return;
  runDeck.innerHTML = cards
    .map((card) => {
      const body = card.body ? `<p>${card.body}</p>` : "";
      const bullets = card.bullets
        ? `<ul>${card.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>`
        : "";
      return `
        <article class="run-card is-visible">
          <div class="run-meta">
            <span>${card.metaLeft}</span>
            <span>${card.metaRight}</span>
          </div>
          <h3>${card.title}</h3>
          ${body}
          ${bullets}
        </article>
      `;
    })
    .join("");
};

const renderMetrics = (metrics) => {
  if (!metricList) return;
  metricList.innerHTML = metrics
    .map(
      (metric) => `
      <div class="metric">
        <span>${metric.name}</span>
        <div class="metric-bar" style="--value: ${metric.value}"></div>
      </div>
    `
    )
    .join("");
  requestAnimationFrame(() => {
    metricList
      .querySelectorAll(".metric-bar")
      .forEach((bar) => bar.classList.add("is-visible"));
  });
};

const renderTags = (tags) => {
  if (!tagGrid) return;
  tagGrid.innerHTML = tags.map((tag) => `<span>${tag}</span>`).join("");
};

const renderSparkline = (values) => {
  if (!sparkline) return;
  const maxX = 100;
  const maxY = 40;
  const step = values.length > 1 ? maxX / (values.length - 1) : maxX;
  const points = values
    .map((value, index) => {
      const x = index * step;
      const y = maxY - value * maxY;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
  sparkline.setAttribute("points", points);
  if (sparklineWrap) {
    sparklineWrap.classList.remove("is-visible");
    requestAnimationFrame(() => {
      sparklineWrap.classList.add("is-visible");
    });
  }
};

const setActiveRun = (key, animateTerminal = true) => {
  const preset = runPresets[key];
  if (!preset) return;

  runButtons.forEach((btn) => {
    const isActive = btn.dataset.run === key;
    btn.classList.toggle("is-active", isActive);
    btn.setAttribute("aria-pressed", isActive ? "true" : "false");
  });

  if (runId) runId.textContent = preset.id;
  if (runEpoch) runEpoch.textContent = preset.epoch;
  if (runFocus) runFocus.textContent = preset.focus;
  if (evalTag) evalTag.textContent = preset.evalTag;

  renderCards(preset.cards);
  renderMetrics(preset.metrics);
  renderTags(preset.tags);
  renderSparkline(preset.spark);
  setPlayback(preset.playback);

  if (terminalOutput) {
    if (prefersReducedMotion) {
      renderTerminalInstant(preset.terminal);
    } else if (animateTerminal) {
      typeTerminal(preset.terminal);
    } else if (terminalHasRun) {
      renderTerminalInstant(preset.terminal);
    }
  }
};

if (runButtons.length) {
  runButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveRun(button.dataset.run, true);
    });
  });
}

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const initializePlaybackNodes = () => {
  if (!playbackNodes.length) return;
  playbackNodes.forEach((node) => {
    const pos = parseFloat(node.dataset.pos || "0");
    node.style.setProperty("--pos", pos);
  });
};

const setPlayback = (value) => {
  if (!playbackProgress || !playbackNodes.length) return;
  const progress = clamp(value ?? 0, 0, 1);
  playbackProgress.style.width = `${(progress * 100).toFixed(1)}%`;
  playbackNodes.forEach((node) => {
    const pos = parseFloat(node.dataset.pos || "0");
    node.classList.toggle("is-active", progress >= pos);
  });
};

const initializeTerminal = () => {
  if (!terminalOutput) return;
  if (prefersReducedMotion) {
    renderTerminalInstant(runPresets.experience.terminal);
    return;
  }
  if ("IntersectionObserver" in window && terminal) {
    let started = false;
    const terminalObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            started = true;
            typeTerminal(runPresets.experience.terminal);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    terminalObserver.observe(terminal);
  } else {
    renderTerminalInstant(runPresets.experience.terminal);
  }
};

setActiveRun("experience", false);
initializeTerminal();
initializePlaybackNodes();
setPlayback(runPresets.experience.playback);
