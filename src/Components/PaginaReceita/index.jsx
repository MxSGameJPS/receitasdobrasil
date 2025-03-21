import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export default function PaginaReceita() {
  const { estado, receita } = useParams();
  const [dadosReceita, setDadosReceita] = useState(null);

  useEffect(() => {
    const carregarReceita = async () => {
      try {
        const responseBrasil = await fetch("/receitas/pais/brasil.json");
        if (!responseBrasil.ok) throw new Error(`Erro HTTP: ${responseBrasil.status}`);
        const brasilData = await responseBrasil.json();
  
        const estadoData = brasilData.find(
          (item) => item.estado.toLowerCase() === estado.toLowerCase()
        );
        if (!estadoData) throw new Error(`Estado ${estado} não encontrado`);
  
        console.log(`Carregando ${estadoData.json}...`);
        const responseEstado = await fetch(estadoData.json);
        if (!responseEstado.ok) throw new Error(`Erro HTTP: ${responseEstado.status}`);
        const data = await responseEstado.json();
  
        const receitaEncontrada = data.receitas.find(
          (r) => r.nome.replace(/\s+/g, "-").toLowerCase() === receita
        );
        if (!receitaEncontrada) throw new Error(`Receita ${receita} não encontrada`);
  
        setDadosReceita(receitaEncontrada);
      } catch (error) {
        console.error("Erro ao carregar receita:", error);
      }
    };
    carregarReceita();
  }, [estado, receita]);
  if (!dadosReceita) return <p>Carregando receita...</p>;

  return (
    <ContainerCard>
      <div>
        <img src={dadosReceita.imagem} alt={dadosReceita.nome} />
        <div>
          <h2>{dadosReceita.nome}</h2>
          <ul>
            <li>Tempo de Preparo: {dadosReceita.tempo_de_preparo}</li>
            <li>Rendimento: {dadosReceita.rendimento}</li>
            <li>Dificuldade: {dadosReceita.dificuldade}</li>
          </ul>
          <div>
            <h3>Ingredientes</h3>
            <ul>
              {dadosReceita.ingredientes.map((ingrediente, index) => (
                <li key={index}>{ingrediente}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Modo de Preparo</h3>
            <p>{dadosReceita.modo_de_preparo.join(" ")}</p>
          </div>
        </div>
      </div>
    </ContainerCard>
  );
}

const ContainerCard = styled.section`
  display: flex;
  margin: 150px auto;
  width: 800px;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 24px;
  background-color: #f0e8c2;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);

  img {
    width: 100%;
    object-fit: cover;
    min-width: 800px;
    height: 400px;
    align-self: center;
    border-radius: 16px;
  }
`;