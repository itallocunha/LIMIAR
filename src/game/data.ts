export const GAME_NAME = "PROTOCOLO VÉU";
export const OPERATOR = "R. AMARAL // INVESTIGADOR-CHEFE";
export const CASE_ID = "CASO 0-VÉU / DESAPARECIMENTO EM SERRA OCA";

export type Email = {
  id: string;
  from: string;
  subject: string;
  date: string;
  flag?: "ALERTA MÁXIMO" | "CORROMPIDO" | "NÃO LIDO" | "CRIPTOGRAFADO";
  attachment?: string;
  body: string[];
};

export const emails: Email[] = [
  {
    id: "e1",
    from: "central.operacoes@velum-net",
    subject: "RE: Última posição conhecida de R. Amaral",
    date: "14/11 — 03:12",
    flag: "ALERTA MÁXIMO",
    attachment: "coord_serra_oca.gpx (2.1 KB)",
    body: [
      "O sinal do tablet do investigador Amaral reapareceu por 41 segundos.",
      "Coordenadas: -22.41772, -44.90318 — 1.480 m de altitude, Serra Oca.",
      "Não há estrada, casa ou torre num raio de 19 km daquele ponto.",
      "O aparelho enviou 806 fotos em 41 segundos. Todas do mesmo corredor.",
      "Em 804 delas não há ninguém. Nas duas últimas há alguém",
      "de costas, a 11 cm da lente.",
      "",
      "NÃO tente contato. Se o tablet responder, ele não é mais o Amaral.",
    ],
  },
  {
    id: "e2",
    from: "arquivo.psiquiatrico@hosp-sao-lazaro",
    subject: "Prontuário 447-B — paciente que não dormia",
    date: "09/11 — 23:58",
    flag: "CORROMPIDO",
    attachment: "prontuario_447B_[DANIFICADO].pdf",
    body: [
      "Paciente: HELENA V., 34 anos. Internação voluntária.",
      "Queixa inicial: 'alguém conta minhas respirações durante a noite'.",
      "Dia 3: paciente pediu que retirassem o espelho. Não há espelho no quarto.",
      "Dia 7: começou a escrever o mesmo nome ██████ 2.400 vezes por noite.",
      "Dia 9: a enfermeira de plantão anotou que a paciente dormiu 8 horas.",
      "         A câmera mostra a paciente sentada, de olhos abertos, 8 horas.",
      "Dia 11: ela pediu desculpas 'por ter deixado entrar'.",
      "Dia 12: quarto vazio. Porta trancada por fora. Lençol ainda morno.",
    ],
  },
  {
    id: "e3",
    from: "transcricao.190@emergencia-regional",
    subject: "Transcrição de chamada — 04:04, duração 6m12s",
    date: "02/11 — 04:19",
    flag: "NÃO LIDO",
    body: [
      "OPERADORA: Emergência, qual é a sua localização?",
      "CHAMADOR: Ele está imitando a voz da minha filha. Ele erra o R.",
      "OPERADORA: Senhor, há alguém dentro da casa?",
      "CHAMADOR: Há doze. Eu contei os pés debaixo da porta.",
      "OPERADORA: Fique na linha, uma viatura está a caminho.",
      "CHAMADOR: Não mande ninguém. Eles ficam com quem entra.",
      "[RUÍDO DE ESTÁTICA — 71 SEGUNDOS]",
      "OPERADORA: Senhor? Senhor, o senhor está aí?",
      "OPERADORA: ...",
      "OPERADORA(?): Estou aqui. Obrigado por atender.",
      "[A CHAMADA FOI ENCERRADA PELO LADO DA CENTRAL. NINGUÉM DESLIGOU.]",
    ],
  },
  {
    id: "e4",
    from: "irmandade.do.veu@[origem desconhecida]",
    subject: "vocês abriram no lugar errado",
    date: "??/?? — 0█:██",
    flag: "CRIPTOGRAFADO",
    body: [
      "o véu não é uma porta. é uma pele.",
      "e v o c ê s   c o r t a r a m",
      "▓▓▓▓ nós rezamos por cinquenta anos para que dormisse ▓▓▓▓",
      "agora ele aprende nomes. o seu está na lista de ontem.",
      "quando a tela piscar três vezes, não olhe para trás da cadeira.",
      "olhe para a tela. ele prefere ser visto pelo reflexo.",
    ],
  },
];

export type Message = {
  from: "vitima" | "outro";
  text: string;
  time: string;
  status?: string;
};

export type Thread = {
  id: string;
  contact: string;
  subtitle: string;
  messages: Message[];
};

