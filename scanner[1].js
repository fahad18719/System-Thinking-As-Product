// © 2026 Fahad Najam Consulting
// scanner.js — core logic

const Scanner = (() => {
  let current = 0;
  const vals = {};

  // Initialize all values to 5
  PHASES.forEach(phase => {
    phase.questions.forEach(q => { vals[q.id] = 5; });
  });

  function init() {
    buildSections();
    buildNav();
    buildDots();
    showPhase(0);
  }

  function buildSections() {
    const container = document.getElementById('sections-container');
    container.innerHTML = '';

    PHASES.forEach((phase, pi) => {
      const section = document.createElement('section');
      section.id = 'phase-' + phase.id;
      section.className = 'phase-section';
      section.hidden = true;
      section.setAttribute('aria-label', phase.label + ' layer questions');

      let html = `<p class="phase-eyebrow">${phase.label} system</p>`;

      phase.questions.forEach(q => {
        html += `
          <div class="question-block">
            <p class="q-text">${q.text}</p>
            <p class="q-sub">${q.sub}</p>
            <div class="slider-row">
              <span class="slider-edge">${q.low}</span>
              <input
                type="range" min="0" max="10" value="5" step="1"
                id="${q.id}"
                aria-label="${q.text}"
                oninput="Scanner.updateVal('${q.id}', this.value)"
              >
              <span class="slider-edge">${q.high}</span>
            </div>
            <div class="slider-val-row">
              <span class="slider-val" id="val-${q.id}">5</span>
              <span class="slider-val-label">/ 10</span>
            </div>
          </div>
        `;
      });

      section.innerHTML = html;
      container.appendChild(section);
    });
  }

  function buildNav() {
    const nav = document.getElementById('phase-nav');
    nav.innerHTML = '';
    PHASES.forEach((phase, i) => {
      const btn = document.createElement('button');
      btn.className = 'phase-pill';
      btn.textContent = phase.label;
      btn.setAttribute('aria-label', 'Go to ' + phase.label + ' section');
      btn.onclick = () => jumpTo(i);
      nav.appendChild(btn);
    });
  }

  function buildDots() {
    const wrap = document.getElementById('progress-dots');
    wrap.innerHTML = '';
    PHASES.forEach((_, i) => {
      const d = document.createElement('span');
      d.className = 'dot';
      d.setAttribute('aria-hidden', 'true');
      wrap.appendChild(d);
    });
  }

  function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((d, i) => {
      d.className = 'dot' + (i < current ? ' done' : i === current ? ' active' : '');
    });
    const pct = ((current) / (PHASES.length - 1)) * 100;
    document.getElementById('progress-fill').style.width = pct + '%';
  }

  function updateNav() {
    const pills = document.querySelectorAll('.phase-pill');
    pills.forEach((p, i) => {
      p.className = 'phase-pill' + (i === current ? ' active' : '');
    });

    const backBtn = document.getElementById('btn-back');
    const nextBtn = document.getElementById('btn-next');

    backBtn.style.visibility = current === 0 ? 'hidden' : 'visible';
    nextBtn.textContent = current === PHASES.length - 1 ? 'See your results →' : 'Next →';
  }

  function showPhase(index) {
    PHASES.forEach((phase, i) => {
      const el = document.getElementById('phase-' + phase.id);
      if (el) el.hidden = (i !== index);
    });
    current = index;
    updateDots();
    updateNav();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function jumpTo(index) {
    showPhase(index);
  }

  function go(dir) {
    if (dir === 1 && current === PHASES.length - 1) {
      showResult();
      return;
    }
    const next = Math.max(0, Math.min(PHASES.length - 1, current + dir));
    showPhase(next);
  }

  function updateVal(id, value) {
    vals[id] = parseInt(value);
    const el = document.getElementById('val-' + id);
    if (el) el.textContent = value;
  }

  function getPhaseScore(phase) {
    return phase.questions.reduce((sum, q) => sum + (vals[q.id] || 0), 0);
  }

  function showResult() {
    document.getElementById('app').hidden = true;
    document.getElementById('progress-wrap').hidden = true;

    const resultEl = document.getElementById('result-section');
    resultEl.hidden = false;

    const phaseScores = PHASES.map(p => getPhaseScore(p));
    const total = phaseScores.reduce((a, b) => a + b, 0);
    const maxTotal = PHASES.length * 3 * 10; // 120
    const entangledPct = Math.round((total / maxTotal) * 100);
    const freedomPct = 100 - entangledPct;

    // Animate ring
    setTimeout(() => {
      const arc = 414.7;
      const offset = arc - (arc * entangledPct / 100);
      document.getElementById('ring-arc').style.strokeDashoffset = offset;
      document.getElementById('score-num').textContent = entangledPct;
      document.getElementById('freedom-fill').style.width = freedomPct + '%';
      document.getElementById('freedom-pct').textContent = freedomPct + '%';
    }, 150);

    // Tier
    const tier = TIERS.find(t => entangledPct <= t.max) || TIERS[TIERS.length - 1];
    document.getElementById('score-tier').textContent = tier.label;
    document.getElementById('score-desc').textContent = tier.desc;

    // Breakdown bars
    const breakdown = document.getElementById('breakdown');
    breakdown.innerHTML = '<p class="section-eyebrow">Layer breakdown</p>';
    PHASES.forEach((phase, i) => {
      const phasePct = Math.round((phaseScores[i] / 30) * 100);
      breakdown.innerHTML += `
        <div class="breakdown-row">
          <span class="breakdown-label">${phase.label}</span>
          <div class="bar-track">
            <div class="bar-fill" id="bar-${phase.id}" style="width:0%; background:${phase.color}"></div>
          </div>
          <span class="breakdown-pct">${phasePct}%</span>
        </div>
      `;
    });

    setTimeout(() => {
      PHASES.forEach((phase, i) => {
        const phasePct = Math.round((phaseScores[i] / 30) * 100);
        const bar = document.getElementById('bar-' + phase.id);
        if (bar) {
          bar.style.transition = `width 0.9s ease ${i * 0.15}s`;
          bar.style.width = phasePct + '%';
        }
      });
    }, 300);

    // Insight cards
    const heaviestIndex = phaseScores.indexOf(Math.max(...phaseScores));
    const heaviestPhase = PHASES[heaviestIndex];
    const primaryInsight = INSIGHTS[heaviestPhase.id];
    const secondaryInsight = freedomPct >= 50 ? INSIGHTS.freedom_high : INSIGHTS.freedom_low;

    const insightGrid = document.getElementById('insight-cards');
    [primaryInsight, secondaryInsight].forEach(ins => {
      const card = document.createElement('div');
      card.className = 'insight-card';
      card.innerHTML = `
        <span class="insight-icon" aria-hidden="true">${ins.icon}</span>
        <h3 class="insight-title">${ins.title}</h3>
        <p class="insight-body">${ins.body}</p>
      `;
      insightGrid.appendChild(card);
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function restart() {
    PHASES.forEach(phase => {
      phase.questions.forEach(q => {
        vals[q.id] = 5;
        const input = document.getElementById(q.id);
        const valEl = document.getElementById('val-' + q.id);
        if (input) input.value = 5;
        if (valEl) valEl.textContent = 5;
      });
    });

    document.getElementById('insight-cards').innerHTML = '';
    document.getElementById('result-section').hidden = true;
    document.getElementById('app').hidden = false;
    document.getElementById('progress-wrap').hidden = false;
    document.getElementById('ring-arc').style.strokeDashoffset = 414.7;
    document.getElementById('freedom-fill').style.width = '0%';

    showPhase(0);
  }

  function share() {
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: 'System Entanglement Scanner — Silicon & Soul',
        text: 'Measure how much of your energy is being consumed by inherited social contracts.',
        url: url
      });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard.');
      });
    }
  }

  return { init, go, jumpTo, updateVal, restart, share };
})();

document.addEventListener('DOMContentLoaded', Scanner.init);
