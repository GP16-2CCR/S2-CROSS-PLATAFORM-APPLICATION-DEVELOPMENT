import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ConfirmModal } from "../components/ConfirmModal";
import { useOcorrencias } from "../context/OcorrenciasContext";
import { DetalheScreenProps } from "../navigation/types";
import { Risco, StatusOcorrencia } from "../types/ocorrencia";

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

const statusLabels: Record<StatusOcorrencia, string> = {
  aberta: "Aberta",
  fechada: "Fechada",
};

const statusColors: Record<StatusOcorrencia, string> = {
  aberta: "#2b6cb0",
  fechada: "#718096",
};

export function DetalheOcorrenciaScreen({
  route,
  navigation,
}: DetalheScreenProps) {
  const { id } = route.params;
  const { ocorrencias, fecharOcorrencia } = useOcorrencias();
  const ocorrencia = ocorrencias.find((item) => item.id === id);
  const [modalFecharVisible, setModalFecharVisible] = useState(false);

  useEffect(() => {
    if (!ocorrencia) {
      navigation.navigate("Lista");
    }
  }, [navigation, ocorrencia]);

  if (!ocorrencia) {
    return null;
  }

  const fechada = ocorrencia.status === "fechada";

  function handleFechar() {
    if (fechada) {
      return;
    }

    setModalFecharVisible(true);
  }

  function confirmarFechar() {
    fecharOcorrencia(id);
    setModalFecharVisible(false);
  }

  return (
    <>
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.badgeRow}>
        <View style={styles.badges}>
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
          <View
            style={[
              styles.badge,
              { backgroundColor: statusColors[ocorrencia.status] },
            ]}
          >
            <Text style={styles.badgeText}>
              {statusLabels[ocorrencia.status]}
            </Text>
          </View>
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
          de conservação rodoviária. Priorize a roçada e a desobstrução conforme
          o nível de risco identificado.
        </Text>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonEdit,
            fechada && styles.buttonDisabled,
            pressed && !fechada && styles.buttonPressed,
          ]}
          onPress={() => navigation.navigate("Editar", { id })}
          disabled={fechada}
        >
          <Text style={[styles.buttonText, fechada && styles.buttonTextDisabled]}>
            Editar
          </Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            styles.buttonClose,
            fechada && styles.buttonDisabled,
            pressed && !fechada && styles.buttonPressed,
          ]}
          onPress={handleFechar}
          disabled={fechada}
        >
          <Text style={[styles.buttonText, fechada && styles.buttonTextDisabled]}>
            {fechada ? "Chamado fechado" : "Fechar chamado"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>

    <ConfirmModal
      visible={modalFecharVisible}
      titulo="Fechar chamado"
      mensagem="Deseja encerrar esta ocorrência? Ela permanecerá na lista como fechada."
      textoConfirmar="Fechar"
      onConfirm={confirmarFechar}
      onCancel={() => setModalFecharVisible(false)}
      perigo
    />
    </>
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
    alignItems: "flex-start",
    marginBottom: 24,
    gap: 12,
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    flex: 1,
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
    marginBottom: 24,
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
  actions: {
    gap: 12,
  },
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonEdit: {
    backgroundColor: "#2b6cb0",
  },
  buttonClose: {
    backgroundColor: "#1a365d",
  },
  buttonDisabled: {
    backgroundColor: "#e2e8f0",
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  buttonTextDisabled: {
    color: "#a0aec0",
  },
});
