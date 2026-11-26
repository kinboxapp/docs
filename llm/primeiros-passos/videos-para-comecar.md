---
title: "Academia: trilhas, exame, certificado e atribuição de treinamentos"
description: Referência da Kinbox Academia — trilhas e lições, regras do exame prático, certificado e sua verificação, aba Equipe, atribuição e lembretes de treinamento.
keywords: [academia, trilhas, lições, exame, missões, estrelas, nota, certificado, validade do certificado, verificar certificado, linkedin, insígnia, xp, nível, aba equipe, atribuir treinamento, prazo, lembrete, trilha bloqueada]
publico: llm
tipo: referencia
fontes:
  - web:src/pages/academia/shared/content.ts
  - web:src/pages/academia/certificacao/
  - web:src/pages/academia/verify/CertificateVerify.tsx
  - api:src/modules/academy/
codigo:
  - web:src/pages/academia/**
  - api:src/modules/academy/**
verificado_em: 2026-11-26
---

Referência complementar a [Continuar aprendendo: Academia e vídeos](/docs/primeiros-passos/videos-para-comecar).

## Onde fica e quem pode

- **Acesso:** ícone de capelo **Academia** no rodapé da barra lateral, ou foto do perfil → **Ajuda e documentação** → **Academia** (no celular, menu **Ajuda & Documentação**).
- **Quem usa:** todo membro ativo do workspace pode abrir a Academia, sem exigir permissão especial, sem depender de plano e sem consumir saldo (funciona também no teste grátis).
- **Trilha CRM e Vendas:** exige as permissões **Gerenciar negociações** e **Pode gerenciar as negociações da conversa.** no papel do membro; sem elas, a trilha aparece como **Bloqueada**. O proprietário tem acesso às duas trilhas.
- **Aba Equipe:** visível apenas para o proprietário ou quem tem a permissão **Membros** (em gestão do ambiente na tela de papéis).
- **Vídeos:** não existem vídeos dentro da Academia; tutoriais em vídeo ficam em **Ajuda e documentação** → **Canal no YouTube**.

## Trilhas e lições

Status exibidos em cada trilha: **Não iniciada**, **Em andamento**, **Certificado em dd/mm** ou **Bloqueada**.

| Trilha | Subtítulo | Itens e tempo | Insígnia | Conteúdo |
| --- | --- | --- | --- | --- |
| **Atendimento** | "O básico para operar a caixa de entrada" | 7 lições + exame (8 itens, 31 min) | **Operador Certificado** | Lições: "Seu primeiro atendimento", "Responda mais rápido", "Trabalhe em equipe", "Conheça seu cliente", "Organize sua fila", "Encontre qualquer coisa", "Puxe a conversa" + "Exame de Atendimento" (12 min) |
| **CRM e Vendas** | "Funis, negócios e follow-up" | 6 lições + exame (7 itens, 26 min) | **Vendedor Certificado** | Lições: "Do chat ao negócio", "Ande pelo funil", "Por dentro do negócio", "Nunca esqueça um cliente", "Ganhou ou perdeu", "Encontre seus negócios" + "Exame de Vendas" (10 min) |

## Lições, XP e níveis

- **Modo treino:** cada lição abre na **Caixa de entrada** real do membro em **Modo treino**, com destaques na tela, narração em áudio (**Silenciar narração** / **Ligar narração**) e conversas, negociações e tarefas fictícias (nada é enviado para contatos reais).
- **Navegação:** durante a lição, apenas Chat e CRM ficam abertos; para sair, clique no **X** no topo. Não há ordem obrigatória — dá para abrir qualquer lição ou ir direto ao exame. A lição é marcada como concluída sozinha no último passo (**Próxima lição**, **Fazer o exame**, **Voltar à Academia**; na lista: **Começar lição**, **Refazer**, **Fazer exame**, **Refazer exame**).
- **XP e níveis:** cada lição concluída dá **50 XP** e cada exame aprovado dá **150 XP**. Cada nível corresponde a **200 XP**.

## Regras do exame prático

| Trilha | Situações | Meta de tempo |
| --- | --- | --- |
| **Atendimento** | 6 situações | 12 min |
| **CRM e Vendas** | 5 situações | 10 min |

- **Formato:** prático, na caixa de entrada em modo treino, com situações e lista de missões, sem dicas.
- **Aprovação:** passa quem cumprir todas as missões. Missões que o papel do membro não permite são removidas do exame. Pular uma situação reprova.
- **Pontuação e estrelas:** nota de 0 a 100 e até 3 estrelas. Passar da meta de tempo afeta a pontuação e as estrelas, mas não reprova por si só.
- **Tentativas:** sem limite de tentativas e sem tempo de espera (**Tentar de novo**). Iniciar o exame de novo anula uma tentativa que estava aberta.
- **Expiração da tentativa:** deixar o exame aberto por muitas horas expira a tentativa com "Tentativa de exame expirada. Comece o exame de novo."
- **Resultado:** "Exame aprovado!" ou "Faltou um detalhe".

## Certificado e verificação

- **Emissão e validade:** um certificado por trilha, criado automaticamente na primeira aprovação no exame. **Emitir certificado** é o botão que abre o resultado e o certificado já emitido. Vale **1 ano** ("Emitido em", "Válido até"). Refazer o exame não emite outro certificado.
- **Ações:** logo após aprovar, **Ver minhas insígnias**, **Compartilhar no LinkedIn** e **Baixar PDF**. Depois, na seção **Insígnias**, clicar na insígnia conquistada abre **Verificação do certificado** com **Copiar link**, **LinkedIn** (abre o formulário de certificação já preenchido) e **Baixar PDF**.
- **Nome no certificado:** vem do nome cadastrado no **Perfil** do membro e acompanha mudanças feitas depois no perfil.
- **Número de série:** cada certificado traz um número de série.
- **Página de verificação:** o link do certificado e o QR Code dele levam à página de verificação, que serve para compartilhar o certificado. Ela mostra o status — "Certificado válido e ativo", "Certificado autêntico, mas vencido" ("Venceu em") ou "Certificado não encontrado" — junto com o nome do titular, Certificação, Nº de série, datas e "Emissor: Academia Kinbox".
- **Escopo por workspace:** o progresso e os certificados são separados por pessoa **em cada workspace**. Ao entrar em outro workspace, o membro começa do zero na Academia, mas o link de verificação de um certificado já emitido continua funcionando.

## Aba Equipe e atribuição de treinamentos

- **Painel:** mostra **Prontidão da equipe** (% de membros aptos), indicadores **Certificados**, **Em treinamento** e **Prazo vencido**, filtros (**Todos**, **Aptos**, **Pendentes** e por trilha), busca **Buscar pessoa** e a tabela **Pessoa**, **Certificações**, **Situação** e **Atividade** (lista apenas membros ativos).
- **Situações:** **Apto a operar**, **Prazo dd/mm**, **Prazo vencido**, **Em treinamento** e **Não iniciado**.
- **Atribuir treinamento:** **Atribuir treinamento** (ou **Atribuir** na linha) abre **Certificação** (a trilha), **Para quem** (só quem pode fazer a trilha, ainda não tem o certificado e não inclui quem está atribuindo) e **Prazo para o exame** (**7**, **14** ou **30** dias; padrão **14**) → **Enviar para N pessoa(s)**.
- **Reatribuição e prazo:** atribuir de novo a mesma trilha para a mesma pessoa substitui a atribuição anterior. O prazo passa a contar como vencido a partir da manhã seguinte à data definida.
- **Lembrar:** envia nova notificação ao membro e muda para **Lembrado** por 1 hora ("Lembrete enviado há pouco — dá para lembrar de novo em 1 h").
- **O que o membro recebe:** notificação no sino da Kinbox (não envia e-mail — veja [Receber notificações no navegador e no celular](/docs/conta/notificacoes)) e a faixa na aba **Trilhas**: "Seu gestor atribuiu a trilha {nome} para você · prazo até dd/mm" (ou "o prazo venceu em dd/mm"). A atribuição apenas avisa e não bloqueia o uso da Kinbox.

## Assinatura vencida

Com a assinatura ou o teste grátis vencido, a Academia abre normalmente. Quando a Kinbox mostrar o aviso de assinatura expirada, as lições e o exame ficam bloqueados com "A assinatura do workspace expirou. Renove para fazer as lições e o exame." Veja [Minha assinatura venceu ou o pagamento falhou](/docs/assinatura/assinatura-vencida).

## Sintomas e soluções

| Sintoma | Causa | O que fazer |
| --- | --- | --- |
| Trilha **CRM e Vendas** aparece como **Bloqueada** | O papel do membro não tem as permissões **Gerenciar negociações** e **Pode gerenciar as negociações da conversa.** | Pedir ao proprietário ou administrador para liberar as duas permissões no papel — veja [Criar papéis e permissões](/docs/configuracoes-no-workspace/configurar-permissoes-dos-usuarios) |
| Não vejo a aba **Equipe** na Academia | Somente o proprietário ou quem tem a permissão **Membros** vê a aba | Pedir a permissão **Membros** a quem administra o workspace |
| O ícone **Academia** não aparece na barra lateral | Acesso pela barra lateral indisponível ou no celular | Abrir pela foto do perfil → **Ajuda e documentação** → **Academia** (no celular, **Ajuda & Documentação**) |
| Membro não aparece em **Para quem** ao atribuir treinamento | O membro está inativo, já tem aquele certificado, não tem permissão para a trilha (ex.: CRM e Vendas) ou é você mesmo | Conferir se o membro está ativo, se já é certificado e se o papel dele permite a trilha |
| Membro diz que não recebeu e-mail do treinamento atribuído | A atribuição notifica no sino dentro da Kinbox e na faixa da aba **Trilhas**, não por e-mail | Orientar o membro a abrir a **Academia** ou conferir o sino de notificações; se precisar, clicar em **Lembrar** |
| Meu certificado venceu após 1 ano | Validade de 1 ano; refazer o exame não emite outro certificado | Não há renovação pela Academia; fale com o suporte. A página de verificação passa a exibir "Certificado autêntico, mas vencido" com a data de vencimento |
| "Tentativa de exame expirada. Comece o exame de novo." | O exame ficou aberto por muitas horas sem concluir | Iniciar uma nova tentativa em **Fazer exame** (não há limite de tentativas) |
| Troquei de workspace e meu progresso zerou | Progresso e certificados são registrados por pessoa em cada workspace | Voltar ao workspace original para ver as insígnias; o link de verificação já emitido continua válido |
| Lições e exame bloqueados com aviso de assinatura expirada | A Kinbox está mostrando o aviso de assinatura expirada do workspace | Regularizar em [Minha assinatura venceu ou o pagamento falhou](/docs/assinatura/assinatura-vencida) |

Veja também [Continuar aprendendo: Academia e vídeos](/docs/primeiros-passos/videos-para-comecar).
