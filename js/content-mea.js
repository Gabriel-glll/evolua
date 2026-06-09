/* ===========================================================
   EVOLUA — Conteúdo do curso MEA (inglês)
   Aula 1 portada do site original do MEA, adaptada ao motor
   de leitura da EVOLUA. Demais aulas a caminho.
   =========================================================== */

const MEA_CONTENT = {
  "mea-1": {
    blocks: [
      { type: "text", eyebrow: "Introdução", title: "Comece imaginando",
        html: "Antes de qualquer palavra nova, vamos preparar o terreno. Aprender inglês começa na sua mente — na forma como você se imagina e no que você escolhe focar." },

      { type: "bi", en: "Imagine yourself already talking.", pt: "Imagine-se já falando." },

      { type: "write", title: "Imagine-se ali, se comunicando. Escreva isso.",
        hint: "Não existe resposta certa. Apenas imagine e registre — suas respostas ficam salvas no seu navegador.",
        prompts: [
          { q: "Where would you be?", sub: "Onde você estaria?", ph: "Ex: em uma viagem, no trabalho, num café..." },
          { q: "Who would you be talking to?", sub: "Com quem você estaria falando?", ph: "Ex: novos amigos, clientes, minha família..." },
          { q: "What would you be doing?", sub: "O que você estaria fazendo?", ph: "Ex: contando uma história, fechando um negócio..." },
        ]},

      { type: "text", eyebrow: "As 2 leis do aprendizado", title: "Dois princípios que mudam tudo",
        html: "No <b>MEA</b> trabalhamos com dois princípios fundamentais. Estas leis são a base para o seu desenvolvimento contínuo." },

      { type: "text", eyebrow: "Lei #1", title: "Responsabilidade pelo que você pensa e faz",
        html: "<i>Law number one: Responsibility in what you think and act.</i>" },

      { type: "bi", en: "We are often where we are because of our thoughts and actions.",
        pt: "Muitas vezes estamos onde estamos por causa dos nossos pensamentos e ações." },

      { type: "callout", variant: "warn", icon: "🌱", title: "Beware of seeds · Cuidado com as sementes",
        text: "Sementes de medo, sementes de dúvida. As “sementes” são as palavras e pensamentos — seus ou de outros. Mantenha as portas da sua mente fechadas para tudo que tenta te limitar." },

      { type: "text", title: "Esses pensamentos não são o nosso alvo",
        html: "Três “sementes” aparecem o tempo todo ao aprender algo novo. <b>Toque em cada cartão</b> para ressignificá-las:" },

      { type: "flip", cards: [
        { lab: "Pensamento limitante", ph: "“Too difficult”", tr: "Muito difícil",
          backLab: "Ressignificando", backPh: "Cria uma barreira antes de tentar.", backTr: "Dê o primeiro passo pequeno — a dificuldade diminui." },
        { lab: "Pensamento limitante", ph: "“Too complicated”", tr: "Muito complicado",
          backLab: "Ressignificando", backPh: "A complexidade só existe sem divisão.", backTr: "Quebre em passos menores e fica possível." },
        { lab: "Pensamento limitante", ph: "“I can't do it”", tr: "Eu não consigo",
          backLab: "O poder do “ainda”", backPh: "“Eu não consigo... ainda.”", backTr: "A palavra “ainda” transforma tudo." },
      ]},

      { type: "reframe",
        before: { lab: "Antes", ph: "“I can't do it / Isso não é pra mim.”" },
        after: { lab: "Depois", ph: "“This is challenging, but I can hit the target.”" } },

      { type: "bi", en: "Whatever you put in your mind and determine, you will hit the target.",
        pt: "Tudo aquilo que você coloca na sua mente e determina, você alcança." },

      { type: "text", eyebrow: "Lei #2", title: "Alvo · Target",
        html: "<i>Law number two: Target.</i> Sua mente foca naquilo que ela enfatiza e a que presta atenção. É neurociência: <b>aquilo em que você se concentra cresce e se fortalece.</b>" },

      { type: "quiz", q: "Segundo a Lei #2, no que a sua mente vai focar?",
        options: [
          "Naquilo que ela enfatiza, pensa e presta mais atenção",
          "Apenas em coisas negativas, automaticamente",
          "Em nada — o foco não pode ser treinado",
        ], answer: 0,
        explain: "Você escolhe conscientemente onde colocar o foco. Está mirando no alvo certo?" },

      { type: "vocab", title: "Flashcards da aula", sub: "Toque para virar e revisar.",
        items: [
          { en: "Imagine yourself already talking.", pt: "Imagine-se já falando." },
          { en: "Beware of seeds of fear and doubt.", pt: "Cuidado com sementes de medo e dúvida." },
          { en: "I can't do it... yet.", pt: "Eu não consigo... ainda." },
          { en: "Your mind targets what it focuses on.", pt: "Sua mente foca naquilo a que presta atenção." },
          { en: "Learning is about consistency, not perfection.", pt: "Aprender é sobre constância, não perfeição." },
        ]},

      { type: "bigquote", en: "You don't need confidence to start. You gain confidence by starting.",
        pt: "Você não precisa de confiança para começar — você ganha confiança começando." },

      { type: "text", title: "Você já deu o primeiro passo",
        html: "Cada passo, por menor que seja, te aproxima do objetivo. A jornada de mil milhas começa com um único passo — e você já deu esse passo ao estar aqui. 🌱" },
    ],
    tasks: [
      "Escrever a sua visão de “imagine yourself already talking”.",
      "Reler os flashcards em voz alta uma vez por dia.",
    ],
    test: [
      { q: "Qual é a Lei #1 do aprendizado no MEA?",
        options: ["Responsabilidade pelo que você pensa e faz", "Estudar 8 horas por dia", "Nunca errar"],
        answer: 0, explain: "Tudo começa pela responsabilidade sobre pensamentos e ações." },
      { q: "Aprender inglês é sobre...",
        options: ["Perfeição", "Constância", "Talento natural"],
        answer: 1, explain: "É sobre constância, não perfeição." },
    ],
  },
};

const MEA_SOON = {
  "mea-2": "Primeiras palavras, sons e a base tranquila da sua fala.",
  "mea-3": "O verbo to be e o presente simples, do jeito mais simples.",
  "mea-4": "Vocabulário do dia a dia que você realmente vai usar.",
  "mea-5": "Frases prontas para situações reais do cotidiano.",
  "mea-6": "Treino ativo de escuta: ouvir e repetir até fixar.",
  "mea-7": "A técnica de ensinar para aprender duas vezes.",
  "mea-8": "Começar a pensar em inglês — o salto da fluência.",
  "mea-9": "Conversar com naturalidade e confiança, no seu tempo.",
};

Object.entries(MEA_SOON).forEach(([id, o]) => {
  MEA_CONTENT[id] = {
    blocks: [
      { type: "callout", variant: "tip", icon: "🌿", title: "Aula a caminho",
        text: "Esta etapa está sendo preparada com a mesma calma das demais. Em breve disponível para você." },
      { type: "text", title: "O que vem nesta aula", html: o },
    ],
    tasks: [],
    test: [],
  };
});
