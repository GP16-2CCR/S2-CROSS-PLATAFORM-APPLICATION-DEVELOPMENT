import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  titulo: string;
  mensagem: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  onConfirm: () => void;
  onCancel: () => void;
  perigo?: boolean;
};

export function ConfirmModal({
  visible,
  titulo,
  mensagem,
  textoConfirmar = "Confirmar",
  textoCancelar = "Cancelar",
  onConfirm,
  onCancel,
  perigo = false,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.titulo}>{titulo}</Text>
          <Text style={styles.mensagem}>{mensagem}</Text>

          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [
                styles.button,
                styles.buttonCancel,
                pressed && styles.buttonPressed,
              ]}
              onPress={onCancel}
            >
              <Text style={styles.buttonCancelText}>{textoCancelar}</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.button,
                perigo ? styles.buttonDanger : styles.buttonConfirm,
                pressed && styles.buttonPressed,
              ]}
              onPress={onConfirm}
            >
              <Text style={styles.buttonConfirmText}>{textoConfirmar}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(26, 54, 93, 0.55)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 8,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a365d",
    marginBottom: 12,
  },
  mensagem: {
    fontSize: 15,
    color: "#4a5568",
    lineHeight: 22,
    marginBottom: 24,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonCancel: {
    backgroundColor: "#edf2f7",
  },
  buttonConfirm: {
    backgroundColor: "#2b6cb0",
  },
  buttonDanger: {
    backgroundColor: "#c53030",
  },
  buttonPressed: {
    opacity: 0.88,
  },
  buttonCancelText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#4a5568",
  },
  buttonConfirmText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#fff",
  },
});
