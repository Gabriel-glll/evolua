/* ===========================================================
   EVOLUA — senha de presença (modalidade TURMA)
   Protótipo: a senha de cada aula é determinística, para que
   o leitor e a página de chamada cheguem ao mesmo valor.
   Na versão real (Supabase), a senha será gerada/guardada no
   servidor e enviada por e-mail ao aluno presente na chamada.
   =========================================================== */
/* Senha única provisória para TODAS as aulas/testes.
   Troque aqui quando quiser senhas individuais por aula. */
const SENHA_PADRAO = "teste";

function lessonPass(courseId, lesson) {
  return SENHA_PADRAO;
}

/* senha para iniciar e encerrar o TESTE (prova) */
function testPass(courseId, lesson) {
  return SENHA_PADRAO;
}
