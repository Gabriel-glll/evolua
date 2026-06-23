/* ===========================================================
   EVOLUA — hub do curso: grade em CARDS
   A grade é pública; o conteúdo abre só para quem tem acesso.
   Cada card: imagem, nível de atenção, tempo e status.
   =========================================================== */
(function () {
  const courseId = document.body.dataset.course;
  const course = COURSES[courseId];
  if (!course) return;

  const fmtDate = (d) =>
    d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

  /* imagens de capa (placeholder — trocar por fotos reais depois).
     Caem em um gradiente caso a imagem externa falhe. */
  const COVERS = {
    mea: [
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=700&q=60&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=700&q=60&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=60&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=700&q=60&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=700&q=60&auto=format&fit=crop",
    ],
    jetro: [
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=700&q=60&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=700&q=60&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&q=60&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=700&q=60&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=60&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=60&auto=format&fit=crop",
    ],
  };

  /* níveis de atenção (placeholder — o usuário enviará o nível de cada aula).
     valores possíveis: "importante" | "muito" | "crucial" */
  const DEMO_LEVELS = {
    "jetro-1a": "importante", "jetro-1b": "importante",
    "jetro-2a": "muito", "jetro-2c": "crucial",
    "jetro-3d": "crucial", "jetro-4a": "muito", "jetro-4b": "crucial",
    "jetro-6b": "muito", "jetro-7b": "muito", "jetro-9b": "crucial",
    "mea-1": "crucial", "mea-3": "muito",
  };
  const LEVEL_LABEL = { importante: "Importante", muito: "Muito importante", crucial: "Crucial" };

  let coverIdx = 0;
  const nextCover = () => {
    const arr = COVERS[courseId] || COVERS.jetro;
    return arr[coverIdx++ % arr.length];
  };

  /* ---------- Barra de progresso (processo de conclusão) ---------- */
  function renderProgress() {
    const wrap = document.getElementById("progressWrap");
    if (!wrap) return;
    if (!Auth.hasAnyAccess(courseId)) { wrap.classList.add("hidden"); return; }
    wrap.classList.remove("hidden");
    const done = Auth.getDone(courseId);
    const pct = Math.round((done.size / course.totalLessons) * 100);
    wrap.querySelector("i").style.width = pct + "%";
    wrap.querySelector(".progress-label").textContent =
      `${done.size} de ${course.totalLessons} aulas concluídas · ${pct}%`;
  }

  /* ---------- Grade em cards ---------- */
  function renderModules() {
    const root = document.getElementById("modules");
    const done = Auth.getDone(courseId);
    root.innerHTML = "";

    course.modules.forEach((mod) => {
      const block = document.createElement("div");
      block.className = "tema-block";

      const cards = mod.lessons.map((les) => {
        const acc = Auth.lessonAccess(courseId, les);
        const isDone = done.has(les.id);
        const level = DEMO_LEVELS[les.id] || "importante";
        const cover = les.cover || nextCover();
        const open = acc.state === "open";

        let status = "";
        if (open) {
          status = `<span class="status-badge ${isDone ? "done" : "todo"}">${isDone ? "✓ Concluída" : "A fazer"}</span>`;
        }

        let metaRight = "🔒 Requer senha";
        if (open) metaRight = isDone ? "Revisar →" : "Acessar →";
        else if (acc.state === "locked-time") metaRight = "🔒 " + fmtDate(acc.releaseDate);
        else if (acc.state === "locked-enroll") metaRight = "🔒 Requer matrícula";

        return `
          <article class="lcard ${open ? "open" : "locked"}" ${open ? `data-lesson="${les.id}"` : ""}>
            <div class="lcard-media">
              <img src="${cover}" alt="" loading="lazy" onerror="this.remove()">
              <span class="lvl-badge lvl-${level}">${LEVEL_LABEL[level]}</span>
              <span class="week-chip">Semana ${les.week}</span>
              ${status}
            </div>
            <div class="lcard-body">
              <div class="lcard-tema">${mod.title.split("—")[0].trim()}</div>
              <h3>${les.title}</h3>
              <div class="lcard-meta">
                <span>⏱️ ${les.min} min</span>
                <span class="go">${metaRight}</span>
              </div>
            </div>
          </article>`;
      }).join("");

      block.innerHTML = `
        <div class="tema-head"><h3>${mod.title}</h3>
          <span class="tema-count">${mod.lessons.length} aula${mod.lessons.length > 1 ? "s" : ""}</span></div>
        <div class="lessons-grid">${cards}</div>`;
      root.appendChild(block);
    });

    root.querySelectorAll(".lcard.open[data-lesson]").forEach((card) => {
      card.addEventListener("click", () => {
        location.href = `aula.html?c=${courseId}&l=${card.dataset.lesson}`;
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const banner = document.getElementById("accessBanner");
    if (banner) banner.remove(); // banner removido a pedido — fica só o processo de conclusão
    renderHubHero();
    renderProgress();
    renderModules();
  });

  /* ---------- Cabeçalho do hub ---------- */
  function renderHubHero() {
    const set = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
    set("hubTag", course.tag);
    set("hubName", course.full);
    set("hubSummary", course.summary);
    set("hubForWho", course.forWho);
    const meta = document.getElementById("hubMeta");
    if (meta) meta.innerHTML = `
      <div class="m"><b>${course.meta.duracao}</b><span>Duração</span></div>
      <div class="m"><b>${course.meta.aulas}</b><span>Aulas</span></div>
      <div class="m"><b>${course.modules.length} módulos</b><span>Estrutura</span></div>`;
  }
})();
