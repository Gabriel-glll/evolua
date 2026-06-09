/* ===========================================================
   EVOLUA — estrutura dos cursos (grade pública)
   O conteúdo de cada aula (versículo, blocos, bibliografia,
   tarefas e teste) fica em js/content-mea.js e
   js/content-jetro.js, indexado pelo id da aula.
   "week" = semana em que a aula libera na modalidade TURMA.
   =========================================================== */

const COURSES = {
  /* ============================ MEA ============================ */
  mea: {
    id: "mea",
    tag: "Curso de Inglês",
    name: "MEA",
    full: "MEA — Mastering English Abroad",
    summary:
      "Um caminho calmo do zero à fluência. Mais que gramática: você aprende a preparar a " +
      "mente, construir vocabulário vivo e se comunicar com confiança — no seu ritmo.",
    color: "#c0704d",
    meta: { duracao: "9 etapas", aulas: "9 aulas", nivel: "Iniciante → Avançado" },
    forWho:
      "Para quem quer destravar a conversação e crescer com leveza, um passo de cada vez.",
    modules: [
      {
        title: "Etapa 1 — Mentalidade",
        lessons: [
          { id: "mea-1", title: "Welcome to MEA — as 2 leis do aprendizado", week: 1, min: 25 },
        ],
      },
      {
        title: "Etapa 2 — Fundamentos",
        lessons: [
          { id: "mea-2", title: "Primeiras palavras e sons", week: 2, min: 28 },
          { id: "mea-3", title: "O verbo to be e o presente", week: 3, min: 32 },
        ],
      },
      {
        title: "Etapa 3 — Vocabulário vivo",
        lessons: [
          { id: "mea-4", title: "Vocabulário do dia a dia", week: 4, min: 26 },
          { id: "mea-5", title: "Frases que você vai usar", week: 5, min: 30 },
        ],
      },
      {
        title: "Etapa 4 — Prática & escuta",
        lessons: [
          { id: "mea-6", title: "Ouvir e repetir", week: 6, min: 27 },
          { id: "mea-7", title: "Ensinar para fixar", week: 7, min: 24 },
        ],
      },
      {
        title: "Etapa 5 — Fluência com calma",
        lessons: [
          { id: "mea-8", title: "Pensar em inglês", week: 8, min: 33 },
          { id: "mea-9", title: "Conversa com confiança", week: 9, min: 30 },
        ],
      },
    ],
  },

  /* =========================== JETRO =========================== */
  jetro: {
    id: "jetro",
    tag: "Educação Financeira",
    name: "JETRO",
    full: "JETRO — Sabedoria e Liberdade Financeira",
    summary:
      "Inspirado em Jetro, o conselheiro que ensinou Moisés a administrar com ordem e a delegar " +
      "(Êxodo 18), este curso une princípios cristãos e prática moderna: lógica, matemática do " +
      "dia a dia, finanças da família e os caminhos reais de quem quer empreender no Brasil.",
    color: "#7f9772",
    meta: { duracao: "9 temas", aulas: "26 aulas", nivel: "Todos os níveis" },
    forWho:
      "Para famílias e futuros empreendedores que querem decidir melhor, organizar o dinheiro e " +
      "crescer com sabedoria — administrando bem aquilo que receberam.",
    modules: [
      {
        title: "Tema 1 — Introdução",
        lessons: [
          { id: "jetro-1a", title: "Bem-vindo à JETRO", week: 1, min: 18 },
          { id: "jetro-1b", title: "Por que conhecimento muda o jogo", week: 1, min: 20 },
        ],
      },
      {
        title: "Tema 2 — Lógica",
        lessons: [
          { id: "jetro-2a", title: "O que é raciocínio lógico", week: 2, min: 22 },
          { id: "jetro-2b", title: "Exercícios de lógica", week: 2, min: 26 },
          { id: "jetro-2c", title: "Decidir com lógica", week: 3, min: 24 },
        ],
      },
      {
        title: "Tema 3 — Matemática",
        lessons: [
          { id: "jetro-3a", title: "As 4 operações sem medo", week: 4, min: 28 },
          { id: "jetro-3b", title: "Porcentagem na prática", week: 4, min: 24 },
          { id: "jetro-3c", title: "Custo, média e preço", week: 5, min: 26 },
          { id: "jetro-3d", title: "Lucro, markup e margem", week: 5, min: 28 },
        ],
      },
      {
        title: "Tema 4 — Financeiro",
        lessons: [
          { id: "jetro-4a", title: "Orçamento familiar", week: 6, min: 26 },
          { id: "jetro-4b", title: "Gastos e dívidas", week: 7, min: 24 },
          { id: "jetro-4c", title: "Reserva e prioridades", week: 8, min: 22 },
        ],
      },
      {
        title: "Tema 5 — Planejamento",
        lessons: [
          { id: "jetro-5a", title: "Nicho e ideias", week: 9, min: 24 },
          { id: "jetro-5b", title: "Valores e proposta", week: 10, min: 22 },
          { id: "jetro-5c", title: "Pedras no caminho", week: 11, min: 22 },
        ],
      },
      {
        title: "Tema 6 — Início",
        lessons: [
          { id: "jetro-6a", title: "Como uma empresa funciona no Brasil", week: 12, min: 28 },
          { id: "jetro-6b", title: "Tributação básica", week: 13, min: 26 },
          { id: "jetro-6c", title: "Lidando com rejeições", week: 14, min: 20 },
        ],
      },
      {
        title: "Tema 7 — Seu negócio",
        lessons: [
          { id: "jetro-7a", title: "CLT x PJ", week: 15, min: 24 },
          { id: "jetro-7b", title: "Regimes: Simples, Real e Presumido", week: 16, min: 28 },
          { id: "jetro-7c", title: "Marketing, tráfego e posicionamento", week: 17, min: 26 },
          { id: "jetro-7d", title: "A realidade de empreender", week: 18, min: 24 },
        ],
      },
      {
        title: "Tema 8 — Mentalidade",
        lessons: [
          { id: "jetro-8a", title: "Crescer x só faturar", week: 19, min: 22 },
          { id: "jetro-8b", title: "Mente centrada e disciplina", week: 20, min: 22 },
        ],
      },
      {
        title: "Tema 9 — Realidade",
        lessons: [
          { id: "jetro-9a", title: "Quando dá errado", week: 21, min: 22 },
          { id: "jetro-9b", title: "Recomeçar com sabedoria", week: 22, min: 24 },
        ],
      },
    ],
  },
};

Object.values(COURSES).forEach((c) => {
  c.totalLessons = c.modules.reduce((s, m) => s + m.lessons.length, 0);
});
