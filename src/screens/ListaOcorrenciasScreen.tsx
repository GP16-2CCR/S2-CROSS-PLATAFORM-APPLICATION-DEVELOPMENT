import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { OcorrenciaCard } from "../components/OcorrenciaCard";
import { useOcorrencias } from "../context/OcorrenciasContext";
import { ListaScreenProps } from "../navigation/types";

export function ListaOcorrenciasScreen({ navigation }: ListaScreenProps) {
  const { ocorrencias } = useOcorrencias();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Motiva Segurança</Text>
        <Text style={styles.subtitle}>
          Registro de ocorrências de conservação rodoviária
        </Text>
      </View>

      {ocorrencias.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>Nenhuma ocorrência registrada</Text>
          <Text style={styles.emptyText}>
            Toque em "Nova ocorrência" para registrar a primeira.
          </Text>
        </View>
      ) : (
        <FlatList
          data={ocorrencias}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <OcorrenciaCard
              ocorrencia={item}
              onPress={() => navigation.navigate("Detalhe", { id: item.id })}
            />
          )}
        />
      )}

      <Pressable
        style={({ pressed }) => [styles.fab, pressed && styles.fabPressed]}
        onPress={() => navigation.navigate("Cadastro")}
      >
        <Text style={styles.fabText}>+ Nova ocorrência</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fafc",
  },
  header: {
    backgroundColor: "#1a365d",
    paddingTop: 56,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#bee3f8",
  },
  list: {
    padding: 16,
    paddingBottom: 100,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#718096",
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    bottom: 24,
    left: 20,
    right: 20,
    backgroundColor: "#2b6cb0",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
  },
  fabPressed: {
    opacity: 0.9,
  },
  fabText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
});
