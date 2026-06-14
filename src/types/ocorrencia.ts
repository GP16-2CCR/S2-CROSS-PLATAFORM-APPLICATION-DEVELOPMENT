export type Risco = "baixo" | "medio" | "alto";

export type StatusOcorrencia = "aberta" | "fechada";

export type Ocorrencia = {
  id: number;
  descricao: string;
  local: string;
  risco: Risco;
  data: string;
  status: StatusOcorrencia;
};

export type NovaOcorrencia = Omit<Ocorrencia, "id" | "status">;
