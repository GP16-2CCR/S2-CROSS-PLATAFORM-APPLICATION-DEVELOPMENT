import { Ocorrencia } from "../types/ocorrencia";

export const mockOcorrencias: Ocorrencia[] = [
  {
    id: 1,
    descricao: "Grama com altura superior a 30 cm no acostamento direito",
    local: "Rodovia SP-280 - km 142+500",
    risco: "medio",
    data: "2026-06-10",
    status: "aberta",
  },
  {
    id: 2,
    descricao: "Vegetação invadindo a faixa de rolamento",
    local: "Rodovia SP-280 - km 87+200",
    risco: "alto",
    data: "2026-06-11",
    status: "aberta",
  },
  {
    id: 3,
    descricao: "Grama sobreposta em placa regulamentadora de velocidade",
    local: "Rodovia SP-280 - km 215+800",
    risco: "alto",
    data: "2026-06-12",
    status: "fechada",
  },
  {
    id: 4,
    descricao: "Capim acima do limite permitido (30 cm) no canteiro central",
    local: "Rodovia SP-280 - km 56+100",
    risco: "medio",
    data: "2026-06-13",
    status: "aberta",
  },
  {
    id: 5,
    descricao: "Mato encobrindo parcialmente defensa metálica",
    local: "Rodovia SP-280 - km 103+400",
    risco: "baixo",
    data: "2026-06-14",
    status: "aberta",
  },
  {
    id: 6,
    descricao: "Grama obstruindo visibilidade de placa de advertência",
    local: "Rodovia SP-280 - km 178+650",
    risco: "alto",
    data: "2026-06-14",
    status: "aberta",
  },
];
