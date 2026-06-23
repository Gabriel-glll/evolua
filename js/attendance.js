/* ===========================================================
   EVOLUA — senha de presença (modalidade TURMA)
   Protótipo: a senha de cada aula é determinística, para que
   o leitor e a página de chamada cheguem ao mesmo valor.
   Na versão real (Supabase), a senha será gerada/guardada no
   servidor e enviada por e-mail ao aluno presente na chamada.
   =========================================================== */
function lessonPass(courseId, lesson) {
  const pref = courseId === "mea" ? "MEA" : "JET";
  const wk = String(lesson.week).padStart(2, "0");
  const tail = lesson.id.split("-").pop().toUpperCase();
  return `${pref}-${wk}-${tail}`;
}

/* senha para iniciar e encerrar o TESTE (prova) */
function testPass(courseId, lesson) {
  return "PROVA-" + lessonPass(courseId, lesson);
}
