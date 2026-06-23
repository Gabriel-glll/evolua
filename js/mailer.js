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
  let t = `Resultado de teste — EVOLUA\n\n`;
  t += `Aluno(a): ${p.student}\n`;
  t += `Curso: ${p.courseName}\n`;
  t += `Aula: ${p.lessonTitle}\n`;
  t += `Data: ${new Date().toLocaleString("pt-BR")}\n`;
  t += `Pontuação: ${p.score} de ${p.total}\n\n`;
  t += `Respostas:\n`;
  p.lines.forEach((l, i) => {
    t += `\n${i + 1}. ${l.q}\n   Resposta do aluno: ${l.chosen}\n   Correta: ${l.correct}\n   ${l.ok ? "✓ Acertou" : "✗ Errou"}\n`;
  });
  return t;
}

/* retorna { method:"emailjs"|"mailto", url? } */
function sendTestResult(p) {
  const body = buildResultText(p);
  const subject = `Resultado de teste — ${p.student} — ${p.courseName} (${p.score}/${p.total})`;

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
