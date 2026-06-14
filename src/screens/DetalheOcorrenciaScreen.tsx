import { ScrollView, StyleSheet, Text, View } from "react-native";
import { DetalheScreenProps } from "../navigation/types";
import { Risco } from "../types/ocorrencia";

const riscoLabels: Record<Risco, string> = {
  baixo: "Baixo",
  medio: "Médio",
  alto: "Alto",
};

const riscoColors: Record<Risco, string> = {
  baixo: "#38a169",
  medio: "#d69e2e",
  alto: "#e53e3e",
};

export function DetalheOcorrenciaScreen({ route }: DetalheScreenProps) {
  const { ocorrencia } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.badgeRow}>
        <View
          style={[
            styles.badge,
            { backgroundColor: riscoColors[ocorrencia.risco] },
          ]}
        >
          <Text style={styles.badgeText}>
            Risco {riscoLabels[ocorrencia.risco]}
          </Text>
        </View>
        <Text style={styles.data}>{formatarData(ocorrencia.data)}</Text>
      </View>

      <Text style={styles.sectionLabel}>Local</Text>
      <Text style={styles.sectionValue}>{ocorrencia.local}</Text>

      <Text style={styles.sectionLabel}>Descrição</Text>
      <Text style={styles.descricao}>{ocorrencia.descricao}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Protocolo Motiva</Text>
        <Text style={styles.infoText}>
          Ocorrência #{ocorrencia.id} registrada para acompanhamento da equipe
          de segurança do trabalho. Priorize ações corretivas conforme o nível
          de risco identificado.
        </Text>
      </View>
    </ScrollView>
  );
}

function formatarData(data: string) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fafc",
  },
  content: {
    padding: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },
  badgeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },
  data: {
    fontSize: 14,
    color: "#718096",
    fontWeight: "600",
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#718096",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  sectionValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1a365d",
    marginBottom: 20,
  },
  descricao: {
    fontSize: 16,
    color: "#2d3748",
    lineHeight: 24,
    marginBottom: 24,
  },
  infoBox: {
    backgroundColor: "#ebf8ff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#bee3f8",
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#2c5282",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#2c5282",
    lineHeight: 21,
  },
});
