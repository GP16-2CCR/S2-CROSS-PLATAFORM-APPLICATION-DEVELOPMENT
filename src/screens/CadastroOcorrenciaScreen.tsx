import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useOcorrencias } from "../context/OcorrenciasContext";
import { CadastroScreenProps } from "../navigation/types";
import { Risco } from "../types/ocorrencia";

const opcoesRisco: { label: string; value: Risco }[] = [
  { label: "Baixo", value: "baixo" },
  { label: "Médio", value: "medio" },
  { label: "Alto", value: "alto" },
];

export function CadastroOcorrenciaScreen({ navigation }: CadastroScreenProps) {
  const { adicionarOcorrencia } = useOcorrencias();
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [risco, setRisco] = useState<Risco>("medio");
  const [data, setData] = useState(formatarDataAtual());

  function handleSalvar() {
    if (!descricao.trim() || !local.trim() || !data.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha descrição, local e data.");
      return;
    }

    adicionarOcorrencia({
      descricao: descricao.trim(),
      local: local.trim(),
      risco,
      data,
    });

    Alert.alert("Sucesso", "Ocorrência registrada com sucesso.", [
      { text: "OK", onPress: () => navigation.navigate("Lista") },
    ]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Nova ocorrência</Text>
      <Text style={styles.subtitle}>
        Registre incidentes de segurança identificados na operação Motiva.
      </Text>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Descreva o que aconteceu"
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Local</Text>
      <TextInput
        style={styles.input}
        value={local}
        onChangeText={setLocal}
        placeholder="Ex.: Planta Industrial - Setor B"
      />

      <Text style={styles.label}>Nível de risco</Text>
      <View style={styles.riscoRow}>
        {opcoesRisco.map((opcao) => (
          <Pressable
            key={opcao.value}
            style={[
              styles.riscoButton,
              risco === opcao.value && styles.riscoButtonSelected,
            ]}
            onPress={() => setRisco(opcao.value)}
          >
            <Text
              style={[
                styles.riscoButtonText,
                risco === opcao.value && styles.riscoButtonTextSelected,
              ]}
            >
              {opcao.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Data</Text>
      <TextInput
        style={styles.input}
        value={data}
        onChangeText={setData}
        placeholder="AAAA-MM-DD"
      />

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={handleSalvar}
      >
        <Text style={styles.buttonText}>Salvar ocorrência</Text>
      </Pressable>
    </ScrollView>
  );
}

function formatarDataAtual() {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fafc",
  },
  content: {
    padding: 20,
    paddingTop: 56,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1a365d",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 24,
    lineHeight: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#2d3748",
    marginBottom: 20,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  riscoRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 20,
  },
  riscoButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#cbd5e0",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  riscoButtonSelected: {
    backgroundColor: "#2b6cb0",
    borderColor: "#2b6cb0",
  },
  riscoButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4a5568",
  },
  riscoButtonTextSelected: {
    color: "#fff",
  },
  button: {
    backgroundColor: "#1a365d",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonPressed: {
    opacity: 0.9,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
