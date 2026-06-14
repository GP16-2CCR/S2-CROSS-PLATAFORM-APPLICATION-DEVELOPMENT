export type Risco = "baixo" | "medio" | "alto";

export type Ocorrencia = {
  id: number;
  descricao: string;
  local: string;
  risco: Risco;
  data: string;
};

export type NovaOcorrencia = Omit<Ocorrencia, "id">;
