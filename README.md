# EVOLUA — Escola de evolução

Site da **EVOLUA**, escola com princípios cristãos voltada à evolução do aluno:
crescimento **espiritual**, **familiar** e **profissional**.

> Estudar na EVOLUA é evoluir a si mesmo.

## Cursos
- **MEA** — curso de Inglês (*Mastering English Abroad*)
- **JETRO** — curso de Educação Financeira (*Sabedoria e Liberdade Financeira*)

## Estrutura
```
evolua/
├── index.html          # Início (explicação + fundadores + contato)
├── cursos.html         # Lista de cursos e modalidades
├── curso-mea.html      # Hub do MEA (grade pública, conteúdo bloqueado)
├── curso-jetro.html    # Hub do JETRO
├── css/styles.css      # Visual (escuro, sofisticado)
├── js/
│   ├── courses-data.js # Conteúdo dos cursos (módulos, aulas, semanas)
│   ├── auth.js         # Login, matrículas e progresso
│   ├── site.js         # Cabeçalho, rodapé e modal de login
│   └── hub.js          # Grade do curso, bloqueio e progresso
└── assets/             # Logo, ícone e imagem dos fundadores
```

## Como ver o site
É um site estático. Basta abrir `index.html` no navegador
(ou usar um servidor local, ex.: `python -m http.server`).

## Login
No momento existe **apenas o usuário administrador**, com acesso total:

| Usuário | Senha       | Acesso        |
|---------|-------------|---------------|
| `admin` | `memel0803` | Total (tudo)  |

## Modalidades dos cursos
O conteúdo é o mesmo nas duas formas; muda a liberação:
- **Turma (aulas semanais):** cada aula libera conforme o tempo (campo `week` em `courses-data.js`).
- **Independente:** todo o conteúdo liberado de imediato.

O administrador enxerga tudo, independente da modalidade.

## ⚠️ Importante (próximo passo)
Esta é uma versão de **protótipo**: o login roda no navegador (localStorage),
então a senha fica visível no código e o progresso fica só naquele dispositivo.

Para colocar no ar com **alunos reais**, o próximo passo é ligar um banco seguro
(ex.: **Supabase**, plano gratuito), onde:
- as senhas ficam guardadas com segurança (hash),
- o progresso sincroniza entre celular/computador,
- dá para cadastrar milhares de alunos sem custo de armazenamento.
