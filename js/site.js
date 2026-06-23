/* ===========================================================
   EVOLUA — cabeçalho, rodapé e modal de login compartilhados
   =========================================================== */

(function () {
  const page = document.body.dataset.page || "";

  function navLink(href, label, key) {
    const active = key === page ? " active" : "";
    return `<a class="link${active}" href="${href}">${label}</a>`;
  }

  function renderHeader() {
    const user = Auth.current();
    const el = document.getElementById("site-header");
    if (!el) return;
    el.innerHTML = `
      <header class="site-header">
        <div class="wrap nav">
          <a class="nav-logo" href="index.html" aria-label="EVOLUA — início">
            <img src="assets/logo.svg" alt="EVOLUA">
          </a>
          <nav class="nav-links" id="navLinks">
            ${navLink("index.html", "Início", "inicio")}
            ${navLink("cursos.html", "Cursos", "cursos")}
            ${navLink("index.html#contato", "Contato", "contato")}
            <a class="link nav-area-m${page === "aluno" ? " active" : ""}" href="area-aluno.html">Área do Aluno</a>
            <a class="link nav-area-m${page === "professor" ? " active" : ""}" href="area-professor.html">Área do Professor</a>
          </nav>
          <div class="nav-actions">
            <a class="link nav-area-d${page === "aluno" ? " active" : ""}" href="area-aluno.html">Área do Aluno</a>
            <a class="link nav-area-d${page === "professor" ? " active" : ""}" href="area-professor.html">Área do Professor</a>
            <span class="nav-user" id="navUser">
              <span>Olá, ${user ? user.name.split(" ")[0] : ""}</span>
            </span>
            <button class="btn btn-ghost" id="loginBtn">
              <span class="btn-login-text">${user ? "Minha conta" : "Login"}</span>
              <span aria-hidden="true">→</span>
            </button>
            <button class="nav-toggle" id="navToggle" aria-label="Menu">☰</button>
          </div>
        </div>
      </header>`;

    if (user) {
      const nu = document.getElementById("navUser");
      if (nu) nu.style.display = "flex";
    }

    document.getElementById("navToggle").addEventListener("click", () => {
      document.getElementById("navLinks").classList.toggle("open");
    });
    document.getElementById("loginBtn").addEventListener("click", openAuthModal);
  }

  function renderFooter() {
    const el = document.getElementById("site-footer");
    if (!el) return;
    el.innerHTML = `
      <footer class="site-footer">
        <div class="wrap footer-grid">
          <div class="footer-col" style="max-width:300px">
            <img src="assets/logo.svg" alt="EVOLUA">
            <p class="muted" style="font-size:.9rem">Escola livre de capacitação com princípios
            cristãos. Cursos voltados à sua evolução — pessoal, espiritual, familiar e profissional.</p>
          </div>
          <div class="footer-col">
            <h4>Navegação</h4>
            <a href="index.html">Início</a>
            <a href="cursos.html">Cursos</a>
            <a href="index.html#contato">Contato</a>
          </div>
          <div class="footer-col">
            <h4>Cursos</h4>
            <a href="curso-mea.html">MEA — Inglês</a>
            <a href="curso-jetro.html">JETRO — Finanças</a>
          </div>
          <div class="footer-col">
            <h4>Contato</h4>
            <a href="mailto:contato@evolua.com.br">contato@evolua.com.br</a>
            <a href="#">WhatsApp</a>
            <a href="#">Instagram</a>
          </div>
        </div>
        <div class="wrap footer-bottom">
          <span>© ${new Date().getFullYear()} EVOLUA — Escola de evolução.</span>
          <span>Feito com propósito.</span>
        </div>
      </footer>`;
  }

  /* ---------- Modal de login / conta ---------- */
  function buildModal() {
    if (document.getElementById("authModal")) return;
    const div = document.createElement("div");
    div.className = "modal-overlay";
    div.id = "authModal";
    div.innerHTML = `
      <div class="modal" role="dialog" aria-modal="true">
        <button class="close" id="authClose" aria-label="Fechar">×</button>
        <div id="authBody"></div>
      </div>`;
    document.body.appendChild(div);
    div.addEventListener("click", (e) => { if (e.target === div) closeAuthModal(); });
    document.getElementById("authClose").addEventListener("click", closeAuthModal);
  }

  let pendingReg = null;
  function doSendVerification(email, code) {
    if (typeof sendVerification === "function") return sendVerification(email, code);
    return { method: "demo", code };
  }

  function loginFormHTML() {
    return `
      <img class="modal-logo" src="assets/logo.svg" alt="EVOLUA">
      <h3>Bem-vindo de volta</h3>
      <p class="modal-sub">Entre para acessar o conteúdo dos seus cursos.</p>
      <form id="loginForm">
        <div class="field"><label for="lu">Usuário ou e-mail</label>
          <input id="lu" type="text" autocomplete="username" placeholder="seu e-mail" required></div>
        <div class="field"><label for="lp">Senha</label>
          <input id="lp" type="password" autocomplete="current-password" placeholder="••••••••" required></div>
        <button class="btn btn-gold btn-block" type="submit">Entrar</button>
        <div class="form-msg" id="loginMsg"></div>
      </form>
      <p class="modal-hint">Ainda não tem conta? <a href="#" id="goRegister" style="color:var(--gold)">Criar conta</a></p>`;
  }

  function registerFormHTML() {
    return `
      <img class="modal-logo" src="assets/logo.svg" alt="EVOLUA">
      <h3>Criar conta</h3>
      <p class="modal-sub">Você receberá um código de verificação no seu e-mail.</p>
      <form id="registerForm">
        <div class="field"><label for="rName">Nome completo</label><input id="rName" type="text" required></div>
        <div class="field"><label for="rEmail">E-mail</label><input id="rEmail" type="email" placeholder="voce@email.com" required></div>
        <div class="field"><label for="rCode">Código de cadastro</label><input id="rCode" type="text" placeholder="código de aluno ou professor" required></div>
        <div class="field"><label for="rPass">Crie uma senha</label><input id="rPass" type="password" required></div>
        <button class="btn btn-gold btn-block" type="submit">Continuar</button>
        <div class="form-msg" id="regMsg"></div>
      </form>
      <p class="modal-hint">Já tem conta? <a href="#" id="goLogin" style="color:var(--gold)">Entrar</a></p>`;
  }

  function verifyFormHTML(res, email) {
    const demo = res.method === "demo"
      ? `<div class="callout warn" style="margin-bottom:16px"><span class="ci">🔐</span><div><h4>Modo demonstração</h4>
         <p>O seu código é <b style="font-size:1.1rem">${res.code}</b>. Com o EmailJS configurado, ele vai automaticamente para o e-mail.</p></div></div>`
      : "";
    return `
      <img class="modal-logo" src="assets/logo.svg" alt="EVOLUA">
      <h3>Verifique seu e-mail</h3>
      <p class="modal-sub">Enviamos um código de 6 dígitos para <b>${email}</b>.</p>
      ${demo}
      <form id="verifyForm">
        <div class="field"><label for="vCode">Código de verificação</label>
          <input id="vCode" type="text" inputmode="numeric" maxlength="6" placeholder="000000" required></div>
        <button class="btn btn-gold btn-block" type="submit">Confirmar e criar conta</button>
        <div class="form-msg" id="vMsg"></div>
      </form>
      <p class="modal-hint"><a href="#" id="goRegister" style="color:var(--gold)">Corrigir e-mail / recomeçar</a></p>`;
  }

  function accountHTML(user) {
    const staff = user.role === "admin" || user.role === "professor";
    const tag = user.role === "admin" ? " (acesso total)" : user.role === "professor" ? " (professor)" : "";
    return `
      <img class="modal-logo" src="assets/logo.svg" alt="EVOLUA">
      <h3>Minha conta</h3>
      <p class="modal-sub">Você está conectado como <b style="color:var(--gold)">${user.name}</b>${tag}.</p>
      <a class="btn btn-gold btn-block" href="area-aluno.html" style="margin-bottom:12px">Minha área</a>
      ${staff ? `<a class="btn btn-ghost btn-block" href="area-professor.html" style="margin-bottom:12px">📋 Área do professor</a>` : ""}
      <button class="btn btn-ghost btn-block" id="logoutBtn">Sair da conta</button>`;
  }

  function showAccount(user) {
    const body = document.getElementById("authBody");
    body.innerHTML = accountHTML(user);
    document.getElementById("logoutBtn").addEventListener("click", () => { Auth.logout(); closeAuthModal(); location.reload(); });
  }

  function showLogin() {
    const body = document.getElementById("authBody");
    body.innerHTML = loginFormHTML();
    document.getElementById("loginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = document.getElementById("loginMsg");
      const res = Auth.login(document.getElementById("lu").value, document.getElementById("lp").value);
      if (res.ok) { msg.className = "form-msg ok"; msg.textContent = "Acesso liberado! Carregando..."; setTimeout(() => location.reload(), 500); }
      else { msg.className = "form-msg err"; msg.textContent = res.error; }
    });
    document.getElementById("goRegister").addEventListener("click", (e) => { e.preventDefault(); showRegister(); });
  }

  function showRegister() {
    const body = document.getElementById("authBody");
    body.innerHTML = registerFormHTML();
    document.getElementById("goLogin").addEventListener("click", (e) => { e.preventDefault(); showLogin(); });
    document.getElementById("registerForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = document.getElementById("regMsg");
      const name = document.getElementById("rName").value.trim();
      const email = document.getElementById("rEmail").value.trim();
      const code = document.getElementById("rCode").value.trim();
      const pass = document.getElementById("rPass").value;
      if (!name || !email || !pass) { msg.className = "form-msg err"; msg.textContent = "Preencha todos os campos."; return; }
      const role = Auth.roleForCode(code);
      if (!role) { msg.className = "form-msg err"; msg.textContent = "Código de cadastro inválido."; return; }
      if (Auth.emailTaken(email)) { msg.className = "form-msg err"; msg.textContent = "Já existe uma conta com este e-mail."; return; }
      const vcode = String(Math.floor(100000 + Math.random() * 900000));
      pendingReg = { name, email, password: pass, role, code: vcode };
      showVerify(doSendVerification(email, vcode));
    });
  }

  function showVerify(res) {
    const body = document.getElementById("authBody");
    body.innerHTML = verifyFormHTML(res, pendingReg.email);
    document.getElementById("goRegister").addEventListener("click", (e) => { e.preventDefault(); showRegister(); });
    document.getElementById("verifyForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const msg = document.getElementById("vMsg");
      if (document.getElementById("vCode").value.trim() !== pendingReg.code) {
        msg.className = "form-msg err"; msg.textContent = "Código incorreto. Confira o seu e-mail."; return;
      }
      Auth.createUser({ name: pendingReg.name, email: pendingReg.email, password: pendingReg.password, role: pendingReg.role });
      Auth.login(pendingReg.email, pendingReg.password);
      msg.className = "form-msg ok";
      msg.textContent = `Conta de ${pendingReg.role} criada! Entrando...`;
      pendingReg = null;
      setTimeout(() => location.reload(), 800);
    });
  }

  function refreshModalBody() {
    const user = Auth.current();
    if (user) showAccount(user); else showLogin();
  }

  function openAuthModal() {
    buildModal();
    refreshModalBody();
    document.getElementById("authModal").classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeAuthModal() {
    const m = document.getElementById("authModal");
    if (m) m.classList.remove("open");
    document.body.style.overflow = "";
  }

  // expõe para outras páginas (ex.: botão "entrar" dentro do curso)
  window.EvoluaSite = { openAuthModal, closeAuthModal };

  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();
  });
})();
