import { useParams } from "react-router-dom";

export default function StatePage() {
  const { state } = useParams(); // Pega o nome do estado da URL

  // Converte o nome da URL (com hífens) de volta para o formato normal
  const stateName = state.replace(/-/g, " ");

  return (
    <div style={{ padding: "20px", flex: 1 }}>
      <h1>Receitas de {stateName}</h1>
      <p>Aqui vão as receitas do estado de {stateName}.</p>
      {/* Adicione aqui o conteúdo específico de cada estado */}
    </div>
  );
}