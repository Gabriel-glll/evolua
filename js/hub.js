/* ===========================================================
   EVOLUA — renderização do hub de um curso
   A grade e as informações são SEMPRE visíveis (público).
   O conteúdo das aulas/tarefas só abre para quem tem acesso.
   =========================================================== */

(function () {
  const courseId = document.body.dataset.course;
  const course = COURSES[courseId];
  if (!course) return;

  const fmtDate = (d) =>
    d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

  /* ---------- Banner de acesso ---------- */
  function renderAccessBanner() {
    const el = document.getElementById("accessBanner");
    const user = Auth.current();
    const has = Auth.hasAnyAccess(courseId);

    if (has) {
      const label =
        user.role === "admin" ? "acesso total (administrador)" : "conteúdo liberado";
      el.className = "access-banner ok";
      el.innerHTML = `
        <div class="txt">🔓 <b>Você tem acesso a este curso</b> — ${label}.
        Clique em uma aula para começar.</div>
        <button class="btn btn-ghost" id="bannerAccount">Minha conta</button>`;
      document.getElementById("bannerAccount").onclick = () =>
        window.EvoluaSite.openAuthModal();
      return;
    }

    el.className = "access-banner";
    if (user) {
      el.innerHTML = `
        <div class="txt">🔒 <b>Você ainda não está matriculado neste curso.</b>
        A grade está liberada para você conhecer, mas as aulas e tarefas exigem matrícula.</div>
        <a class="btn btn-gold" href="index.html#contato">Quero me matricular</a>`;
    } else {
      el.innerHTML = `
        <div class="txt">🔒 <b>Conteúdo bloqueado.</b> Conheça toda a grade abaixo.
        Para acessar as aulas e tarefas, entre com sua senha de aluno.</div>
        <button class="btn btn-gold" id="bannerLogin">Entrar com minha senha</button>`;
      document.getElementById("bannerLogin").onclick = () =>
        window.EvoluaSite.openAuthModal();
    }
  }

  /* ---------- Barra de progresso ---------- */
  function renderProgress() {
    const wrap = document.getElementById("progressWrap");
    if (!Auth.hasAnyAccess(courseId)) {
      wrap.classList.add("hidden");
      return;
    }
    wrap.classList.remove("hidden");
    const done = Auth.getDone(courseId);
    const pct = Math.round((done.size / course.totalLessons) * 100);
    wrap.querySelector("i").style.width = pct + "%";
    wrap.querySelector(".progress-label").textContent =
      `${done.size} de ${course.totalLessons} aulas concluídas · ${pct}%`;
  }

  /* ---------- Grade (módulos e aulas) ---------- */
  function renderModules() {
    const root = document.getElementById("modules");
    const done = Auth.getDone(courseId);
    root.innerHTML = "";

    course.modules.forEach((mod, mi) => {
      const wrap = document.createElement("div");
      wrap.className = "module";

      const lessons = mod.lessons
        .map((les) => {
          const acc = Auth.lessonAccess(courseId, les);
          const isDone = done.has(les.id);
          let icon = "🔒", cls = "locked", sub = "", action = "";

          if (acc.state === "open") {
            cls = isDone ? "done" : "";
            icon = isDone ? "✓" : "▶";
            sub = `${les.min} min`;
            action = `<button data-lesson="${les.id}">${isDone ? "Revisar" : "Acessar"}</button>`;
          } else if (acc.state === "locked-time") {
            sub = `Disponível em ${fmtDate(acc.releaseDate)}`;
            action = `<span class="tag-lock">🔒 Em breve</span>`;
          } else if (acc.state === "locked-enroll") {
            sub = `Semana ${les.week}`;
            action = `<span class="tag-lock">🔒 Requer matrícula</span>`;
          } else {
            sub = `Semana ${les.week}`;
            action = `<span class="tag-lock">🔒 Requer senha</span>`;
          }

          return `
            <div class="lesson ${cls}">
              <div class="l-ico">${icon}</div>
              <div class="l-main">
                <div class="l-title">${les.title}</div>
                <div class="l-sub">${sub}</div>
              </div>
              <div class="l-action">${action}</div>
            </div>`;
        })
        .join("");

      wrap.innerHTML = `
        <div class="module-head">
          <h3>${mod.title}</h3>
          <span class="mh-meta">${mod.lessons.length} aulas</span>
        </div>
        <div class="lesson-list">${lessons}</div>`;
      root.appendChild(wrap);
    });

    // liga os botões "Acessar/Revisar"
    root.querySelectorAll("button[data-lesson]").forEach((btn) => {
      btn.addEventListener("click", () => openLesson(btn.dataset.lesson));
    });
  }

  /* ---------- Modal de aula (conteúdo + tarefas) ---------- */
  function findLesson(id) {
    for (const m of course.modules) {
      const l = m.lessons.find((x) => x.id === id);
      if (l) return l;
    }
    return null;
  }

  function buildLessonModal() {
    if (document.getElementById("lessonModal")) return;
    const div = document.createElement("div");
    div.className = "modal-overlay";
    div.id = "lessonModal";
    div.innerHTML = `
      <div class="modal wide" role="dialog" aria-modal="true">
        <button class="close" id="lessonClose" aria-label="Fechar">×</button>
        <div id="lessonBody" class="lesson-content"></div>
      </div>`;
    document.body.appendChild(div);
    div.addEventListener("click", (e) => { if (e.target === div) closeLesson(); });
    document.getElementById("lessonClose").addEventListener("click", closeLesson);
  }

  function openLesson(id) {
    const acc = Auth.lessonAccess(courseId, findLesson(id));
    if (acc.state !== "open") return;
    const les = findLesson(id);
    const done = Auth.getDone(courseId).has(id);

    buildLessonModal();
    const body = document.getElementById("lessonBody");
    body.innerHTML = `
      <span class="tag-pill" style="border-color:var(--gold-deep);color:var(--gold)">${course.name}</span>
      <h3 style="text-align:left;margin-top:12px">${les.title}</h3>
      <p class="muted" style="margin-bottom:18px">Duração estimada: ${les.min} minutos</p>

      <h4>Vídeo da aula</h4>
      <div class="video-ph">▶ &nbsp; Player do vídeo (a ser adicionado)</div>

      <h4>Conteúdo</h4>
      <p>Este é o espaço da aula. Aqui entrará o material completo: explicações, exemplos,
      slides e materiais de apoio para download. (Conteúdo de demonstração.)</p>

      <h4>Tarefas e testes</h4>
      <div class="tasks">
        <label class="task-item"><input type="checkbox"> Assistir à aula completa</label>
        <label class="task-item"><input type="checkbox"> Concluir os exercícios propostos</label>
        <label class="task-item"><input type="checkbox"> Responder ao teste de fixação</label>
      </div>

      <div style="display:flex;gap:12px;margin-top:24px;flex-wrap:wrap">
        <button class="btn btn-gold" id="markDone">${done ? "✓ Aula concluída" : "Marcar como concluída"}</button>
        <button class="btn btn-ghost" id="lessonCloseBtn">Fechar</button>
      </div>`;

    const markBtn = document.getElementById("markDone");
    markBtn.onclick = () => {
      const nowDone = !Auth.getDone(courseId).has(id);
      Auth.setDone(courseId, id, nowDone);
      markBtn.textContent = nowDone ? "✓ Aula concluída" : "Marcar como concluída";
      renderProgress();
      renderModules();
    };
    document.getElementById("lessonCloseBtn").onclick = closeLesson;

    document.getElementById("lessonModal").classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeLesson() {
    const m = document.getElementById("lessonModal");
    if (m) m.classList.remove("open");
    document.body.style.overflow = "";
  }

  /* ---------- Preenche o cabeçalho do hub ---------- */
  function renderHubHero() {
    document.getElementById("hubTag").textContent = course.tag;
    document.getElementById("hubName").textContent = course.full;
    document.getElementById("hubSummary").textContent = course.summary;
    const meta = document.getElementById("hubMeta");
    meta.innerHTML = `
      <div class="m"><b>${course.meta.duracao}</b><span>Duração</span></div>
      <div class="m"><b>${course.meta.aulas}</b><span>Aulas</span></div>
      <div class="m"><b>${course.modules.length} módulos</b><span>Estrutura</span></div>
      <div class="m"><b>${course.meta.nivel}</b><span>Nível</span></div>`;
    document.getElementById("hubForWho").textContent = course.forWho;
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderHubHero();
    renderAccessBanner();
    renderProgress();
    renderModules();
  });
})();
