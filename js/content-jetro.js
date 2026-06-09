/* ===========================================================
   EVOLUA — Conteúdo do curso JETRO
   Indexado pelo id da aula (ver js/courses-data.js).
   Cada aula: verse (versículo base), blocks (conteúdo),
   bibliography, tasks (tarefas) e test (teste).
   Tarefas e Teste são exibidos numa aba separada do conteúdo.
   =========================================================== */

const JETRO_CONTENT = {
  /* ===================== TEMA 1 — INTRODUÇÃO ===================== */
  "jetro-1a": {
    verse: {
      ref: "Provérbios 4:7",
      text: "O princípio da sabedoria é este: adquire a sabedoria; sim, com tudo o que possuis, adquire o entendimento.",
    },
    blocks: [
      { type: "text", eyebrow: "Bem-vindo(a)", title: "Você chegou à JETRO",
        html: "Que bom ter você aqui. A <b>JETRO</b> é o curso de educação financeira da EVOLUA — um caminho prático para você aprender a lidar com dinheiro, números e negócios com <b>sabedoria</b>, sem fórmulas mágicas e sem complicação. Aqui a gente acredita que dinheiro é ferramenta: bem administrado, serve à sua vida, à sua família e ao seu propósito." },

      { type: "callout", variant: "verse", icon: "📖", title: "De onde vem o nome JETRO",
        text: "Jetro era sacerdote e líder em Midiã, sogro de Moisés. Em Êxodo 18, ao ver Moisés tentando resolver sozinho todos os problemas do povo, ele deu um dos primeiros conselhos de gestão registrados na história: escolher líderes para cuidar de grupos menores e organizar o trabalho. Jetro virou símbolo de sabedoria prática, organização, delegação e liderança — exatamente o espírito deste curso." },

      { type: "text", title: "Como este curso funciona",
        html: "A JETRO é dividida em <b>9 temas</b>, do mais simples ao mais avançado. Cada tema tem aulas curtas, com um <b>versículo base</b>, conteúdo direto ao ponto, e — numa aba separada — <b>tarefas e um teste</b> para fixar. Você avança no seu ritmo (ou junto com a turma) e marca cada aula como concluída." },

      { type: "steps", title: "O caminho que vamos percorrer", items: [
        { h: "1. Introdução", p: "Por que conhecimento muda tudo e como aproveitar o curso." },
        { h: "2. Lógica", p: "Desenvolver o raciocínio que está por trás de toda boa decisão." },
        { h: "3. Matemática", p: "A matemática do dia a dia, sem medo: %, custo, lucro, margem." },
        { h: "4. Financeiro", p: "Administrar bem o dinheiro da sua família." },
        { h: "5. Planejamento", p: "Os primeiros passos para tirar um negócio do papel." },
        { h: "6. Início", p: "Como uma empresa funciona no Brasil e os obstáculos do começo." },
        { h: "7. Seu negócio", p: "Contratação, impostos, marketing e a realidade de empreender." },
        { h: "8. Mentalidade", p: "Uma mente voltada a crescer, não apenas a faturar." },
        { h: "9. Realidade", p: "E se der errado? Você pode recomeçar." },
      ]},

      { type: "callout", variant: "tip", icon: "🌱", title: "Um lembrete para a jornada",
        text: "Você não precisa entender tudo de uma vez. Conhecimento se constrói em camadas. Vá com calma, faça as tarefas e aplique uma coisa de cada vez." },

      { type: "bigquote", text: "Administrar bem o pouco é o primeiro passo para cuidar bem do muito." },

      { type: "write", title: "Antes de começar, reflita",
        hint: "Suas respostas ficam salvas aqui no seu navegador.",
        prompts: [
          { q: "Por que você decidiu estudar finanças agora?", ph: "Escreva com sinceridade..." },
          { q: "Onde você quer estar daqui a 1 ano com o seu dinheiro?", ph: "Ex: sem dívidas, com reserva, com um negócio..." },
        ]},
    ],
    bibliography: [
      "Bíblia Sagrada — Êxodo 18; Provérbios 4.",
      "EKER, T. Harv. Os Segredos da Mente Milionária.",
      "Material e princípios próprios da Escola EVOLUA.",
    ],
    tasks: [
      "Assistir/ler a aula completa com calma.",
      "Responder às duas perguntas de reflexão.",
      "Definir um objetivo financeiro para os próximos 12 meses.",
    ],
    test: [
      { q: "Qual figura bíblica inspira o nome do curso e por quê?",
        options: ["Jetro, por sua sabedoria em gestão e delegação (Êxodo 18)", "Salomão, por ser o mais rico", "Moisés, por liderar o povo"],
        answer: 0, explain: "Jetro aconselhou Moisés a organizar e delegar — símbolo de gestão sábia." },
      { q: "Como a JETRO enxerga o dinheiro?",
        options: ["Como um fim em si mesmo", "Como uma ferramenta a ser bem administrada", "Como algo a ser evitado"],
        answer: 1, explain: "Dinheiro é ferramenta: bem administrado, serve à vida, à família e ao propósito." },
    ],
  },

  "jetro-1b": {
    verse: {
      ref: "Oséias 4:6",
      text: "O meu povo está sendo destruído porque lhe falta o conhecimento.",
    },
    blocks: [
      { type: "text", eyebrow: "Introdução", title: "Não é falta de capacidade. É falta de conhecimento.",
        html: "Muita gente trabalha duro a vida inteira e mesmo assim vive apertada. O problema, na maioria das vezes, não é falta de esforço, inteligência ou vontade — é <b>falta de conhecimento certo</b> sobre como o dinheiro funciona. E a boa notícia é simples: conhecimento se aprende." },

      { type: "callout", variant: "important", icon: "💡", title: "A virada de chave",
        text: "Quem entende as regras do jogo joga melhor. Aprender finanças não te deixa ganancioso — te deixa livre para decidir com clareza, em vez de viver no escuro." },

      { type: "text", title: "O que o conhecimento financeiro produz",
        html: "Quando você aprende e aplica bons princípios, alguns frutos aparecem naturalmente:" },

      { type: "steps", title: "Frutos do conhecimento aplicado", items: [
        { h: "Decisões melhores", p: "Você passa a comparar, calcular e escolher com critério — não no impulso." },
        { h: "Menos ansiedade", p: "Saber para onde vai o seu dinheiro tira um peso enorme das costas." },
        { h: "Família mais forte", p: "Dinheiro organizado gera menos brigas e mais paz em casa." },
        { h: "Novas portas", p: "Com base sólida, surgem oportunidades de poupar, investir e empreender." },
      ]},

      { type: "callout", variant: "warn", icon: "⚠️", title: "Cuidado com os atalhos",
        text: "Promessas de enriquecer rápido e fácil quase sempre escondem armadilhas. A JETRO é o caminho contrário: o do conhecimento sólido, construído passo a passo." },

      { type: "bigquote", text: "O sábio aprende as regras; o tolo aprende só na dor. Você está escolhendo o caminho do sábio." },

      { type: "write", title: "Reflexão",
        hint: "Pense com calma antes de escrever.",
        prompts: [
          { q: "Qual decisão financeira você já tomou no impulso e se arrependeu?", ph: "O que faltou de conhecimento ali?" },
        ]},
    ],
    bibliography: [
      "Bíblia Sagrada — Oséias 4:6; Provérbios 24.",
      "KIYOSAKI, Robert. Pai Rico, Pai Pobre.",
      "CERBASI, Gustavo. Casais Inteligentes Enriquecem Juntos.",
    ],
    tasks: [
      "Escrever uma decisão financeira que você gostaria de aprender a fazer melhor.",
      "Compartilhar com alguém de confiança o seu objetivo de aprender finanças.",
    ],
    test: [
      { q: "Segundo a aula, qual costuma ser a verdadeira causa das dificuldades financeiras?",
        options: ["Falta de capacidade ou inteligência", "Falta de conhecimento certo sobre o dinheiro", "Falta de sorte"],
        answer: 1, explain: "Na maioria das vezes falta conhecimento — e isso se aprende." },
      { q: "O que o conhecimento financeiro NÃO promete?",
        options: ["Decisões melhores", "Enriquecer rápido e fácil", "Mais clareza e paz"],
        answer: 1, explain: "Atalhos de enriquecimento rápido costumam ser armadilhas." },
    ],
  },

  /* ===================== TEMA 2 — LÓGICA ===================== */
  "jetro-2a": {
    verse: {
      ref: "Provérbios 14:15",
      text: "O simples dá crédito a toda palavra, mas o prudente atenta para os seus passos.",
    },
    blocks: [
      { type: "text", eyebrow: "Lógica", title: "Por que começar pela lógica?",
        html: "Antes de falar de dinheiro, precisamos afiar a ferramenta que toma <b>todas</b> as decisões: o seu raciocínio. Lógica é a arte de pensar de forma ordenada — ligar causa e efeito, separar o que é fato do que é achismo, e prever consequências antes de agir. Quem pensa bem, decide bem. E quem decide bem, lida melhor com o dinheiro." },

      { type: "callout", variant: "tip", icon: "🧠", title: "Lógica no dia a dia",
        text: "“Se eu gastar tudo hoje, o que acontece no fim do mês?” — isso é lógica. É a pergunta simples de causa e consequência que evita a maior parte dos problemas financeiros." },

      { type: "text", title: "Os três pilares do raciocínio",
        html: "Toda decisão lógica passa por três movimentos. <b>Toque em cada um</b> para abrir:" },

      { type: "acc", items: [
        { num: "01", head: "Observar os fatos",
          body: "Antes de decidir, junte as informações reais. Quanto custa? Quanto eu tenho? Qual o prazo? Decisão boa começa com fato, não com suposição." },
        { num: "02", head: "Relacionar causa e efeito",
          body: "Pergunte sempre: <b>“se eu fizer isso, o que provavelmente acontece?”</b> Toda escolha tem uma consequência — antecipá-la é metade do caminho." },
        { num: "03", head: "Concluir e agir",
          body: "Com fatos e consequências na mão, escolha o caminho mais coerente com o seu objetivo. Depois, observe o resultado e aprenda com ele." },
      ]},

      { type: "callout", variant: "warn", icon: "🌱", title: "Inimigo nº 1 da lógica: a pressa",
        text: "A maioria das decisões ruins é tomada no impulso, sem pensar nas consequências. Criar o hábito de “parar 1 minuto e pensar” já muda os seus resultados." },

      { type: "bigquote", text: "Pensar antes de agir é barato. Agir sem pensar costuma sair caro." },
    ],
    bibliography: [
      "Bíblia Sagrada — Provérbios 14.",
      "DOBELLI, Rolf. A Arte de Pensar Claramente.",
      "KAHNEMAN, Daniel. Rápido e Devagar: Duas Formas de Pensar.",
    ],
    tasks: [
      "Durante um dia, antes de cada compra, pergunte: “qual a consequência disso?”.",
      "Anotar uma decisão recente e descrever o efeito que ela gerou.",
    ],
    test: [
      { q: "Qual é o primeiro passo de uma decisão lógica?",
        options: ["Agir rápido", "Observar os fatos reais", "Perguntar a opinião de todos"],
        answer: 1, explain: "Decisão boa começa com fatos, não com suposição." },
      { q: "Qual é o maior inimigo da lógica citado na aula?",
        options: ["A calma", "A pressa / o impulso", "A informação"],
        answer: 1, explain: "A pressa leva a decidir sem pensar nas consequências." },
    ],
  },

  "jetro-2b": {
    verse: {
      ref: "Provérbios 14:8",
      text: "A sabedoria do prudente é entender o seu caminho.",
    },
    blocks: [
      { type: "text", eyebrow: "Lógica", title: "Hora de treinar",
        html: "Raciocínio lógico é como músculo: cresce com exercício. Vamos praticar com situações simples. Tente resolver na sua cabeça <b>antes</b> de ver a resposta — o esforço é o que fortalece." },

      { type: "steps", title: "Exercício 1 · Sequências (encontrar o padrão)", items: [
        { h: "2, 4, 6, 8, ...", p: "Qual o próximo? O padrão é “+2”. Resposta: 10. Aqui você treina enxergar regras escondidas." },
        { h: "100, 90, 80, ...", p: "Padrão “−10”. Próximo: 70. Reconhecer padrões ajuda a prever gastos e receitas." },
        { h: "1, 2, 4, 8, ...", p: "Cada número dobra (×2). Próximo: 16. É assim que juros e investimentos crescem." },
      ]},

      { type: "callout", variant: "tip", icon: "🔎", title: "Exercício 2 · Causa e efeito",
        text: "“Toda vez que recebo, gasto tudo nos primeiros dias.” Qual é o efeito previsível no fim do mês? Falta de dinheiro. A lógica aqui revela: o problema não é o salário, é a ordem dos gastos." },

      { type: "text", title: "Exercício 3 · Dedução",
        html: "Leia e conclua: <i>“Todo mês em que eu anoto meus gastos, eu sobra dinheiro. Este mês eu não anotei.”</i> O que é provável ter acontecido? <b>Provavelmente não sobrou.</b> Dedução é tirar uma conclusão lógica a partir de fatos conhecidos." },

      { type: "quiz", q: "Na sequência 3, 6, 12, 24, ... qual é o próximo número?",
        options: ["36", "48", "30"], answer: 1,
        explain: "Cada número dobra (×2): 24 × 2 = 48. Esse é o mesmo padrão de crescimento de juros." },

      { type: "callout", variant: "important", icon: "💪", title: "O segredo do treino",
        text: "Não é sobre acertar de primeira. É sobre criar o hábito de parar, observar o padrão e raciocinar. Quanto mais você treina, mais natural fica." },
    ],
    bibliography: [
      "Bíblia Sagrada — Provérbios 2 e 14.",
      "DOBELLI, Rolf. A Arte de Pensar Claramente.",
      "Exercícios de raciocínio lógico — material próprio EVOLUA.",
    ],
    tasks: [
      "Criar 1 sequência numérica própria e descobrir o padrão.",
      "Identificar 1 situação de “causa e efeito” na sua semana financeira.",
    ],
    test: [
      { q: "Na sequência 5, 10, 20, 40, ... qual é o próximo número?",
        options: ["60", "80", "50"], answer: 1, explain: "Dobra a cada passo: 40 × 2 = 80." },
      { q: "O que é deduzir?",
        options: ["Adivinhar sem base", "Tirar uma conclusão lógica a partir de fatos conhecidos", "Repetir o que ouviu"],
        answer: 1, explain: "Dedução parte de fatos para chegar a uma conclusão coerente." },
    ],
  },

  "jetro-2c": {
    verse: {
      ref: "Provérbios 21:5",
      text: "Os planos do diligente conduzem à abundância, mas todo apressado caminha para a pobreza.",
    },
    blocks: [
      { type: "text", eyebrow: "Lógica", title: "Transformando lógica em boas decisões",
        html: "Agora juntamos tudo: como usar o raciocínio para <b>decidir melhor</b>, principalmente quando envolve dinheiro. A maioria das decisões ruins não vem de burrice — vem de decidir no automático, sem método." },

      { type: "steps", title: "Um método simples para decidir", items: [
        { h: "1. Defina o objetivo", p: "O que você realmente quer com essa decisão? Sem alvo, qualquer caminho parece bom." },
        { h: "2. Liste as opções", p: "Quase sempre há mais de dois caminhos. Escreva todos antes de escolher." },
        { h: "3. Pese prós e contras", p: "Para cada opção, o que você ganha e o que você perde? Inclua o custo de tempo e de paz." },
        { h: "4. Pense no custo de oportunidade", p: "Escolher uma coisa é abrir mão de outra. O que você deixa de fazer ao escolher isso?" },
        { h: "5. Decida e revise", p: "Escolha a opção mais coerente com o objetivo — e depois observe o resultado para aprender." },
      ]},

      { type: "callout", variant: "tip", icon: "⏳", title: "A regra das 24 horas",
        text: "Para compras por impulso, espere 24 horas antes de decidir. Muitas vontades passam — e o que sobra é a necessidade real." },

      { type: "reframe",
        before: { lab: "Decisão no impulso", ph: "“Vi, gostei, comprei.”" },
        after: { lab: "Decisão com lógica", ph: "“Qual meu objetivo? Quais as opções? Vale o custo?”" } },

      { type: "bigquote", text: "Toda escolha é uma troca. Decidir bem é saber o que você está trocando." },

      { type: "write", title: "Pratique agora",
        hint: "Escolha uma decisão que você precisa tomar em breve.",
        prompts: [
          { q: "Qual o objetivo dessa decisão?", ph: "O que eu quero de verdade aqui?" },
          { q: "Quais as opções e o custo de oportunidade de cada uma?", ph: "Se eu escolher A, abro mão de..." },
        ]},
    ],
    bibliography: [
      "Bíblia Sagrada — Provérbios 21; Tiago 1:5.",
      "KAHNEMAN, Daniel. Rápido e Devagar.",
      "MCKEOWN, Greg. Essencialismo.",
    ],
    tasks: [
      "Aplicar o método das 5 etapas em uma decisão real desta semana.",
      "Testar a regra das 24 horas em uma vontade de compra.",
    ],
    test: [
      { q: "O que é custo de oportunidade?",
        options: ["O preço do produto", "Aquilo que você abre mão ao escolher outra coisa", "Um imposto"],
        answer: 1, explain: "Toda escolha implica renunciar a outra — esse é o custo de oportunidade." },
      { q: "Para que serve a regra das 24 horas?",
        options: ["Adiar contas", "Evitar compras por impulso", "Pesquisar preço"],
        answer: 1, explain: "Esperar 24h separa a vontade passageira da necessidade real." },
    ],
  },
};

