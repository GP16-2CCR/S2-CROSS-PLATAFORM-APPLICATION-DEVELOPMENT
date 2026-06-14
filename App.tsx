import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { OcorrenciasProvider } from "./src/context/OcorrenciasContext";
import { RootStackParamList } from "./src/navigation/types";
import { CadastroOcorrenciaScreen } from "./src/screens/CadastroOcorrenciaScreen";
import { DetalheOcorrenciaScreen } from "./src/screens/DetalheOcorrenciaScreen";
import { EditarOcorrenciaScreen } from "./src/screens/EditarOcorrenciaScreen";
import { ListaOcorrenciasScreen } from "./src/screens/ListaOcorrenciasScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <OcorrenciasProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Stack.Navigator
          initialRouteName="Lista"
          screenOptions={{
            headerStyle: { backgroundColor: "#1a365d" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "700" },
            contentStyle: { backgroundColor: "#f7fafc" },
          }}
        >
          <Stack.Screen
            name="Lista"
            component={ListaOcorrenciasScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cadastro"
            component={CadastroOcorrenciaScreen}
            options={{ title: "Cadastro" }}
          />
          <Stack.Screen
            name="Detalhe"
            component={DetalheOcorrenciaScreen}
            options={{ title: "Detalhe da ocorrência" }}
          />
          <Stack.Screen
            name="Editar"
            component={EditarOcorrenciaScreen}
            options={{ title: "Editar ocorrência" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </OcorrenciasProvider>
  );
}
