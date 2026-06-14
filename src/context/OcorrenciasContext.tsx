import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { mockOcorrencias } from "../data/mockOcorrencias";
import { NovaOcorrencia, Ocorrencia } from "../types/ocorrencia";

type OcorrenciasContextValue = {
  ocorrencias: Ocorrencia[];
  obterOcorrencia: (id: number) => Ocorrencia | undefined;
  adicionarOcorrencia: (nova: NovaOcorrencia) => void;
  atualizarOcorrencia: (id: number, dados: NovaOcorrencia) => void;
  fecharOcorrencia: (id: number) => void;
};

const OcorrenciasContext = createContext<OcorrenciasContextValue | null>(null);

export function OcorrenciasProvider({ children }: { children: ReactNode }) {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>(mockOcorrencias);

  const obterOcorrencia = (id: number) =>
    ocorrencias.find((item) => item.id === id);

  const adicionarOcorrencia = (nova: NovaOcorrencia) => {
    setOcorrencias((atual) => {
      const proximoId =
        atual.length === 0 ? 1 : Math.max(...atual.map((item) => item.id)) + 1;

      return [...atual, { ...nova, id: proximoId, status: "aberta" }];
    });
  };

  const atualizarOcorrencia = (id: number, dados: NovaOcorrencia) => {
    setOcorrencias((atual) =>
      atual.map((item) =>
        item.id === id ? { ...item, ...dados } : item
      )
    );
  };

  const fecharOcorrencia = (id: number) => {
    setOcorrencias((atual) =>
      atual.map((item) =>
        item.id === id ? { ...item, status: "fechada" } : item
      )
    );
  };

  const value = useMemo(
    () => ({
      ocorrencias,
      obterOcorrencia,
      adicionarOcorrencia,
      atualizarOcorrencia,
      fecharOcorrencia,
    }),
    [ocorrencias]
  );

  return (
    <OcorrenciasContext.Provider value={value}>
      {children}
    </OcorrenciasContext.Provider>
  );
}

export function useOcorrencias() {
  const context = useContext(OcorrenciasContext);

  if (!context) {
    throw new Error("useOcorrencias deve ser usado dentro de OcorrenciasProvider");
  }

  return context;
}