export const threads: Thread[] = [
  {
    id: "t1",
    contact: "MARA (IRMÃ)",
    subtitle: "visto por último às 04:04",
    messages: [
      { from: "vitima", text: "mara, atende o telefone", time: "03:41", status: "entregue" },
      { from: "vitima", text: "tem alguém repetindo o que eu digito", time: "03:42", status: "lida" },
      { from: "outro", text: "tem alguém repetindo o que eu digito", time: "03:42" },
      { from: "vitima", text: "isso não é engraçado", time: "03:43", status: "lida" },
      { from: "outro", text: "isso não é engraçado", time: "03:43" },
      { from: "vitima", text: "quem é você", time: "03:51", status: "lida" },
      { from: "outro", text: "eu sou o que sobra de você às 04:04", time: "04:03" },
      { from: "vitima", text: "estou saindo de casa agora", time: "04:04", status: "não entregue" },
      { from: "outro", text: "eu sei. estou esperando na serra.", time: "04:04" },
    ],
  },
  {
    id: "t2",
    contact: "CONTATO SEM NOME",
    subtitle: "número registrado em 1974",
    messages: [
      { from: "outro", text: "você recebeu o pacote?", time: "22:10" },
      { from: "vitima", text: "recebi. tem cabelo dentro do envelope", time: "22:14", status: "lida" },
      { from: "outro", text: "é seu. de quando você tinha nove anos.", time: "22:14" },
      { from: "vitima", text: "para com isso", time: "22:15", status: "lida" },
      { from: "outro", text: "nós guardamos tudo de quem é escolhido", time: "22:16" },
      { from: "outro", text: "inclusive o barulho que você faz dormindo", time: "22:16" },
      { from: "vitima", text: "vou na polícia amanhã", time: "22:31", status: "lida" },
      { from: "outro", text: "amanhã você já é um de nós. boa noite, ██████.", time: "22:32" },
    ],
  },
  {
    id: "t3",
    contact: "AMARAL (VOCÊ?)",
    subtitle: "conversa iniciada por este dispositivo",
    messages: [
      { from: "outro", text: "você ainda está lendo isto?", time: "agora" },
      { from: "outro", text: "então ainda não acabou.", time: "agora" },
      { from: "outro", text: "conte as janelas abertas na tela. sempre tem uma a mais.", time: "agora" },
    ],
  },
];

export type Evidence = {
  id: string;
  type: "foto" | "audio" | "documento";
  title: string;
  meta: string;
  desc: string[];
};

export const evidence: Evidence[] = [
  {
    id: "v1",
    type: "foto",
    title: "POLAROID 03 — cozinha da vítima",
    meta: "revelada em 1989 / distorção química severa",
    desc: [
      "Cozinha vazia. Chaleira no fogo. Sete marcas de dedos na janela — do lado de fora,",
      "no terceiro andar. A emulsão da foto derreteu exatamente sobre o rosto",
      "refletido no vidro. Só a boca sobreviveu. Está aberta demais.",
    ],
  },
  {
    id: "v2",
    type: "foto",
    title: "CENA 11-B — clareira, Serra Oca",
    meta: "flash forçado / 04:04",
    desc: [
      "Doze pares de sapatos dispostos em círculo, todos apontando para dentro.",
      "Nenhum corpo. O mato não está pisado. A terra dentro do círculo está",
      "quente o bastante para deformar a lente da câmera.",
    ],
  },
  {
    id: "v3",
    type: "audio",
    title: "GRAVAÇÃO 447 — 'a respiração que conta'",
    meta: "6m12s / 41% corrompido",
    desc: [
      "Nos primeiros 4 minutos: apenas um quarto silencioso e o ventilador.",
      "Aos 4m11s, uma voz muito baixa começa a contar em ordem decrescente.",
      "Aos 6m02s ela chega a zero e diz um nome que não estava no arquivo original.",
      "O nome muda a cada vez que o arquivo é reproduzido.",
    ],
  },
  {
    id: "v4",
    type: "audio",
    title: "FITA K7 — culto / cântico invertido",
    meta: "3m48s / reproduzir em volume baixo",
    desc: [
      "Doze vozes. Onze cantam. Uma apenas repete a palavra 'ainda'.",
      "Ao inverter a fita, o cântico vira uma lista de endereços residenciais.",
      "O último endereço é o do laboratório onde esta fita foi analisada.",
    ],
  },
  {
    id: "v5",
    type: "documento",
    title: "RELATÓRIO MILITAR 74/VÉU — desclassificado parcial",
    meta: "censura em 61% do documento",
    desc: [
      "Operação ██████ encerrada após a perda de ██ operadores na cota 1.480.",
      "Recomenda-se selar a entrada com ███ toneladas de concreto e",
      "███████████████ jamais registrar o nome em documento oficial,",
      "pois a entidade localiza através do ████████ escrito.",
      "Última linha, escrita à mão: 'ele leu o relatório antes de nós'.",
    ],
  },
];

export type Pin = {
  id: string;
  label: string;
  note: string;
  x: number;
  y: number;
  kind: "foto" | "recorte" | "simbolo" | "suspeito";
};

export const pins: Pin[] = [
  { id: "p1", label: "R. AMARAL", note: "desaparecido / 14 NOV", x: 12, y: 14, kind: "suspeito" },
  { id: "p2", label: "HELENA V.", note: "quarto 447-B / vazio", x: 62, y: 10, kind: "suspeito" },
  { id: "p3", label: "SERRA OCA", note: "cota 1.480 / 12 sapatos", x: 38, y: 44, kind: "foto" },
  { id: "p4", label: "SÍMBOLO DO VÉU", note: "gravado em 9 árvores", x: 78, y: 48, kind: "simbolo" },
  { id: "p5", label: "JORNAL 1974", note: "'12 sumiram na serra'", x: 16, y: 62, kind: "recorte" },
  { id: "p6", label: "CHAMADA 04:04", note: "a central respondeu sozinha", x: 56, y: 74, kind: "recorte" },
];

export const links: [string, string][] = [
  ["p1", "p3"],
  ["p2", "p3"],
  ["p3", "p4"],
  ["p5", "p3"],
  ["p6", "p1"],
  ["p5", "p4"],
];

export const bootLines = [
  "VELUM OS v0.4.4 — TERMINAL SEGURO",
  "montando /dev/arquivo_morto ............ OK",
  "verificando integridade do operador .... FALHA",
  "sessão anterior encerrada às 04:04 ..... NÃO ENCERRADA",
  "restaurando 806 imagens ................ CORROMPIDO",
  "acesso concedido a: ███████",
];
