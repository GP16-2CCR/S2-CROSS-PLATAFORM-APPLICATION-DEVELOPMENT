import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Lista: undefined;
  Cadastro: undefined;
  Detalhe: { id: number };
  Editar: { id: number };
};

export type ListaScreenProps = NativeStackScreenProps<RootStackParamList, "Lista">;
export type CadastroScreenProps = NativeStackScreenProps<RootStackParamList, "Cadastro">;
export type DetalheScreenProps = NativeStackScreenProps<RootStackParamList, "Detalhe">;
export type EditarScreenProps = NativeStackScreenProps<RootStackParamList, "Editar">;
