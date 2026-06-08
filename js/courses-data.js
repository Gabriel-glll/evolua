/* ===========================================================
   EVOLUA — base de dados dos cursos
   Cada aula tem "week": em qual semana ela é liberada na
   modalidade TURMA (aulas semanais). Na modalidade
   INDEPENDENTE todo o conteúdo já vem liberado.
   =========================================================== */

const COURSES = {
  mea: {
    id: "mea",
    tag: "Curso de Inglês",
    name: "MEA",
    full: "MEA — Mastering English Abroad",
    summary:
      "Um caminho completo para você sair do zero ao inglês fluente com confiança. " +
      "Mais que gramática: você aprende a pensar, conversar e viver em inglês — " +
      "para o trabalho, para a vida e para servir com excelência onde quer que vá.",
    color: "#d9b876",
    meta: { duracao: "9 meses", aulas: "12 aulas", nivel: "Iniciante → Avançado" },
    forWho:
      "Para quem quer destravar a conversação, crescer profissionalmente e se sentir " +
      "seguro em qualquer ambiente de língua inglesa.",
    modules: [
      {
        title: "Módulo 1 — Fundamentos",
        lessons: [
          { id: "m1", title: "Boas-vindas e como estudar inglês de verdade", week: 1, min: 18 },
          { id: "m2", title: "Pronúncia: os sons que mudam tudo", week: 1, min: 32 },
          { id: "m3", title: "Vocabulário essencial do dia a dia", week: 2, min: 28 },
          { id: "m4", title: "Presente simples e o verbo to be", week: 3, min: 35 },
        ],
      },
      {
        title: "Módulo 2 — Conversação",
        lessons: [
          { id: "m5", title: "Se apresentando com naturalidade", week: 4, min: 30 },
          { id: "m6", title: "Fazendo perguntas e mantendo o diálogo", week: 5, min: 33 },
          { id: "m7", title: "Falando sobre rotina e planos", week: 6, min: 29 },
        ],
      },
      {
        title: "Módulo 3 — Inglês para o trabalho e a vida",
        lessons: [
          { id: "m8",  title: "Inglês profissional: reuniões e e-mails", week: 7, min: 38 },
          { id: "m9",  title: "Entrevistas e networking", week: 8, min: 34 },
          { id: "m10", title: "Compreensão de áudio e filmes", week: 9, min: 31 },
        ],
      },
      {
        title: "Módulo 4 — Fluência",
        lessons: [
          { id: "m11", title: "Pensando em inglês: o salto final", week: 10, min: 40 },
          { id: "m12", title: "Projeto final e certificação", week: 11, min: 25 },
        ],
      },
    ],
  },

  jetro: {
    id: "jetro",
    tag: "Educação Financeira",
    name: "JETRO",
    full: "JETRO — Sabedoria e Liberdade Financeira",
    summary:
      "Inspirado em Jetro, o conselheiro sábio que ensinou Moisés a administrar com ordem, " +
      "este curso une princípios bíblicos e prática moderna para você sair das dívidas, " +
      "organizar a casa, multiplicar recursos e construir um legado para sua família.",
    color: "#6fae8f",
    meta: { duracao: "8 meses", aulas: "11 aulas", nivel: "Todos os níveis" },
    forWho:
      "Para famílias e profissionais que querem paz financeira, bons hábitos e prosperidade " +
      "com propósito — administrando como bons mordomos daquilo que receberam.",
    modules: [
      {
        title: "Módulo 1 — Mentalidade e princípios",
        lessons: [
          { id: "j1", title: "O dinheiro e o coração: fundamentos", week: 1, min: 22 },
          { id: "j2", title: "Mordomia: administrar bem o que é seu", week: 1, min: 27 },
          { id: "j3", title: "Diagnóstico: onde você está hoje", week: 2, min: 30 },
        ],
      },
      {
        title: "Módulo 2 — Organização e orçamento",
        lessons: [
          { id: "j4", title: "Montando seu orçamento familiar", week: 3, min: 35 },
          { id: "j5", title: "Cortando o que não serve", week: 4, min: 28 },
          { id: "j6", title: "Reserva de emergência", week: 5, min: 26 },
        ],
      },
      {
        title: "Módulo 3 — Saindo das dívidas",
        lessons: [
          { id: "j7", title: "Estratégia para quitar dívidas", week: 6, min: 33 },
          { id: "j8", title: "Negociando com sabedoria", week: 7, min: 24 },
        ],
      },
      {
        title: "Módulo 4 — Multiplicação e legado",
        lessons: [
          { id: "j9",  title: "Primeiros passos nos investimentos", week: 8, min: 36 },
          { id: "j10", title: "Renda extra e empreendedorismo", week: 9, min: 32 },
          { id: "j11", title: "Construindo um legado para a família", week: 10, min: 29 },
        ],
      },
    ],
  },
};

// total de aulas por curso (útil para barra de progresso)
Object.values(COURSES).forEach((c) => {
  c.totalLessons = c.modules.reduce((s, m) => s + m.lessons.length, 0);
});
