import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ocorrencia } from "../types/ocorrencia";

export type RootStackParamList = {
  Lista: undefined;
  Cadastro: undefined;
  Detalhe: { ocorrencia: Ocorrencia };
};

export type ListaScreenProps = NativeStackScreenProps<RootStackParamList, "Lista">;
export type CadastroScreenProps = NativeStackScreenProps<RootStackParamList, "Cadastro">;
export type DetalheScreenProps = NativeStackScreenProps<RootStackParamList, "Detalhe">;
