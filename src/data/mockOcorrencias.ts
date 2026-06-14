import { Ocorrencia } from "../types/ocorrencia";

export const mockOcorrencias: Ocorrencia[] = [
  {
    id: 1,
    descricao: "Vazamento de óleo hidráulico na linha de montagem 2",
    local: "Planta Industrial - Setor A",
    risco: "alto",
    data: "2026-06-10",
  },
  {
    id: 2,
    descricao: "Funcionário sem EPI adequado na área de solda",
    local: "Oficina de Manutenção",
    risco: "medio",
    data: "2026-06-11",
  },
  {
    id: 3,
    descricao: "Iluminação insuficiente no corredor de acesso ao estoque",
    local: "Almoxarifado Central",
    risco: "baixo",
    data: "2026-06-12",
  },
  {
    id: 4,
    descricao: "Empilhadeira operando acima da velocidade permitida",
    local: "Pátio de Logística",
    risco: "alto",
    data: "2026-06-13",
  },
];
