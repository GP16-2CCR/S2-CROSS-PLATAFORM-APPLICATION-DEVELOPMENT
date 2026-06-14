import { createContext, useContext, useMemo, useState, ReactNode } from "react";
import { mockOcorrencias } from "../data/mockOcorrencias";
import { NovaOcorrencia, Ocorrencia } from "../types/ocorrencia";

type OcorrenciasContextValue = {
  ocorrencias: Ocorrencia[];
  adicionarOcorrencia: (nova: NovaOcorrencia) => void;
};

const OcorrenciasContext = createContext<OcorrenciasContextValue | null>(null);

export function OcorrenciasProvider({ children }: { children: ReactNode }) {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>(mockOcorrencias);

  const adicionarOcorrencia = (nova: NovaOcorrencia) => {
    setOcorrencias((atual) => {
      const proximoId =
        atual.length === 0 ? 1 : Math.max(...atual.map((item) => item.id)) + 1;

      return [...atual, { ...nova, id: proximoId }];
    });
  };

  const value = useMemo(
    () => ({ ocorrencias, adicionarOcorrencia }),
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