/* ---- Aulas com versículo definido e conteúdo completo a caminho ----
   Mantêm a grade rica e já trazem o versículo base de cada aula. */
const JETRO_SOON = {
  "jetro-3a": { ref: "Lucas 14:28", text: "Pois qual de vós, querendo edificar uma torre, não se assenta primeiro a fazer as contas dos gastos?", o: "As 4 operações aplicadas ao dia a dia, com foco em subtração e multiplicação." },
  "jetro-3b": { ref: "Provérbios 16:11", text: "O peso e a balança justos são do Senhor.", o: "Porcentagem na prática: descontos, acréscimos e juros." },
  "jetro-3c": { ref: "Provérbios 24:3-4", text: "Com sabedoria se edifica a casa, e com entendimento ela se firma.", o: "Custo, média e formação de preço de venda." },
  "jetro-3d": { ref: "Provérbios 13:11", text: "A riqueza ganha com precipitação diminuirá, mas quem a ajunta pouco a pouco a aumentará.", o: "Lucro, markup e margem — sem confundir os três." },
  "jetro-4a": { ref: "Provérbios 21:20", text: "Há tesouro desejável e azeite na casa do sábio, mas o homem insensato os devora.", o: "Montando o orçamento da família." },
  "jetro-4b": { ref: "Provérbios 22:7", text: "O rico domina sobre o pobre, e o que toma emprestado é servo do que empresta.", o: "Controle de gastos e estratégia para sair das dívidas." },
  "jetro-4c": { ref: "Provérbios 6:6-8", text: "Vai ter com a formiga... ela no verão prepara o seu pão.", o: "Reserva de emergência e definição de prioridades." },
  "jetro-5a": { ref: "Provérbios 16:3", text: "Confia ao Senhor as tuas obras, e teus planos serão estabelecidos.", o: "Encontrar seu nicho e validar ideias." },
  "jetro-5b": { ref: "Mateus 7:24", text: "Todo aquele que ouve estas minhas palavras e as pratica é como um homem prudente que edificou a sua casa sobre a rocha.", o: "Definir valores, proposta e identidade do negócio." },
  "jetro-5c": { ref: "Gálatas 6:9", text: "E não nos cansemos de fazer o bem, porque a seu tempo ceifaremos, se não desfalecermos.", o: "As pedras no caminho e como atravessá-las." },
  "jetro-6a": { ref: "Provérbios 24:27", text: "Prepara os teus trabalhos exteriores... e depois edifica a tua casa.", o: "Como uma empresa funciona no Brasil (CNPJ, formalização)." },
  "jetro-6b": { ref: "Mateus 22:21", text: "Dai, pois, a César o que é de César, e a Deus o que é de Deus.", o: "Tributação básica: entender impostos e percentuais." },
  "jetro-6c": { ref: "Romanos 5:3-4", text: "A tribulação produz a perseverança; e a perseverança, a experiência.", o: "Lidando com rejeições e os obstáculos do início." },
  "jetro-7a": { ref: "Lucas 10:7", text: "Digno é o trabalhador do seu salário.", o: "Contratação: diferenças entre CLT e PJ." },
  "jetro-7b": { ref: "Provérbios 27:23", text: "Procura conhecer o estado das tuas ovelhas; põe o teu coração sobre os teus rebanhos.", o: "Regimes tributários: Simples, Lucro Real e Lucro Presumido." },
  "jetro-7c": { ref: "Provérbios 22:29", text: "Vês um homem diligente na sua obra? Perante reis será posto.", o: "Marketing, tráfego pago e posicionamento empresarial." },
  "jetro-7d": { ref: "Eclesiastes 11:6", text: "Pela manhã semeia a tua semente e, à tarde, não retires a tua mão.", o: "A realidade de ter uma empresa no Brasil." },
  "jetro-8a": { ref: "Mateus 6:33", text: "Buscai primeiro o reino de Deus e a sua justiça, e todas estas coisas vos serão acrescentadas.", o: "Mente de crescimento x mente de apenas faturar." },
  "jetro-8b": { ref: "Provérbios 4:23", text: "Sobre tudo o que se deve guardar, guarda o teu coração, porque dele procedem as fontes da vida.", o: "Mente centrada, foco e disciplina." },
  "jetro-9a": { ref: "Provérbios 24:16", text: "Porque sete vezes cairá o justo e se levantará; mas os ímpios tropeçarão no mal.", o: "Quando dá errado: lidar com o fechamento e o fracasso." },
  "jetro-9b": { ref: "Isaías 43:19", text: "Eis que faço uma coisa nova; agora sairá à luz.", o: "Recomeçar com sabedoria — o fim que vira começo." },
};

Object.entries(JETRO_SOON).forEach(([id, v]) => {
  JETRO_CONTENT[id] = {
    verse: { ref: v.ref, text: v.text },
    blocks: [
      { type: "callout", variant: "tip", icon: "🛠️", title: "Conteúdo completo a caminho",
        text: "Esta aula já tem o seu versículo base definido. O conteúdo detalhado, as tarefas e o teste estão sendo preparados com o mesmo cuidado das aulas anteriores." },
      { type: "text", title: "O que você vai aprender aqui", html: v.o },
    ],
    bibliography: ["Bíblia Sagrada.", "Material próprio da Escola EVOLUA (em preparação)."],
    tasks: [],
    test: [],
  };
});
