/* ===========================================================
   EVOLUA — Chamada (presença) — PROTÓTIPO para professores
   Apenas o admin/professores acessam. Aqui o professor faz a
   chamada de uma aula e libera a senha de conclusão.
   ⚠️ Enviar a senha por e-mail automaticamente e salvar a
   lista real de alunos exige o backend (Supabase + e-mail).
   Esta tela demonstra o fluxo com dados de exemplo.
   =========================================================== */
(function () {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);

  // alunos de exemplo (na versão real, viriam do banco de dados)
  const DEMO_STUDENTS = [
    { name: "Ana Souza", email: "ana@email.com" },
    { name: "Bruno Lima", email: "bruno@email.com" },
    { name: "Carla Dias", email: "carla@email.com" },
    { name: "Diego Alves", email: "diego@email.com" },
  ];

  function render() {
    const root = $("#cham-root");
    const user = Auth.current();

    if (!user || (user.role !== "admin" && user.role !== "professor")) {
      root.innerHTML = `<div class="cham-restrito">
        <div style="font-size:3rem">🔒</div>
        <h1>Área restrita</h1>
        <p>A chamada é exclusiva para professores e administração.</p>
        <button class="btn btn-gold" id="cLogin">Entrar como professor(a)</button></div>`;
      $("#cLogin").onclick = () => window.EvoluaSite && EvoluaSite.openAuthModal();
      return;
    }

    const courseOpts = Object.values(COURSES)
      .map((c) => `<option value="${c.id}">${c.name} — ${c.tag}</option>`).join("");

    root.innerHTML = `
      <div class="cham-wrap">
        <div class="eyebrow">Área de professores</div>
        <h1 style="font-size:clamp(2rem,4vw,2.8rem)">Chamada</h1>
        <p class="muted">Faça a presença de uma aula. Os alunos presentes recebem a senha para marcar a aula como concluída.</p>

        <div class="cham-card">
          <div class="cham-row">
            <div class="field"><label>Curso</label>
              <select id="selCourse">${courseOpts}</select></div>
            <div class="field"><label>Aula</label>
              <select id="selLesson"></select></div>
          </div>
          <div class="cham-row" style="margin-top:8px">
            <div><label style="font-size:.8rem;letter-spacing:.5px;color:var(--text-mut)">Senha de presença (concluir aula)</label><br>
              <span class="pass-pill" id="passPill">—</span></div>
            <div><label style="font-size:.8rem;letter-spacing:.5px;color:var(--text-mut)">Senha do teste (prova)</label><br>
              <span class="pass-pill" id="testPill">—</span></div>
          </div>
        </div>

        <div class="cham-card">
          <h3 style="margin-top:0">Presença</h3>
          <div id="studentList"></div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:8px">
            <button class="btn btn-gold" id="sendBtn">📧 Enviar senha aos presentes</button>
            <span class="comp-msg ok" id="sendMsg" style="align-self:center"></span>
          </div>
        </div>

        <div class="cham-note">
          <span>⚠️</span>
          <div><b>Protótipo.</b> O envio automático de e-mail e a lista real de alunos com a presença salva
          dependem do backend (Supabase + serviço de e-mail). Aqui usamos alunos de exemplo para demonstrar o fluxo.</div>
        </div>
      </div>`;

    const selCourse = $("#selCourse"), selLesson = $("#selLesson");

    function fillLessons() {
      const c = COURSES[selCourse.value];
      selLesson.innerHTML = c.modules.map((m) =>
        `<optgroup label="${m.title}">${m.lessons.map((l) =>
          `<option value="${l.id}">Semana ${l.week} · ${l.title}</option>`).join("")}</optgroup>`).join("");
      updatePass();
    }
    function findLesson(id) {
      const c = COURSES[selCourse.value];
      for (const m of c.modules) { const l = m.lessons.find((x) => x.id === id); if (l) return l; }
      return null;
    }
    function updatePass() {
      const l = findLesson(selLesson.value);
      $("#passPill").textContent = l ? lessonPass(selCourse.value, l) : "—";
      $("#testPill").textContent = l ? testPass(selCourse.value, l) : "—";
      $("#sendMsg").textContent = "";
    }
    function fillStudents() {
      $("#studentList").innerHTML = DEMO_STUDENTS.map((s, i) =>
        `<label class="student-row" data-i="${i}">
          <input type="checkbox" data-present="${i}">
          <span class="s-name">${s.name}<br><span class="s-mail">${s.email}</span></span>
        </label>`).join("");
      $("#studentList").querySelectorAll("input[data-present]").forEach((c) =>
        c.addEventListener("change", () => c.closest(".student-row").classList.toggle("present", c.checked)));
    }

    selCourse.addEventListener("change", fillLessons);
    selLesson.addEventListener("change", updatePass);
    $("#sendBtn").onclick = () => {
      const presentes = [...document.querySelectorAll("input[data-present]:checked")]
        .map((c) => DEMO_STUDENTS[+c.dataset.present].name);
      const msg = $("#sendMsg");
      if (!presentes.length) { msg.className = "comp-msg err"; msg.textContent = "Marque ao menos um aluno presente."; return; }
      msg.className = "comp-msg ok";
      msg.textContent = `Protótipo: a senha "${$("#passPill").textContent}" seria enviada por e-mail a ${presentes.length} aluno(s).`;
    };

    fillLessons();
    fillStudents();
  }

  document.addEventListener("DOMContentLoaded", render);
})();
