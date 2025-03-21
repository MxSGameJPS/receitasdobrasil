import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

export default function PaginaEstado() {
  const { estado } = useParams(); // Pega o estado da URL (ex.: "Acre")
  const [dadosEstado, setDadosEstado] = useState(null);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const responseBrasil = await fetch("/receitas/pais/brasil.json");
        const brasilData = await responseBrasil.json();
        const estadoData = brasilData.find(
          (item) => item.estado.toLowerCase() === estado.toLowerCase()
        );
        if (!estadoData) throw new Error("Estado não encontrado");
        const responseEstado = await fetch(estadoData.json);
        const data = await responseEstado.json();
        setDadosEstado(data);
      } catch (error) {
        console.error("Erro ao carregar receitas:", error);
      }
    };
    carregarDados();
  }, [estado]);

  if (!dadosEstado) return <p>Carregando...</p>;

  return (
    <Container>
      <h1>Bem-vindo ao {dadosEstado.nome}</h1>
      <Historia>       
          <p>{dadosEstado.historia}</p>       
      </Historia>
      <ThumbnailList>
        {dadosEstado.receitas.map((receita, index) => (
          <ThumbnailCard
            key={index}
            to={`/${estado}/${receita.nome.replace(/\s+/g, "-").toLowerCase()}`}
          >
            <img src={receita.imagem} alt={receita.nome} />
            <h3>{receita.nome}</h3>
          </ThumbnailCard>
        ))}
      </ThumbnailList>
    </Container>
  );
}

const Container = styled.div`
  max-width: 800px;
  margin: 150px auto;
  padding: 35px 90px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h1 {
    text-align: center;
    font-size: 50px;
    margin-bottom: 1rem;
  }
  h3 {
    margin-bottom: 5px;
  }
  p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 10px;
  } 
`;

const Historia = styled.div`
  margin-bottom: 30px;
  font-size: 16px;
  line-height: 1.5;
`;

const ThumbnailList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
`;

const ThumbnailCard = styled(Link)`
  width: 200px;
  text-decoration: none;
  color: #000;
  text-align: center;

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
  }

  h3 {
    margin-top: 10px;
    font-size: 14px;
  }

  &:hover {
    opacity: 0.9;
  }
`;
