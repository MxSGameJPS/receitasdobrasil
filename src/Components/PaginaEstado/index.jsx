import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

export default function PaginaEstado() {
  const { estado } = useParams(); // Pega o estado da URL (ex.: "Acre")
  const [dadosEstado, setDadosEstado] = useState(null);

  const normalizarString = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove acentos
      .replace(/[\s-]+/g, ""); // Remove espaços e hífens

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const responseBrasil = await fetch("/receitas/pais/brasil.json");
        const brasilData = await responseBrasil.json();
        const estadoNormalizado = normalizarString(estado);
        const estadoData = brasilData.find(
          (item) => normalizarString(item.estado) === estadoNormalizado
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

  const formBaseUrl = "https://forms.gle/WZ57fVjbAfZWAWD48"; // Exemplo, troque pelo seu link
  const sugestaoUrl = `${formBaseUrl}?usp=pp_url&entry.123456789=${encodeURIComponent(
    estado
  )}`;

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
      <BotaoSugerir href={sugestaoUrl} target="_blank">
        Sugerir uma Receita
      </BotaoSugerir>
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

const BotaoSugerir = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  text-align: center;
  cursor: pointer;
  margin: 30px auto 0;
  padding: 10px 20px;
  background-color: #ff9c00;
  color: #fff;
  text-decoration: none;
  border-radius: 15px;
  font-size: 16px;
  &:hover {
    background-color: #ac6803;
  }
`;
