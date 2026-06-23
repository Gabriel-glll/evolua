/* ===========================================================
   EVOLUA — Área do Aluno / Área do Professor
   data-area="aluno"  -> exige login (qualquer aluno)
   data-area="professor" -> exige admin/professor
   =========================================================== */
(function () {
  "use strict";
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const which = document.body.dataset.area;

  function lockCard(title, desc, btn) {
    return `<div class="area-lock">
      <div style="font-size:3rem">🔒</div>
      <h1>${title}</h1>
      <p class="muted">${desc}</p>
      <button class="btn btn-gold" id="areaLogin" style="margin-top:8px">${btn}</button></div>`;
  }
  function bindLogin() {
    const b = document.getElementById("areaLogin");
    if (b) b.onclick = () => window.EvoluaSite && EvoluaSite.openAuthModal();
  }

  function courseCard(c) {
    const done = Auth.getDone(c.id).size;
    const pct = c.totalLessons ? Math.round((done / c.totalLessons) * 100) : 0;
    const ico = c.id === "mea" ? "🗣️" : "📈";
    return `<a class="area-card" href="curso-${c.id}.html">
      <div class="ac-ico">${ico}</div>
      <h3>${esc(c.full)}</h3>
      <div class="progress-bar" style="margin:12px 0 8px"><i style="width:${pct}%"></i></div>
      <div class="ac-sub">${done} de ${c.totalLessons} aulas · ${pct}%</div>
      <span class="ac-go">Continuar →</span></a>`;
  }

  function renderAluno(root, user) {
    if (!user) {
      root.innerHTML = lockCard("Área do Aluno", "Entre com a sua conta para acessar os seus cursos e acompanhar o seu progresso.", "Entrar");
      bindLogin(); return;
    }
    const cursos = Object.values(COURSES).filter((c) => Auth.hasAnyAccess(c.id));
    const cards = cursos.length
      ? cursos.map(courseCard).join("")
      : `<p class="muted">Você ainda não está matriculado em nenhum curso. <a href="index.html#contato" style="color:var(--gold)">Fale conosco</a> para começar.</p>`;
    root.innerHTML = `<div class="area-wrap">
      <div class="eyebrow">Área do Aluno</div>
      <h1>Olá, ${esc(user.name.split(" ")[0])} 👋</h1>
      <p class="muted">Continue de onde parou. Estes são os seus cursos.</p>
      <div class="area-cards">${cards}</div>
    </div>`;
  }

  function renderProfessor(root, user) {
    if (!user || user.role !== "admin") {
      root.innerHTML = lockCard("Área do Professor", "Acesso exclusivo para professores e administração.", "Entrar como professor(a)");
      bindLogin(); return;
    }
    root.innerHTML = `<div class="area-wrap">
      <div class="eyebrow">Área do Professor</div>
      <h1>Painel de professores</h1>
      <p class="muted">Ferramentas de gestão das turmas e dos cursos.</p>
      <div class="area-cards">
        <a class="area-card" href="chamada.html">
          <div class="ac-ico">📋</div><h3>Fazer chamada</h3>
          <p>Registre a presença e libere as senhas de presença e do teste de cada aula.</p>
          <span class="ac-go">Abrir →</span></a>
        <a class="area-card" href="cursos.html">
          <div class="ac-ico">📚</div><h3>Cursos e conteúdo</h3>
          <p>Acesse a grade, o conteúdo, as tarefas e os testes dos cursos.</p>
          <span class="ac-go">Abrir →</span></a>
      </div>
    </div>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("area-root");
    if (!root) return;
    const user = Auth.current();
    if (which === "professor") renderProfessor(root, user);
    else renderAluno(root, user);
  });
})();
