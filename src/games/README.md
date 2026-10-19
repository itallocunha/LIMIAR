# Pacotes LIMIAR

Para adicionar um caso, crie uma pasta em `src/games/` e adicione seu pacote a `registry.ts`. Não altere o sistema ou os módulos.

## Manifest

```ts
const manifest: Manifest = {
  id: 'id-estavel',
  caseNumber: 4,
  title: 'TÍTULO DO CASO',
  status: 'installed', // installed | preparing | classified
  statusLabel: 'CASO 004 / INSTALADO',
  theme: 'theme-meu-caso',
  modules: ['mail', 'chat', 'evidence', 'board', 'symbols', 'conclusion'],
};
```

O `index.ts` exporta `game: GamePackage`, importa `theme.css` e reúne `manifest`, `copy`, `emails`, `messages`, `evidence`, `board`, `map`, `codes` e `solution`. Todos são tipados em `types.ts`. Use IDs estáveis e únicos dentro do caso. O `theme.css` deve usar somente o seletor do tema do pacote. `copy.ts` contém textos do computador daquele caso; rótulos comuns ficam em `src/investigation/copy.ts`.

Anexos de emails usam `evidenceId`. Símbolos em emails/documentos usam `symbols: [{ id, label }]`, com o mesmo id para ocorrências do mesmo símbolo. Evidências usam `media` para uma URL de arquivo; arquivos locais podem ficar em `media/`, importados pelo arquivo de conteúdo. Áudio/vídeo sem mídia usam a forma de onda demonstrativa, sem som real. Documentos podem apresentar texto, imagem ou arquivo incorporado.

A solução fica exclusivamente em `solution.ts`, com campos `who`, `how`, `why`, opções de IDs estáveis e `correct`. Num protótipo estático, ela não é secreta perante inspeção do código.

## Arquivos criados nesta entrega

- `src/games/types.ts`, `registry.ts`, `README.md`.
- `src/games/protocolo-veu/{index,manifest,copy,emails,messages,evidence,board,map,codes,solution}.ts` e `theme.css`.
- `src/games/copo-nao-parou/{index,manifest,copy,emails,messages,evidence,board,map,codes,solution}.ts` e `theme.css`.
- `src/games/classified/index.ts`.
- `src/investigation/{CaseDesktop,Modules}.tsx`, `{copy,progress,progress.test}.ts` e `styles.css`.

## Provisório

- Caso 001: conteúdo inteiro marcado `[EDITAR]`, 2 emails, 1 conversa, 3 evidências, 4 cartões e ENV-01 a ENV-05. Em preparação, não abre até conteúdo real ser aprovado.
- PROTOCOLO VÉU: solução de demonstração marcada `[EDITAR]`, pois não havia solução fornecida. Anexos recuperam texto já existente, sem arquivos binários novos.
- `map` e `codes` estão tipados e vazios; não são módulos implementados nesta entrega.
- Não há arquivos reais de áudio/vídeo fornecidos, contas, servidor, classificação, pontuação ou relógio de duração visível.
