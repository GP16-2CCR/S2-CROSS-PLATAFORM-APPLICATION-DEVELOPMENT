import { useEffect, useState } from "react";
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
import { EditarScreenProps } from "../navigation/types";
import { Risco } from "../types/ocorrencia";

const opcoesRisco: { label: string; value: Risco }[] = [
  { label: "Baixo", value: "baixo" },
  { label: "Médio", value: "medio" },
  { label: "Alto", value: "alto" },
];

export function EditarOcorrenciaScreen({ route, navigation }: EditarScreenProps) {
  const { id } = route.params;
  const { obterOcorrencia, atualizarOcorrencia } = useOcorrencias();
  const ocorrencia = obterOcorrencia(id);

  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [risco, setRisco] = useState<Risco>("medio");
  const [data, setData] = useState("");

  useEffect(() => {
    if (!ocorrencia) {
      navigation.navigate("Lista");
      return;
    }

    if (ocorrencia.status === "fechada") {
      navigation.replace("Detalhe", { id });
      return;
    }

    setDescricao(ocorrencia.descricao);
    setLocal(ocorrencia.local);
    setRisco(ocorrencia.risco);
    setData(ocorrencia.data);
  }, [id, navigation, ocorrencia]);

  function handleSalvar() {
    if (!descricao.trim() || !local.trim() || !data.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha descrição, local e data.");
      return;
    }

    atualizarOcorrencia(id, {
      descricao: descricao.trim(),
      local: local.trim(),
      risco,
      data,
    });

    Alert.alert("Sucesso", "Ocorrência atualizada com sucesso.", [
      { text: "OK", onPress: () => navigation.navigate("Detalhe", { id }) },
    ]);
  }

  if (!ocorrencia || ocorrencia.status === "fechada") {
    return null;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Editar ocorrência</Text>
      <Text style={styles.subtitle}>
        Atualize as informações do chamado #{ocorrencia.id}.
      </Text>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={descricao}
        onChangeText={setDescricao}
        placeholder="Ex.: Grama invadindo faixa de rolamento"
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Local</Text>
      <TextInput
        style={styles.input}
        value={local}
        onChangeText={setLocal}
        placeholder="Ex.: Rodovia SP-280 - km 142+500"
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
        <Text style={styles.buttonText}>Salvar alterações</Text>
      </Pressable>
    </ScrollView>
  );
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
