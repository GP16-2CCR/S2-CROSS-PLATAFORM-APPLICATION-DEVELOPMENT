# Motiva Ocorrências

Aplicativo mobile desenvolvido em **React Native + Expo** para a Sprint 2 do curso de Cross-Platform Application Development (FIAP).

O app simula o registro de **ocorrências de segurança operacional** da empresa **Motiva**, permitindo que colaboradores registrem incidentes, classifiquem o nível de risco e acompanhem os registros em uma lista centralizada.

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

Os dados iniciais ficam em `src/data/mockOcorrencias.ts` como um **array fixo** de ocorrências relacionadas à operação industrial da Motiva (vazamentos, EPI, iluminação, empilhadeiras, etc.).

Ao abrir o app, esse array é carregado no estado:

```typescript
const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>(mockOcorrencias);
```

Quando o usuário cadastra uma nova ocorrência, ela é adicionada ao estado em memória via `setOcorrencias`. Os dados **não persistem** após fechar o app (evolução futura: AsyncStorage).

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
