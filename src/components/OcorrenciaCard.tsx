import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ocorrencia, Risco } from "../types/ocorrencia";

type Props = {
  ocorrencia: Ocorrencia;
  onPress: () => void;
};

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

export function OcorrenciaCard({ ocorrencia, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <Text style={styles.local}>{ocorrencia.local}</Text>
        <View
          style={[
            styles.badge,
            { backgroundColor: riscoColors[ocorrencia.risco] },
          ]}
        >
          <Text style={styles.badgeText}>{riscoLabels[ocorrencia.risco]}</Text>
        </View>
      </View>
      <Text style={styles.descricao} numberOfLines={2}>
        {ocorrencia.descricao}
      </Text>
      <Text style={styles.data}>{formatarData(ocorrencia.data)}</Text>
    </Pressable>
  );
}

function formatarData(data: string) {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.85,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  local: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1a365d",
    flex: 1,
    marginRight: 8,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  descricao: {
    fontSize: 15,
    color: "#2d3748",
    lineHeight: 22,
    marginBottom: 8,
  },
  data: {
    fontSize: 13,
    color: "#718096",
  },
});
