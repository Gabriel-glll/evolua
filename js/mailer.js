/* ===========================================================
   EVOLUA — envio do resultado do teste por e-mail
   Destinatário fixo: o diretor da escola.
   - Se as chaves do EmailJS estiverem preenchidas, envia
     automaticamente (client-side, sem servidor).
   - Caso contrário, usa um fallback por mailto: (abre o
     e-mail já preenchido para envio manual).
   Para ativar o envio automático: crie uma conta grátis em
   emailjs.com e preencha as 3 chaves abaixo (e descomente o
   <script> do EmailJS em aula.html).
   =========================================================== */
const MAILER = {
  to: "escolaevoluadiretor@gmail.com",
  emailjs: { publicKey: "", serviceId: "", templateId: "" },
};

function buildResultText(p) {
  const kind = p.kind || "Teste";
  let t = `Resultado de ${kind} — EVOLUA\n\n`;
  t += `Aluno(a): ${p.student}\n`;
  t += `Curso: ${p.courseName}\n`;
  t += `Aula: ${p.lessonTitle}\n`;
  t += `Data: ${new Date().toLocaleString("pt-BR")}\n`;
  if (p.score != null) t += `Pontuação: ${p.score} de ${p.total}\n`;
  t += `\nRespostas:\n`;
  p.lines.forEach((l, i) => {
    t += `\n${i + 1}. ${l.q}\n   Resposta do aluno: ${l.chosen}\n`;
    if (!l.open) t += `   Correta: ${l.correct}\n   ${l.ok ? "✓ Acertou" : "✗ Errou"}\n`;
  });
  return t;
}

/* retorna { method:"emailjs"|"mailto", url? } */
function sendTestResult(p) {
  const body = buildResultText(p);
  const subject = `Resultado de ${p.kind || "Teste"} — ${p.student} — ${p.courseName}${p.score != null ? ` (${p.score}/${p.total})` : ""}`;

  const cfg = MAILER.emailjs;
  if (cfg.publicKey && cfg.serviceId && cfg.templateId && window.emailjs) {
    try {
      window.emailjs.send(cfg.serviceId, cfg.templateId,
        { to_email: MAILER.to, subject, message: body, student: p.student, score: `${p.score}/${p.total}` },
        { publicKey: cfg.publicKey });
      return { method: "emailjs" };
    } catch (e) { /* cai no fallback */ }
  }
  const url = `mailto:${MAILER.to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return { method: "mailto", url };
}

/* Envia o código de verificação para o e-mail do usuário (cadastro).
   retorna { method:"emailjs" } ou { method:"demo", code } (sem EmailJS). */
function sendVerification(email, code) {
  const cfg = MAILER.emailjs;
  if (cfg.publicKey && cfg.serviceId && cfg.templateId && window.emailjs) {
    try {
      window.emailjs.send(cfg.serviceId, cfg.templateId,
        { to_email: email, subject: "Seu código de verificação — EVOLUA",
          message: `Bem-vindo(a) à EVOLUA! O seu código de verificação é: ${code}` },
        { publicKey: cfg.publicKey });
      return { method: "emailjs" };
    } catch (e) { /* cai no modo demo */ }
  }
  return { method: "demo", code };
}
