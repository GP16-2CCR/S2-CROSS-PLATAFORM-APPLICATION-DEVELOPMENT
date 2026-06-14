# Motiva Ocorrências

Aplicativo mobile desenvolvido em **React Native + Expo** para a Sprint 2 do curso de Cross-Platform Application Development (FIAP).

O app simula o registro de **ocorrências de conservação rodoviária** da empresa **Motiva**, permitindo que equipes registrem problemas de vegetação e sinalização nas rodovias, classifiquem o nível de risco e acompanhem os registros em uma lista centralizada.

## O que o app faz

- Exibe uma **lista de ocorrências** registradas na operação
- Permite **cadastrar novas ocorrências** com descrição, local, risco e data
- Mostra o **detalhe completo** de cada ocorrência ao tocar no card
- Gerencia os dados dinamicamente com **estado React** (`useState`)

## Estrutura do projeto

```
src/
  components/     # Componentes reutilizáveis (OcorrenciaCard)
  context/        # Estado global das ocorrências
  data/           # Dados mockados iniciais
  navigation/     # Tipagem da navegação
  screens/        # Telas do aplicativo
  types/          # Modelagem TypeScript
```

## Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [Expo Go](https://expo.dev/go) instalado no celular **ou** emulador Android/iOS

### Passos

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor de desenvolvimento:

```bash
npm start
```

3. Escaneie o QR Code com o **Expo Go** (Android/iOS) ou pressione:
   - `a` para abrir no emulador Android
   - `i` para abrir no simulador iOS (macOS)

## Como os dados estão mockados

Os dados iniciais ficam em `src/data/mockOcorrencias.ts` como um **array fixo** de ocorrências relacionadas à operação rodoviária da Motiva (grama acima de 30 cm, vegetação invadindo pista, placa obstruída, canteiro central, defensa metálica, etc.).

Na **primeira execução**, esse mock é carregado no estado. Depois disso, tudo é salvo automaticamente com **AsyncStorage** — inclusive no **web** (localStorage do navegador).

```typescript
const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
// carrega do AsyncStorage ao abrir; salva a cada alteração
```

Cadastros, edições e chamados fechados **persistem após F5** ou ao reabrir o app. Para voltar aos mocks originais, limpe os dados do site no navegador ou reinstale o app.

## Fluxo funcional

1. **Lista** — visualiza todas as ocorrências em cards
2. **Cadastro** — preenche formulário e salva no estado
3. **Detalhe** — exibe informações completas da ocorrência selecionada

## Tecnologias

- Expo
- React Native
- TypeScript
- React Navigation (Native Stack)
- React Hooks (`useState`, Context API)
- AsyncStorage (persistência local)

## Equipe

- Caio Cordeiro Salgado — RM565400
- Hector van Tol Taver — RM562881
- Juan Gigliotti da Cunha — RM563253
- Rafael Alves da Silva — RM561878
- Raissa Fabrício Lima — RM563772

## Entrega Sprint 2

Arquivo `.txt` com:
- Nome e RM dos integrantes
- Link do repositório GitHub
- Link do vídeo no YouTube (até 3 minutos demonstrando o fluxo completo)
