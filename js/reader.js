/* ===========================================================
   EVOLUA — Leitor de aula (estilo MEA, paleta EVOLUA)
   Usado por aula.html?c=<curso>&l=<aula>
   Conteúdo e Tarefas/Teste ficam em abas separadas.
   Respeita o acesso definido em js/auth.js.
   =========================================================== */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const params = new URLSearchParams(location.search);
  const courseId = params.get("c");
  const lessonId = params.get("l");

  const course = (typeof COURSES !== "undefined" ? COURSES : {})[courseId];
  const CONTENT = courseId === "jetro"
    ? (typeof JETRO_CONTENT !== "undefined" ? JETRO_CONTENT : null)
    : (typeof MEA_CONTENT !== "undefined" ? MEA_CONTENT : null);

  function findLesson(id) {
    if (!course) return null;
    for (const m of course.modules) {
      const l = m.lessons.find((x) => x.id === id);
      if (l) return l;
    }
    return null;
  }
  const lesson = findLesson(lessonId);
  const content = CONTENT ? CONTENT[lessonId] : null;

  /* ---------- anotações / tarefas ---------- */
  const sess = (typeof Auth !== "undefined" && Auth.current()) || null;
  const who = sess ? sess.username : "anon";
  const NKEY = `evolua_notes_${who}`;
  const TKEY = `evolua_tasks_${who}_${lessonId}`;
  const getJSON = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) || d; } catch (e) { return d; } };
  const setJSON = (k, v) => localStorage.setItem(k, JSON.stringify(v));

  /* ---------- render de blocos (portado do MEA) ---------- */
  function renderBlock(b, idx, notes) {
    switch (b.type) {
      case "text":
        return `<div class="block">
          ${b.eyebrow ? `<span class="b-eyebrow">${esc(b.eyebrow)}</span>` : ""}
          ${b.title ? `<h2 class="b-title">${esc(b.title)}</h2>` : ""}
          ${b.html ? `<div class="b-text">${b.html}</div>` : ""}</div>`;

      case "image":
        return `<div class="block"><figure class="lesson-figure">
          <img src="${esc(b.src)}" alt="${esc(b.alt || "")}" loading="lazy">
          ${b.caption ? `<figcaption>${esc(b.caption)}</figcaption>` : ""}</figure></div>`;

      case "bi":
        return `<div class="block"><div class="bi">
          <div class="en">${esc(b.en)}</div><div class="pt">${esc(b.pt)}</div></div></div>`;

      case "callout":
        return `<div class="block"><div class="callout ${b.variant || "tip"}">
          <span class="ci">${b.icon || "💡"}</span>
          <div><h4>${esc(b.title)}</h4><p>${esc(b.text)}</p></div></div></div>`;

      case "write": {
        const rows = b.prompts.map((p, i) => {
          const key = `${lessonId}:${idx}:${i}`;
          return `<div class="wq">${esc(p.q)}${p.sub ? `<small>${esc(p.sub)}</small>` : ""}</div>
            <textarea data-note="${esc(key)}" placeholder="${esc(p.ph || "Escreva aqui...")}">${esc(notes[key] || "")}</textarea>`;
        }).join("");
        return `<div class="block"><div class="write-box">
          <h3 class="b-title" style="font-size:1.3rem">${esc(b.title)}</h3>
          ${b.hint ? `<p class="b-text" style="font-size:.92rem;color:var(--text-mut)">${esc(b.hint)}</p>` : ""}
          ${rows}<div class="saved-note">✓ Salvo automaticamente</div></div></div>`;
      }

      case "flip": {
        const cards = b.cards.map((c) => `
          <div class="flip" tabindex="0" role="button" aria-label="Virar cartão"><div class="flip-inner">
            <div class="flip-face flip-front"><div class="lab">${esc(c.lab)}</div><div class="ph">${esc(c.ph)}</div><div class="tr">${esc(c.tr)}</div><div class="tap">Toque para ressignificar →</div></div>
            <div class="flip-face flip-back"><div class="lab">${esc(c.backLab)}</div><div class="ph">${esc(c.backPh)}</div><div class="tr">${esc(c.backTr)}</div></div>
          </div></div>`).join("");
        return `<div class="block"><div class="flip-row">${cards}</div></div>`;
      }

      case "reframe":
        return `<div class="block"><div class="reframe">
          <div class="side before"><div class="lab">${esc(b.before.lab)}</div><div class="ph">${esc(b.before.ph)}</div></div>
          <div class="arrow">→</div>
          <div class="side after"><div class="lab">${esc(b.after.lab)}</div><div class="ph">${esc(b.after.ph)}</div></div></div></div>`;

      case "steps": {
        const items = b.items.map((s, i) => `
          <div class="step"><div class="n">${i + 1}</div><div><h4>${esc(s.h)}</h4><p>${esc(s.p)}</p></div></div>`).join("");
        return `<div class="block">${b.title ? `<h3 class="b-title" style="font-size:1.35rem;margin-bottom:1rem">${esc(b.title)}</h3>` : ""}<div class="steps">${items}</div></div>`;
      }

      case "acc": {
        const items = b.items.map((it) => `
          <div class="acc-item"><button class="acc-head" type="button"><span class="num">${esc(it.num)}</span>${esc(it.head)}<span class="chev">▾</span></button>
          <div class="acc-body"><div class="inner">${it.body}</div></div></div>`).join("");
        return `<div class="block">${b.title ? `<h3 class="b-title" style="font-size:1.35rem;margin-bottom:1rem">${esc(b.title)}</h3>` : ""}<div class="acc">${items}</div></div>`;
      }

      case "bigquote":
        return `<div class="block"><div class="bigquote">
          ${b.en ? `<div class="en">“${esc(b.en)}”</div>` : ""}
          <div class="pt">${b.en ? esc(b.pt) : "“" + esc(b.text || b.pt) + "”"}</div></div></div>`;

      case "vocab": {
        const cards = b.items.map((v) => `
          <div class="fc" tabindex="0" role="button" aria-label="Virar flashcard"><div class="fc-inner">
            <div class="fc-face fc-front"><div><div class="w">${esc(v.en)}</div><small>EN · toque</small></div></div>
            <div class="fc-face fc-back"><div><div class="w">${esc(v.pt)}</div><small>PT</small></div></div>
          </div></div>`).join("");
        return `<div class="block"><div class="vocab-head"><h3 class="b-title" style="margin:0;font-size:1.35rem">${esc(b.title)}</h3>${b.sub ? `<small>${esc(b.sub)}</small>` : ""}</div><div class="fc-row">${cards}</div></div>`;
      }

      case "quiz": {
        const opts = b.options.map((o, i) => `<button class="opt" data-i="${i}">${esc(o)}</button>`).join("");
        return `<div class="block"><div class="quiz" data-answer="${b.answer}" data-explain="${esc(b.explain || "")}">
          <div class="qq">${esc(b.q)}</div><div class="opts">${opts}</div><div class="quiz-fb"></div></div></div>`;
      }

      default: return "";
    }
  }

  /* ---------- views ---------- */
  function lockedHTML(state) {
    let msg = "Este conteúdo é exclusivo para alunos com acesso.";
    if (state === "locked-time") msg = "Esta aula ainda não foi liberada na sua turma.";
    if (state === "locked-enroll") msg = "Você precisa estar matriculado neste curso para acessar.";
    return `<div class="reader-locked">
      <div class="rl-ico">🔒</div>
      <h1>Conteúdo bloqueado</h1>
      <p>${msg}</p>
      <div class="rl-actions">
        <button class="btn btn-gold" id="rlLogin">Entrar com minha senha</button>
        <a class="btn btn-ghost" href="curso-${courseId}.html">Voltar para a grade</a>
      </div></div>`;
  }

  function contentTabHTML(notes) {
    let html = `<div class="reader">`;
    if (content.verse) {
      html += `<div class="block verse-block">
        <span class="vb-mark">“</span>
        <p class="vb-text">${esc(content.verse.text)}</p>
        <div class="vb-ref">${esc(content.verse.ref)}</div></div>`;
    }
    (content.blocks || []).forEach((b, i) => { html += renderBlock(b, i, notes); });

    if (content.bibliography && content.bibliography.length) {
      html += `<div class="block biblio"><h3 class="b-title" style="font-size:1.2rem">📚 Bibliografia & fontes</h3><ul>${
        content.bibliography.map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>`;
    }

    html += `<div class="block" id="completeZone"></div>`;
    html += `</div>`;
    return html;
  }

  function tasksTabHTML() {
    const tasks = content.tasks || [];
    const test = content.test || [];
    const tdone = getJSON(TKEY, {});
    let html = `<div class="reader">`;

    html += `<div class="block"><h2 class="b-title">✅ Tarefas</h2>`;
    if (tasks.length) {
      html += `<div class="task-list">${tasks.map((t, i) =>
        `<label class="task-row"><input type="checkbox" data-task="${i}" ${tdone[i] ? "checked" : ""}><span>${esc(t)}</span></label>`).join("")}</div>`;
    } else {
      html += `<p class="b-text" style="color:var(--text-mut)">As tarefas desta aula estão a caminho.</p>`;
    }
    html += `</div>`;

    html += `<div class="block"><h2 class="b-title">📝 Teste</h2>`;
    if (test.length) {
      html += `<p class="b-text" style="color:var(--text-mut)">Responda para conferir o que você fixou.</p>`;
      test.forEach((q, qi) => {
        const opts = q.options.map((o, i) => `<button class="opt" data-i="${i}">${esc(o)}</button>`).join("");
        html += `<div class="quiz" data-answer="${q.answer}" data-explain="${esc(q.explain || "")}">
          <div class="qq">${qi + 1}. ${esc(q.q)}</div><div class="opts">${opts}</div><div class="quiz-fb"></div></div>`;
      });
    } else {
      html += `<p class="b-text" style="color:var(--text-mut)">O teste desta aula está a caminho.</p>`;
    }
    html += `</div></div>`;
    return html;
  }

  function bindQuizzes(root) {
    $$(".quiz", root).forEach((q) => {
      const ans = +q.dataset.answer;
      const fb = q.querySelector(".quiz-fb");
      $$(".opt", q).forEach((opt) => opt.addEventListener("click", () => {
        const i = +opt.dataset.i;
        $$(".opt", q).forEach((o) => o.classList.add("disabled"));
        if (i === ans) { opt.classList.add("correct"); fb.style.color = "var(--green)"; fb.textContent = "✓ " + q.dataset.explain; }
        else { opt.classList.add("wrong"); q.querySelector(`.opt[data-i="${ans}"]`).classList.add("correct");
          fb.style.color = "var(--red)"; fb.textContent = "Quase! " + q.dataset.explain; }
      }));
    });
  }

  function bindContent(root, notes) {
    $$(".flip, .fc", root).forEach((el) => {
      const t = () => el.classList.toggle("flipped");
      el.addEventListener("click", t);
      el.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); t(); } });
    });
    $$(".acc-head", root).forEach((h) => h.addEventListener("click", () => h.parentElement.classList.toggle("open")));
    $$("textarea[data-note]", root).forEach((t) => {
      let timer;
      t.addEventListener("input", () => {
        notes[t.dataset.note] = t.value; clearTimeout(timer);
        timer = setTimeout(() => { setJSON(NKEY, notes);
          const n = t.closest(".write-box").querySelector(".saved-note");
          if (n) { n.classList.add("show"); setTimeout(() => n.classList.remove("show"), 1400); } }, 450);
      });
    });
    bindQuizzes(root);
  }

  /* =========================================================
     PROCESSO DE CONCLUSÃO (depende da modalidade)
     - independente: 15 min dentro da aba de leitura (pausa ao sair)
     - turma: senha enviada por e-mail após a chamada
     ========================================================= */
  const NEED = 15 * 60; // 15 minutos em segundos
  const TIMERKEY = `evolua_timer_${who}_${lessonId}`;
  const DEMOMODEKEY = `evolua_demomode_${who}`;
  let activeTab = "content";
  let timerInt = null;

  function isAdmin() { return sess && sess.role === "admin"; }
  function getMode() {
    if (isAdmin()) return localStorage.getItem(DEMOMODEKEY) || "independente";
    const u = Auth.fullUser();
    const en = u && u.enrollments && u.enrollments[courseId];
    return (en && en.mode) || "independente";
  }
  const getSecs = () => +localStorage.getItem(TIMERKEY) || 0;
  const fmtClock = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  function timerActive() {
    return document.visibilityState === "visible" && document.hasFocus() &&
      activeTab === "content" && getMode() === "independente" && !Auth.getDone(courseId).has(lessonId);
  }

  function renderComplete() {
    if (timerInt) { clearInterval(timerInt); timerInt = null; }
    const zone = $("#completeZone");
    if (!zone) return;
    const done = Auth.getDone(courseId).has(lessonId);
    const mode = getMode();

    const modeSwitch = isAdmin() ? `
      <div class="mode-switch">Modalidade (demo de admin):
        <div class="ms-btns">
          <button data-m="independente" class="${mode === "independente" ? "active" : ""}">Independente</button>
          <button data-m="turma" class="${mode === "turma" ? "active" : ""}">Turma</button>
        </div></div>` : "";

    if (done) {
      zone.innerHTML = `<div class="comp-card">${modeSwitch}
        <div class="comp-title" style="color:var(--green)">🌱 Aula concluída — parabéns!</div>
        <p class="comp-desc">Você pode seguir para as Tarefas e Teste, ou revisar o conteúdo.</p>
        <button class="btn btn-ghost" id="undoBtn">Desfazer conclusão</button></div>`;
      bindModeSwitch();
      $("#undoBtn") && ($("#undoBtn").onclick = () => { Auth.setDone(courseId, lessonId, false); renderComplete(); });
      return;
    }

    if (mode === "turma") {
      zone.innerHTML = `<div class="comp-card">${modeSwitch}
        <div class="comp-title">Para concluir esta aula</div>
        <p class="comp-desc">Digite a senha enviada por e-mail após a chamada da sua turma. A presença libera a senha.</p>
        <div class="comp-pass">
          <input type="text" id="passInput" placeholder="Senha da aula" autocomplete="off">
          <button class="btn btn-gold" id="passBtn">Validar e concluir</button>
        </div>
        <div class="comp-msg" id="passMsg"></div></div>`;
      bindModeSwitch();
      const tryPass = () => {
        const val = ($("#passInput").value || "").trim().toUpperCase();
        const msg = $("#passMsg");
        if (val === lessonPass(courseId, lesson).toUpperCase()) {
          Auth.setDone(courseId, lessonId, true); burst(); renderComplete();
        } else { msg.className = "comp-msg err"; msg.textContent = "Senha incorreta. Confira o e-mail da sua turma."; }
      };
      $("#passBtn").onclick = tryPass;
      $("#passInput").addEventListener("keydown", (e) => { if (e.key === "Enter") tryPass(); });
      return;
    }

    // independente — timer de 15 min
    const secs = Math.min(getSecs(), NEED);
    const ready = secs >= NEED;
    zone.innerHTML = `<div class="comp-card">${modeSwitch}
      <div class="comp-title">Para concluir esta aula</div>
      <p class="comp-desc">Permaneça nesta aba de leitura por <b>15 minutos</b>. Se você sair da aba ou trocar para “Tarefas e Teste”, o tempo pausa.</p>
      <div class="timer-display" id="timerDisp">${fmtClock(secs)} <span style="font-size:1rem;color:var(--text-mut)">/ 15:00</span></div>
      <div class="timer-bar"><i id="timerFill" style="width:${Math.round(secs / NEED * 100)}%"></i></div>
      <div class="timer-note" id="timerNote">Tempo de leitura</div>
      <button class="btn btn-gold btn-lg" id="completeBtn" ${ready ? "" : "disabled"}>✓ Marcar como concluída</button></div>`;
    bindModeSwitch();
    $("#completeBtn").onclick = () => {
      if (getSecs() >= NEED) { Auth.setDone(courseId, lessonId, true); burst(); renderComplete(); }
    };
    startTimer();
  }

  function startTimer() {
    if (timerInt) clearInterval(timerInt);
    timerInt = setInterval(() => {
      const disp = $("#timerDisp"), fill = $("#timerFill"), note = $("#timerNote"), btn = $("#completeBtn");
      if (!disp) { clearInterval(timerInt); return; }
      let secs = getSecs();
      const active = timerActive();
      if (active && secs < NEED) { secs++; localStorage.setItem(TIMERKEY, secs); }
      disp.innerHTML = `${fmtClock(Math.min(secs, NEED))} <span style="font-size:1rem;color:var(--text-mut)">/ 15:00</span>`;
      fill.style.width = Math.round(Math.min(secs, NEED) / NEED * 100) + "%";
      if (note) {
        note.textContent = secs >= NEED ? "Tempo concluído! Você já pode marcar a aula." : (active ? "Lendo… ⏱️" : "⏸️ Pausado (volte para a aba de leitura)");
        note.className = "timer-note" + (active || secs >= NEED ? "" : " paused");
      }
      if (btn && secs >= NEED) btn.disabled = false;
    }, 1000);
  }

  function bindModeSwitch() {
    $$(".mode-switch button").forEach((b) => b.addEventListener("click", () => {
      localStorage.setItem(DEMOMODEKEY, b.dataset.m); renderComplete();
    }));
  }

  function bindTasks(root) {
    const tdone = getJSON(TKEY, {});
    $$('input[data-task]', root).forEach((c) => c.addEventListener("change", () => {
      tdone[c.dataset.task] = c.checked; setJSON(TKEY, tdone);
    }));
    bindQuizzes(root);
  }

  function burst() {
    const colors = ["#c0704d", "#dd9b78", "#7f9772", "#f6dcae", "#a6573a"];
    for (let i = 0; i < 26; i++) {
      const d = document.createElement("div");
      d.style.cssText = `position:fixed;z-index:200;top:50%;left:50%;width:9px;height:9px;border-radius:2px;background:${colors[i % colors.length]};pointer-events:none;`;
      document.body.appendChild(d);
      const ang = Math.random() * Math.PI * 2, dist = 80 + Math.random() * 160;
      d.animate([{ transform: "translate(-50%,-50%)", opacity: 1 },
        { transform: `translate(${Math.cos(ang) * dist - 50}%, ${Math.sin(ang) * dist - 50 + 120}px) rotate(${Math.random() * 540}deg)`, opacity: 0 }],
        { duration: 1100 + Math.random() * 600, easing: "cubic-bezier(.2,.7,.3,1)" }).onfinish = () => d.remove();
    }
  }

  function setupReveal(scope) {
    const blocks = $$(".block", scope);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: 0.1 });
      blocks.forEach((b) => io.observe(b));
    } else blocks.forEach((b) => b.classList.add("in"));
  }

  /* ---------- montar a página ---------- */
  function render() {
    const root = $("#reader-root");
    if (!course || !lesson || !content) {
      root.innerHTML = `<div class="reader-locked"><div class="rl-ico">🔎</div><h1>Aula não encontrada</h1>
        <p>O link da aula parece inválido.</p><a class="btn btn-gold" href="cursos.html">Ver cursos</a></div>`;
      return;
    }

    const access = Auth.lessonAccess(courseId, lesson);
    if (access.state !== "open") {
      root.innerHTML = lockedHTML(access.state);
      $("#rlLogin") && $("#rlLogin").addEventListener("click", () => window.EvoluaSite && EvoluaSite.openAuthModal());
      return;
    }

    const notes = getJSON(NKEY, {});
    root.innerHTML = `
      <div class="lesson-hero" style="--accent:${course.color}">
        <a class="back-link" href="curso-${courseId}.html">← ${esc(course.name)} · voltar para a grade</a>
        <span class="eyebrow">${esc(course.full)}</span>
        <h1>${esc(lesson.title)}</h1>
        <p class="lh-sub">⏱️ ${esc(lesson.min || "")} min</p>
        <div class="reader-tabs">
          <button class="rtab active" data-tab="content">Conteúdo</button>
          <button class="rtab" data-tab="tasks">Tarefas e Teste</button>
        </div>
      </div>
      <div class="reader-body wrap">
        <div id="tab-content">${contentTabHTML(notes)}</div>
        <div id="tab-tasks" class="hidden">${tasksTabHTML()}</div>
      </div>`;

    const cWrap = $("#tab-content"), tWrap = $("#tab-tasks");
    bindContent(cWrap, notes);
    bindTasks(tWrap);
    setupReveal(cWrap);
    renderComplete();

    $$(".rtab").forEach((tab) => tab.addEventListener("click", () => {
      $$(".rtab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const isContent = tab.dataset.tab === "content";
      activeTab = isContent ? "content" : "tasks";
      cWrap.classList.toggle("hidden", !isContent);
      tWrap.classList.toggle("hidden", isContent);
      if (!isContent) setupReveal(tWrap);
      window.scrollTo({ top: 0, behavior: "instant" in document.documentElement.style ? "instant" : "auto" });
    }));
  }

  document.addEventListener("DOMContentLoaded", render);
})();
