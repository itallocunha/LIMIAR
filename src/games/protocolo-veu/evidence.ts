import type { Evidence } from '../types';
export const evidence: Evidence[] = [
  {
    id: "v1",
    type: "foto",
    placeholder: "IMAGEM DEGRADADA / 61% DE PERDA",
    title: "POLAROID 03 / cozinha da vítima",
    meta: "revelada em 1989 / distorção química severa",
    desc: [
      "Cozinha vazia. Chaleira no fogo. Sete marcas de dedos na janela / do lado de fora,",
      "no terceiro andar. A emulsão da foto derreteu exatamente sobre o rosto",
      "refletido no vidro. Só a boca sobreviveu. Está aberta demais.",
    ],
  },
  {
    id: "v2",
    type: "foto",
    placeholder: "IMAGEM DEGRADADA / 61% DE PERDA",
    title: "CENA 11-B / clareira, Serra Oca",
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
    warning: "atenção: a faixa contém 41s a mais do que o registrado.",
    title: "GRAVAÇÃO 447 / 'a respiração que conta'",
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
    warning: "atenção: a faixa contém 41s a mais do que o registrado.",
    title: "FITA K7 / culto / cântico invertido",
    meta: "3m48s / reproduzir em volume baixo",
    desc: [
      "Doze vozes. Onze cantam. Uma apenas repete a palavra 'ainda'.",
      "Ao inverter a fita, o cântico vira uma lista de endereços residenciais.",
      "O último endereço é o do laboratório onde esta fita foi analisada.",
    ],
  },
  {
    id: "v5",
    symbols: [{ id: "veu", label: "VÉU" }],
    type: "documento",
    placeholder: "██████ CENSURADO ██████ CENSURADO ██████",
    title: "RELATÓRIO MILITAR 74/VÉU / desclassificado parcial",
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

evidence.push({ id: "v6", type: "documento", title: "coord_serra_oca.gpx (2.1 KB)", meta: "14/11 / 03:12", desc: ["Coordenadas: -22.41772, -44.90318 / 1.480 m de altitude, Serra Oca."] }, { id: "v7", type: "documento", title: "prontuario_447B_[DANIFICADO].pdf", meta: "09/11 / 23:58", desc: [
      "Paciente: HELENA V., 34 anos. Internação voluntária.",
      "Queixa inicial: 'alguém conta minhas respirações durante a noite'.",
      "Dia 3: paciente pediu que retirassem o espelho. Não há espelho no quarto.",
      "Dia 7: começou a escrever o mesmo nome ██████ 2.400 vezes por noite.",
      "Dia 9: a enfermeira de plantão anotou que a paciente dormiu 8 horas.",
      "         A câmera mostra a paciente sentada, de olhos abertos, 8 horas.",
      "Dia 11: ela pediu desculpas 'por ter deixado entrar'.",
      "Dia 12: quarto vazio. Porta trancada por fora. Lençol ainda morno.",
    ] });

