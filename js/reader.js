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
    return `<div class="reader" id="tasksReader"></div>`;
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
        <p class="comp-desc">A conclusão é definitiva. Agora você já pode fazer as Tarefas e o Teste desta aula.</p></div>`;
      bindModeSwitch();
      return;
    }

    // aula com conclusão livre (ex.: introdução) — sem timer e sem senha
    if (lesson.freeComplete) {
      zone.innerHTML = `<div class="comp-card">
        <div class="comp-title">Pronto para concluir</div>
        <p class="comp-desc">Esta aula introdutória pode ser marcada como concluída quando você quiser.</p>
        <button class="btn btn-gold btn-lg" id="completeBtn">✓ Marcar como concluída</button></div>`;
      $("#completeBtn").onclick = () => { Auth.setDone(courseId, lessonId, true); burst(); renderComplete(); };
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

  /* =========================================================
     TAREFAS E TESTE
     - liberados só após a aula concluída
     - 2 tarefas (sem restrição) + 1 teste (modo prova)
     ========================================================= */
  const TAREFASKEY = `evolua_tarefas_${who}_${lessonId}`;
  const TESTEKEY = `evolua_teste_${who}_${lessonId}`;
  const EXAMKEY = `evolua_exam_${who}_${lessonId}`;
  const EXAM_SECONDS = 60 * 60;

  function bindTasks() { renderTasksTab(); }

  const markIn = () => $$(".block", $("#tasksReader")).forEach((b) => b.classList.add("in"));

  function renderTasksTab() {
    const root = $("#tasksReader");
    if (!root) return;
    if (!Auth.getDone(courseId).has(lessonId)) {
      root.innerHTML = `<div class="block in"><div class="comp-card">
        <div style="font-size:2.4rem">🔒</div>
        <div class="comp-title">Tarefas e teste bloqueados</div>
        <p class="comp-desc">Conclua a aula na aba <b>Conteúdo</b> para liberar as tarefas e o teste.</p>
        <button class="btn btn-ghost" id="goContent">Voltar ao conteúdo</button></div></div>`;
      $("#goContent").onclick = () => $('.rtab[data-tab="content"]').click();
      return;
    }
    renderTasksHome();
  }

  function renderTasksHome() {
    const root = $("#tasksReader");
    const tarefas = content.tarefas || [];
    const teste = content.teste;
    const st = getJSON(TAREFASKEY, {});

    let html = `<div class="block"><h2 class="b-title">✅ Tarefas</h2>
      <p class="b-text" style="color:var(--text-mut)">Escolha uma tarefa, responda e clique em <b>Concluir tarefa</b> para ver os resultados. Uma vez concluída, não pode ser refeita.</p></div>`;

    if (!tarefas.length) {
      html += `<div class="block"><p class="b-text" style="color:var(--text-mut)">As tarefas desta aula estão em preparação.</p></div>`;
    } else {
      html += `<div class="block"><div class="tarefa-cards">`;
      tarefas.forEach((tf, ti) => {
        const done = st[ti] && st[ti].done;
        html += `<button class="tcard ${done ? "done" : ""}" data-ti="${ti}">
          <div class="tcard-ico">${done ? "✓" : "📝"}</div>
          <div class="tcard-body"><div class="tcard-title">${esc(tf.titulo)}</div>
            <div class="tcard-sub">${tf.questoes.length} questões · ${done ? `Concluída — ${st[ti].score}/${st[ti].total}` : "A fazer"}</div></div>
          <div class="tcard-go">${done ? "Ver respostas →" : "Abrir →"}</div></button>`;
      });
      html += `</div></div>`;
    }

    html += `<div class="block"><h2 class="b-title">📝 Teste</h2>${testeCardHTML(teste)}</div>`;
    root.innerHTML = html;
    root.querySelectorAll(".tcard").forEach((c) => c.addEventListener("click", () => openTarefa(+c.dataset.ti)));
    bindTesteCard(root, teste);
    markIn();
  }

  function tarefaQHTML(qq, qi, answers) {
    const val = answers[qi];
    if (qq.type === "write") {
      return `<div class="block task-q"><div class="qq">${qi + 1}. ${esc(qq.q)}</div>
        <textarea data-tq="${qi}" placeholder="Escreva sua resposta...">${esc(val != null ? val : "")}</textarea></div>`;
    }
    const opts = qq.options.map((o, i) => `<button type="button" class="opt ${val === i ? "sel" : ""}" data-i="${i}">${esc(o)}</button>`).join("");
    return `<div class="block task-q mc" data-qi="${qi}"><div class="qq">${qi + 1}. ${esc(qq.q)}</div><div class="opts">${opts}</div></div>`;
  }

  function openTarefa(ti) {
    const st = getJSON(TAREFASKEY, {});
    if (st[ti] && st[ti].done) return reviewTarefa(ti);

    const root = $("#tasksReader");
    const tf = content.tarefas[ti];
    const draft = (st[ti] && st[ti].draft) || {};
    let html = `<div class="block in"><button class="back-link" id="backTarefas">← Voltar para as tarefas</button>
      <h2 class="b-title" style="margin-top:10px">${esc(tf.titulo)}</h2>
      <p class="b-text" style="color:var(--text-mut)">Responda às ${tf.questoes.length} questões e clique em Concluir tarefa. Os resultados aparecem só ao concluir.</p></div>`;
    tf.questoes.forEach((qq, qi) => { html += tarefaQHTML(qq, qi, draft); });
    html += `<div class="block"><div class="comp-card">
      <button class="btn btn-gold btn-lg" id="concluirTarefa">✓ Concluir tarefa</button>
      <div class="comp-msg" id="tarefaMsg"></div></div></div>`;
    root.innerHTML = html;
    $("#backTarefas").onclick = renderTasksHome;
    bindTarefaInputs(root, ti);
    $("#concluirTarefa").onclick = () => concludeTarefa(ti);
    markIn(); window.scrollTo({ top: 0 });
  }

  function bindTarefaInputs(root, ti) {
    const st = getJSON(TAREFASKEY, {});
    if (!st[ti]) st[ti] = {};
    if (!st[ti].draft) st[ti].draft = {};
    const draft = st[ti].draft;
    const save = () => {
      const cur = getJSON(TAREFASKEY, {});
      if (cur[ti] && cur[ti].done) return; // tarefa já concluída — não sobrescrever
      cur[ti] = cur[ti] || {};
      cur[ti].draft = draft;
      setJSON(TAREFASKEY, cur);
    };
    $$(".task-q.mc", root).forEach((q) => {
      const qi = +q.dataset.qi;
      $$(".opt", q).forEach((opt) => opt.addEventListener("click", () => {
        draft[qi] = +opt.dataset.i;
        $$(".opt", q).forEach((o) => o.classList.remove("sel"));
        opt.classList.add("sel"); save();
      }));
    });
    $$("textarea[data-tq]", root).forEach((t) => {
      let tm; t.addEventListener("input", () => { draft[+t.dataset.tq] = t.value; clearTimeout(tm); tm = setTimeout(save, 400); });
    });
  }

  function concludeTarefa(ti) {
    const tf = content.tarefas[ti];
    const root = $("#tasksReader");
    const answers = {};
    tf.questoes.forEach((qq, qi) => {
      if (qq.type === "write") {
        const ta = root.querySelector(`textarea[data-tq="${qi}"]`);
        answers[qi] = ta ? ta.value : "";
      } else {
        const sel = root.querySelector(`.task-q.mc[data-qi="${qi}"] .opt.sel`);
        answers[qi] = sel ? +sel.dataset.i : null;
      }
    });
    const faltou = tf.questoes.some((qq, qi) => answers[qi] == null || (qq.type === "write" && !String(answers[qi]).trim()));
    if (faltou) {
      const m = $("#tarefaMsg"); m.className = "comp-msg err"; m.textContent = "Responda todas as questões antes de concluir.";
      return;
    }
    const draft = answers;
    let score = 0, total = 0;
    tf.questoes.forEach((qq, qi) => { if (qq.type === "mc") { total++; if (draft[qi] === qq.answer) score++; } });
    const st = getJSON(TAREFASKEY, {});
    st[ti] = { done: true, answers: draft, score, total, at: Date.now() };
    setJSON(TAREFASKEY, st);

    const lines = tf.questoes.map((qq, qi) => qq.type === "write"
      ? { q: qq.q, chosen: draft[qi] || "(em branco)", open: true }
      : { q: qq.q, chosen: qq.options[draft[qi]], correct: qq.options[qq.answer], ok: draft[qi] === qq.answer });
    const mail = sendTestResult({ kind: "Tarefa", student: (sess && sess.name) || who, courseName: course.full,
      lessonTitle: `${lesson.title} — ${tf.titulo}`, score, total, lines });

    burst();
    reviewTarefa(ti);
    showMailFeedback(mail);
  }

  function tarefaReviewQHTML(qq, qi, answers) {
    const val = answers[qi];
    if (qq.type === "write") {
      return `<div class="block rev-q ok"><div class="qq">${qi + 1}. ${esc(qq.q)}</div>
        <div class="rev-line">Sua resposta: <b>${esc(val || "(em branco)")}</b></div></div>`;
    }
    const ok = val === qq.answer;
    return `<div class="block rev-q ${ok ? "ok" : "no"}"><div class="qq">${qi + 1}. ${esc(qq.q)}</div>
      <div class="rev-line">Sua resposta: <b>${val != null ? esc(qq.options[val]) : "(em branco)"}</b> ${ok ? "✓" : "✗"}</div>
      ${ok ? "" : `<div class="rev-line">Correta: <b>${esc(qq.options[qq.answer])}</b></div>`}
      ${qq.explain ? `<div class="rev-exp">${esc(qq.explain)}</div>` : ""}</div>`;
  }

  function reviewTarefa(ti) {
    const root = $("#tasksReader");
    const tf = content.tarefas[ti];
    const state = getJSON(TAREFASKEY, {})[ti] || {};
    const answers = state.answers || {};
    let html = `<div class="block in"><button class="back-link" id="backTarefas">← Voltar para as tarefas</button>
      <div class="comp-card" style="margin-top:10px">
        <div class="comp-title" style="color:var(--green)">${esc(tf.titulo)} — concluída</div>
        <div class="timer-display">${state.score} <span style="font-size:1.1rem;color:var(--text-mut)">/ ${state.total}</span></div>
        <p class="comp-desc">Acertos nas questões de múltipla escolha. Suas respostas estão abaixo.</p></div></div>`;
    tf.questoes.forEach((qq, qi) => { html += tarefaReviewQHTML(qq, qi, answers); });
    root.innerHTML = html;
    $("#backTarefas").onclick = renderTasksHome;
    markIn(); window.scrollTo({ top: 0 });
  }

  function testeCardHTML(teste) {
    if (!teste || !teste.questoes || !teste.questoes.length)
      return `<p class="b-text" style="color:var(--text-mut)">O teste desta aula está em preparação.</p>`;
    const result = getJSON(TESTEKEY, null);
    if (result) {
      return `<div class="comp-card teste-card">
        <div class="comp-title" style="color:var(--green)">Teste concluído</div>
        <div class="timer-display">${result.score} <span style="font-size:1.1rem;color:var(--text-mut)">/ ${result.total}</span></div>
        <p class="comp-desc">Você já realizou este teste (tentativa única).</p>
        <button class="btn btn-ghost" id="reviewBtn">Ver minhas respostas</button>
        <div id="reviewBox" class="hidden" style="margin-top:18px;text-align:left"></div></div>`;
    }
    return `<div class="comp-card teste-card">
      <div class="comp-title">Teste da aula</div>
      <p class="comp-desc">São <b>${teste.questoes.length} perguntas</b> de múltipla escolha. Você tem <b>1 hora</b>, e o teste só pode ser <b>iniciado e encerrado com a senha</b> da prova. <b>Tentativa única.</b></p>
      <div class="comp-pass" id="startPassWrap" style="display:none">
        <input type="text" id="examStartPass" placeholder="Senha do teste" autocomplete="off">
        <button class="btn btn-gold" id="examStartGo">Começar</button></div>
      <button class="btn btn-gold btn-lg" id="startTesteBtn">Iniciar teste</button>
      <div class="comp-msg" id="startMsg"></div></div>`;
  }

  function bindTesteCard(root, teste) {
    if (getJSON(TESTEKEY, null)) {
      const rb = $("#reviewBtn", root);
      if (rb) rb.onclick = () => {
        const box = $("#reviewBox", root);
        if (!box.dataset.built) { box.innerHTML = reviewHTML(teste, getJSON(TESTEKEY, {}).answers || []); box.dataset.built = "1"; }
        box.classList.toggle("hidden");
      };
      return;
    }
    if (!teste || !teste.questoes) return;
    const startBtn = $("#startTesteBtn", root);
    if (!startBtn) return;
    startBtn.onclick = () => { $("#startPassWrap").style.display = "flex"; startBtn.style.display = "none"; $("#examStartPass").focus(); };
    const go = () => {
      const val = ($("#examStartPass").value || "").trim().toUpperCase();
      if (val === testPass(courseId, lesson).toUpperCase()) openExam(teste);
      else { const m = $("#startMsg"); m.className = "comp-msg err"; m.textContent = "Senha do teste incorreta."; }
    };
    $("#examStartGo").onclick = go;
    $("#examStartPass").addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
  }

  function reviewHTML(teste, answers) {
    return teste.questoes.map((q, i) => {
      const chosen = answers[i], ok = chosen === q.answer;
      return `<div class="rev-q ${ok ? "ok" : "no"}">
        <div class="qq">${i + 1}. ${esc(q.q)}</div>
        <div class="rev-line">Sua resposta: <b>${chosen != null ? esc(q.options[chosen]) : "(em branco)"}</b> ${ok ? "✓" : "✗"}</div>
        ${ok ? "" : `<div class="rev-line">Correta: <b>${esc(q.options[q.answer])}</b></div>`}
        ${q.explain ? `<div class="rev-exp">${esc(q.explain)}</div>` : ""}</div>`;
    }).join("");
  }

  function openExam(teste) {
    let start = getJSON(EXAMKEY, null);
    if (!start) { start = { ts: Date.now() }; setJSON(EXAMKEY, start); }
    const ov = document.createElement("div");
    ov.className = "exam-overlay"; ov.id = "examOverlay";
    ov.innerHTML = `
      <div class="exam-top">
        <div class="exam-title">📝 Teste — ${esc(lesson.title)}</div>
        <div class="exam-timer" id="examTimer">60:00</div></div>
      <div class="exam-body"><div class="exam-inner" id="examQs"></div>
        <div class="comp-card" style="margin-top:20px">
          <p class="comp-desc">Para encerrar, confirme com a senha do teste.</p>
          <div class="comp-pass">
            <input type="text" id="examEndPass" placeholder="Senha do teste" autocomplete="off">
            <button class="btn btn-gold btn-lg" id="examFinish">Finalizar e ver nota</button></div>
          <div class="comp-msg" id="endMsg"></div></div></div>`;
    document.body.appendChild(ov);
    document.body.style.overflow = "hidden";

    $("#examQs", ov).innerHTML = teste.questoes.map((q, i) => `
      <div class="exam-q"><div class="qq">${i + 1}. ${esc(q.q)}</div>
        <div class="exam-opts">${q.options.map((o, oi) =>
          `<label class="exam-opt"><input type="radio" name="eq${i}" value="${oi}"><span>${esc(o)}</span></label>`).join("")}</div></div>`).join("");

    const finish = () => {
      const answers = teste.questoes.map((q, i) => {
        const sel = ov.querySelector(`input[name="eq${i}"]:checked`); return sel ? +sel.value : null;
      });
      let score = 0; answers.forEach((a, i) => { if (a === teste.questoes[i].answer) score++; });
      setJSON(TESTEKEY, { score, total: teste.questoes.length, answers, at: Date.now() });
      localStorage.removeItem(EXAMKEY);
      clearInterval(exTimer);
      const lines = teste.questoes.map((q, i) => ({ q: q.q,
        chosen: answers[i] != null ? q.options[answers[i]] : "(em branco)",
        correct: q.options[q.answer], ok: answers[i] === q.answer }));
      const mail = sendTestResult({ kind: "Teste", student: (sess && sess.name) || who, courseName: course.full,
        lessonTitle: lesson.title, score, total: teste.questoes.length, lines });
      ov.remove(); document.body.style.overflow = "";
      burst(); renderTasksTab(); showMailFeedback(mail);
    };

    $("#examFinish", ov).onclick = () => {
      const val = ($("#examEndPass").value || "").trim().toUpperCase();
      if (val === testPass(courseId, lesson).toUpperCase()) finish();
      else { $("#endMsg").className = "comp-msg err"; $("#endMsg").textContent = "Senha incorreta para encerrar."; }
    };

    const timerEl = $("#examTimer", ov);
    var exTimer = setInterval(() => {
      const left = EXAM_SECONDS - Math.floor((Date.now() - start.ts) / 1000);
      if (left <= 0) { timerEl.textContent = "00:00"; finish(); return; }
      timerEl.textContent = `${String(Math.floor(left / 60)).padStart(2, "0")}:${String(left % 60).padStart(2, "0")}`;
      if (left <= 60) timerEl.classList.add("danger");
    }, 1000);
  }

  function showMailFeedback(mail) {
    const root = $("#tasksReader"); if (!root) return;
    const note = document.createElement("div"); note.className = "block in";
    if (mail.method === "emailjs") {
      note.innerHTML = `<div class="callout verse"><span class="ci">📧</span><div><h4>Resultado enviado</h4>
        <p>O resultado e as respostas foram enviados por e-mail à direção.</p></div></div>`;
    } else {
      note.innerHTML = `<div class="callout warn"><span class="ci">📧</span><div><h4>Enviar resultado à direção</h4>
        <p>Clique para enviar o resultado por e-mail. (O envio automático fica ativo ao configurar o EmailJS.)</p>
        <a class="btn btn-gold" href="${mail.url}" style="margin-top:10px">Enviar resultado por e-mail</a></div></div>`;
    }
    root.prepend(note); window.scrollTo({ top: 0 });
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
    bindTasks();
    setupReveal(cWrap);
    renderComplete();

    $$(".rtab").forEach((tab) => tab.addEventListener("click", () => {
      $$(".rtab").forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      const isContent = tab.dataset.tab === "content";
      activeTab = isContent ? "content" : "tasks";
      cWrap.classList.toggle("hidden", !isContent);
      tWrap.classList.toggle("hidden", isContent);
      if (!isContent) { bindTasks(); setupReveal(tWrap); }
      window.scrollTo({ top: 0, behavior: "instant" in document.documentElement.style ? "instant" : "auto" });
    }));
  }

  document.addEventListener("DOMContentLoaded", render);
})();
