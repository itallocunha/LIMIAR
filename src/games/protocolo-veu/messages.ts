import type { Thread } from '../types';
export const messages: Thread[] = [
  {
    id: "t1",
    contact: "MARA (IRMÃ)",
    subtitle: "visto por último às 04:04",
    messages: [
      { id: "m1", from: "vitima", text: "mara, atende o telefone", time: "03:41", status: "entregue" },
      { id: "m2", from: "vitima", text: "tem alguém repetindo o que eu digito", time: "03:42", status: "lida" },
      { id: "m3", from: "outro", text: "tem alguém repetindo o que eu digito", time: "03:42" },
      { id: "m4", from: "vitima", text: "isso não é engraçado", time: "03:43", status: "lida" },
      { id: "m5", from: "outro", text: "isso não é engraçado", time: "03:43" },
      { id: "m6", from: "vitima", text: "quem é você", time: "03:51", status: "lida" },
      { id: "m7", from: "outro", text: "eu sou o que sobra de você às 04:04", time: "04:03" },
      { id: "m8", from: "vitima", text: "estou saindo de casa agora", time: "04:04", status: "não entregue" },
      { id: "m9", from: "outro", text: "eu sei. estou esperando na serra.", time: "04:04" },
    ],
  },
  {
    id: "t2",
    contact: "CONTATO SEM NOME",
    subtitle: "número registrado em 1974",
    messages: [
      { id: "m10", from: "outro", text: "você recebeu o pacote?", time: "22:10" },
      { id: "m11", from: "vitima", text: "recebi. tem cabelo dentro do envelope", time: "22:14", status: "lida" },
      { id: "m12", from: "outro", text: "é seu. de quando você tinha nove anos.", time: "22:14" },
      { id: "m13", from: "vitima", text: "para com isso", time: "22:15", status: "lida" },
      { id: "m14", from: "outro", text: "nós guardamos tudo de quem é escolhido", time: "22:16" },
      { id: "m15", from: "outro", text: "inclusive o barulho que você faz dormindo", time: "22:16" },
      { id: "m16", from: "vitima", text: "vou na polícia amanhã", time: "22:31", status: "lida" },
      { id: "m17", from: "outro", text: "amanhã você já é um de nós. boa noite, ██████.", time: "22:32" },
    ],
  },
  {
    id: "t3",
    contact: "AMARAL (VOCÊ?)",
    subtitle: "conversa iniciada por este dispositivo",
    messages: [
      { id: "m18", from: "outro", text: "você ainda está lendo isto?", time: "agora" },
      { id: "m19", from: "outro", text: "então ainda não acabou.", time: "agora" },
      { id: "m20", from: "outro", text: "conte as janelas abertas na tela. sempre tem uma a mais.", time: "agora" },
    ],
  },
];
