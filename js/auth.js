/* ===========================================================
   EVOLUA — autenticação, matrículas e progresso
   ----------------------------------------------------------
   ATENÇÃO: esta é uma versão de PROTÓTIPO. O login roda no
   navegador (localStorage), então a senha fica visível no
   código. Serve para demonstrar o fluxo. Para colocar no ar
   com alunos reais, ligamos um banco seguro (ex.: Supabase),
   onde as senhas ficam guardadas como hash e o progresso é
   sincronizado entre dispositivos.
   =========================================================== */

const Auth = (() => {
  const LS_USERS = "evolua_users";
  const LS_SESSION = "evolua_session";

  // Usuário padrão do sistema. No momento só existe o admin.
  // role "admin" = acesso total a tudo (todos os cursos, todo o conteúdo).
  const SEED_USERS = [
    {
      username: "admin",
      name: "Administrador",
      password: "memel0803",
      role: "admin",
      // matrículas: por curso -> { mode: "turma" | "independente", start: "YYYY-MM-DD" }
      enrollments: {},
    },
  ];

  function loadUsers() {
    try {
      const raw = JSON.parse(localStorage.getItem(LS_USERS));
      if (Array.isArray(raw) && raw.length) return raw;
    } catch (e) {}
    localStorage.setItem(LS_USERS, JSON.stringify(SEED_USERS));
    return JSON.parse(JSON.stringify(SEED_USERS));
  }

  function saveUsers(users) {
    localStorage.setItem(LS_USERS, JSON.stringify(users));
  }

  function login(username, password) {
    const users = loadUsers();
    const u = users.find(
      (x) => x.username.toLowerCase() === String(username).trim().toLowerCase()
    );
    if (!u || u.password !== password) {
      return { ok: false, error: "Usuário ou senha incorretos." };
    }
    const session = { username: u.username, name: u.name, role: u.role, at: Date.now() };
    localStorage.setItem(LS_SESSION, JSON.stringify(session));
    return { ok: true, user: session };
  }

  function logout() {
    localStorage.removeItem(LS_SESSION);
  }

  function current() {
    try {
      return JSON.parse(localStorage.getItem(LS_SESSION));
    } catch (e) {
      return null;
    }
  }

  function fullUser() {
    const s = current();
    if (!s) return null;
    return loadUsers().find((u) => u.username === s.username) || null;
  }

  /* ---------- Acesso a uma aula ----------
     Retorna { state, reason } onde state é:
       "open"          -> liberado
       "locked-login"  -> precisa entrar na conta
       "locked-enroll" -> logado mas sem matrícula no curso
       "locked-time"   -> matriculado na turma, mas aula ainda não liberou
  */
  function lessonAccess(courseId, lesson) {
    const user = fullUser();
    if (!user) return { state: "locked-login" };
    if (user.role === "admin") return { state: "open" };

    const en = user.enrollments && user.enrollments[courseId];
    if (!en) return { state: "locked-enroll" };

    if (en.mode === "independente") return { state: "open" };

    // modalidade turma: libera conforme o tempo
    const start = new Date(en.start + "T00:00:00");
    const release = new Date(start);
    release.setDate(release.getDate() + (lesson.week - 1) * 7);
    const today = new Date();
    if (today >= release) return { state: "open" };
    return { state: "locked-time", releaseDate: release };
  }

  function hasAnyAccess(courseId) {
    const user = fullUser();
    if (!user) return false;
    if (user.role === "admin") return true;
    return !!(user.enrollments && user.enrollments[courseId]);
  }

  /* ---------- Progresso (aulas concluídas) ---------- */
  function progressKey(courseId) {
    const s = current();
    return `evolua_progress_${s ? s.username : "anon"}_${courseId}`;
  }
  function getDone(courseId) {
    try {
      return new Set(JSON.parse(localStorage.getItem(progressKey(courseId))) || []);
    } catch (e) {
      return new Set();
    }
  }
  function setDone(courseId, lessonId, done) {
    const set = getDone(courseId);
    done ? set.add(lessonId) : set.delete(lessonId);
    localStorage.setItem(progressKey(courseId), JSON.stringify([...set]));
    return set;
  }

  return {
    login, logout, current, fullUser,
    lessonAccess, hasAnyAccess,
    getDone, setDone,
    loadUsers, saveUsers,
  };
})();
