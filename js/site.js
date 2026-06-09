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
          </nav>
          <div class="nav-actions">
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

  function loginFormHTML() {
    return `
      <img class="modal-logo" src="assets/logo.svg" alt="EVOLUA">
      <h3>Bem-vindo de volta</h3>
      <p class="modal-sub">Entre para acessar o conteúdo dos seus cursos.</p>
      <form id="loginForm">
        <div class="field">
          <label for="lu">Usuário</label>
          <input id="lu" type="text" autocomplete="username" placeholder="seu usuário" required>
        </div>
        <div class="field">
          <label for="lp">Senha</label>
          <input id="lp" type="password" autocomplete="current-password" placeholder="••••••••" required>
        </div>
        <button class="btn btn-gold btn-block" type="submit">Entrar</button>
        <div class="form-msg" id="loginMsg"></div>
      </form>
      <p class="modal-hint">Ainda não tem acesso? Fale conosco para se matricular em um curso.</p>`;
  }

  function accountHTML(user) {
    return `
      <img class="modal-logo" src="assets/logo.svg" alt="EVOLUA">
      <h3>Minha conta</h3>
      <p class="modal-sub">Você está conectado como <b style="color:var(--gold)">${user.name}</b>
      ${user.role === "admin" ? "(acesso total)" : ""}.</p>
      <a class="btn btn-gold btn-block" href="cursos.html" style="margin-bottom:12px">Ir para meus cursos</a>
      <button class="btn btn-ghost btn-block" id="logoutBtn">Sair da conta</button>`;
  }

  function refreshModalBody() {
    const user = Auth.current();
    const body = document.getElementById("authBody");
    if (user) {
      body.innerHTML = accountHTML(user);
      document.getElementById("logoutBtn").addEventListener("click", () => {
        Auth.logout();
        closeAuthModal();
        location.reload();
      });
    } else {
      body.innerHTML = loginFormHTML();
      document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();
        const msg = document.getElementById("loginMsg");
        const res = Auth.login(
          document.getElementById("lu").value,
          document.getElementById("lp").value
        );
        if (res.ok) {
          msg.className = "form-msg ok";
          msg.textContent = "Acesso liberado! Carregando...";
          setTimeout(() => location.reload(), 500);
        } else {
          msg.className = "form-msg err";
          msg.textContent = res.error;
        }
      });
    }
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
