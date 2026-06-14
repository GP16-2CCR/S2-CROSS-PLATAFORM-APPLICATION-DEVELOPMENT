import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { mockOcorrencias } from "../data/mockOcorrencias";
import { NovaOcorrencia, Ocorrencia } from "../types/ocorrencia";

const STORAGE_KEY = "@motiva/ocorrencias";

type OcorrenciasContextValue = {
  ocorrencias: Ocorrencia[];
  obterOcorrencia: (id: number) => Ocorrencia | undefined;
  adicionarOcorrencia: (nova: NovaOcorrencia) => void;
  atualizarOcorrencia: (id: number, dados: NovaOcorrencia) => void;
  fecharOcorrencia: (id: number) => void;
};

const OcorrenciasContext = createContext<OcorrenciasContextValue | null>(null);

function normalizarOcorrencias(dados: Ocorrencia[]): Ocorrencia[] {
  return dados.map((item) => ({
    ...item,
    status: item.status ?? "aberta",
  }));
}

export function OcorrenciasProvider({ children }: { children: ReactNode }) {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarOcorrencias() {
      try {
        const salvo = await AsyncStorage.getItem(STORAGE_KEY);

        if (salvo) {
          setOcorrencias(normalizarOcorrencias(JSON.parse(salvo)));
          return;
        }

        setOcorrencias(mockOcorrencias);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(mockOcorrencias));
      } catch {
        setOcorrencias(mockOcorrencias);
      } finally {
        setCarregando(false);
      }
    }

    carregarOcorrencias();
  }, []);

  useEffect(() => {
    if (carregando) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(ocorrencias)).catch(() => {});
  }, [ocorrencias, carregando]);

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
      atual.map((item) => (item.id === id ? { ...item, ...dados } : item))
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

  if (carregando) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#1a365d" />
      </View>
    );
  }

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

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f7fafc",
  },
});
